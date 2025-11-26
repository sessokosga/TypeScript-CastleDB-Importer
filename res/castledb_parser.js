// @ts-ignore
import * as fs from "fs";
// @ts-ignore
import * as path from "path";
// CONFIGURATION
const INPUT_FILE = "./data.cdb"; // Path to your CastleDB JSON
const OUTPUT_FILE = "../scripts/GameData.ts"; // Path to the generated TS file
// Load JSON
const rawData = fs.readFileSync(INPUT_FILE, "utf8");
const cdb = JSON.parse(rawData);
// --- HELPER FUNCTIONS ---
// Convert "tasks" -> "Task", "tasks@need" -> "TasksNeed"
function getClassName(sheetName) {
    if (sheetName.includes("@")) {
        const parts = sheetName.split("@");
        return toPascalCase(parts[0]) + toPascalCase(parts[1]);
    }
    // Singularize (simple logic: remove trailing 's' if present)
    const singular = sheetName.endsWith("s") ? sheetName.slice(0, -1) : sheetName;
    return toPascalCase(singular);
}
function toPascalCase(str) {
    return str.replace(/(^\w|[_\s-]\w)/g, (match) => match.replace(/[_\s-]/, "").toUpperCase());
}
// Convert CastleDB TypeStr to TypeScript Type
function getTsType(typeStr, colName, sheetName) {
    const typeId = parseInt(typeStr.split(":")[0]);
    switch (typeId) {
        case 1:
            return "string"; // Text
        case 2:
            return "boolean"; // Bool
        case 3:
            return "number"; // Int
        case 4:
            return "number"; // Float
        case 5: // Enum
            const cleanSheet = getClassName(sheetName);
            const cleanCol = toPascalCase(colName);
            return `${cleanSheet}${cleanCol}`;
        case 6:
            return "string"; // Ref (ID)
        case 17: // Custom Type (Sub-sheet)
            // Expecting format like "tasks@need"
            const customClassName = getClassName(`${sheetName}@${colName}`);
            return customClassName;
        default:
            return "any";
    }
}
// Get default value string for the class initializer
function getDefaultValue(typeStr) {
    const typeId = parseInt(typeStr.split(":")[0]);
    switch (typeId) {
        case 1:
            return '""';
        case 2:
            return "false";
        case 3:
            return "0";
        case 4:
            return "0.0";
        case 5:
            return "0"; // Default to first enum index
        case 6:
            return '""'; // Ref default
        case 17:
            return "null"; // Should be instantiated, but strict property init requires value
        default:
            return "null";
    }
}
// --- GENERATION LOGIC ---
function parse() {
    let output = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated from CastleDB JSON
 */\n\n`;
    const enumsGenerated = new Set();
    const classDefinitions = [];
    const dataLoadingLines = [];
    const sheetVariables = [];
    // 1. First Pass: Generate Enums and Classes
    cdb.sheets.forEach((sheet) => {
        const className = getClassName(sheet.name);
        const isCustomPropSheet = sheet.name.includes("@");
        // 1a. Detect and Generate Enums inside this sheet
        sheet.columns.forEach((col) => {
            if (col.typeStr.startsWith("5:")) {
                const enumName = `${className}${toPascalCase(col.name)}`;
                if (!enumsGenerated.has(enumName)) {
                    const options = col.typeStr.substring(2).split(",");
                    let enumStr = `export enum ${enumName} {\n`;
                    options.forEach((opt, index) => {
                        enumStr += `    ${opt} = ${index},\n`;
                    });
                    enumStr += `}\n`;
                    output += enumStr;
                    enumsGenerated.add(enumName);
                }
            }
        });
        // 1b. Generate Class Definition
        let classDef = `export class ${className} {\n`;
        // Fields
        sheet.columns.forEach((col) => {
            const tsType = getTsType(col.typeStr, col.name, sheet.name);
            const defaultVal = getDefaultValue(col.typeStr);
            // If it's a custom type (17), we handle nullability in constructor,
            // but TypeScript needs to know it might be null or we assert it.
            if (col.typeStr.startsWith("17")) {
                classDef += `    public ${col.name}: ${tsType} | null = ${defaultVal};\n`;
            }
            else {
                classDef += `    public ${col.name}: ${tsType} = ${defaultVal};\n`;
            }
        });
        // Constructor
        // We use 'any' here to allow passing plain JSON objects that match the shape
        // without triggering TypeScript's strict class instance checks for nested objects.
        classDef += `\n    constructor(init?: any) {\n`;
        classDef += `        if (init) Object.assign(this, init);\n`;
        // Special handling for sub-objects in constructor to ensure they are Classes not raw JSON objects
        sheet.columns.forEach((col) => {
            if (col.typeStr.startsWith("17")) {
                const childClass = getTsType(col.typeStr, col.name, sheet.name);
                classDef += `        if (init && init.${col.name}) { this.${col.name} = new ${childClass}(init.${col.name}); }\n`;
            }
        });
        classDef += `    }\n`;
        classDef += `}\n`;
        classDefinitions.push(classDef);
        // 1c. If it's a MAIN sheet (not a property sheet), prepare static storage
        if (!isCustomPropSheet) {
            const listName = toPascalCase(sheet.name); // e.g. "Tasks"
            sheetVariables.push(`    public static ${listName}: ${className}[] = [];`);
            sheetVariables.push(`    public static get${className}(id: string): ${className} | undefined { return this.${listName}.find(i => (i as any).id === id); }`);
            // Generate data population lines
            sheet.lines.forEach((line) => {
                // We serialize the line to JSON, then use the class constructor
                // We need to recursively handle custom properties (type 17) in the raw JSON
                // effectively, the constructor logic `new ChildClass(json)` handles the recursion.
                const lineJson = JSON.stringify(line);
                dataLoadingLines.push(`        GameData.${listName}.push(new ${className}(${lineJson}));`);
            });
        }
    });
    // 2. Append Classes to Output
    output += classDefinitions.join("\n");
    // 3. Generate Main GameData Container
    output += `\nexport class GameData {\n`;
    output += sheetVariables.join("\n");
    output += `\n    public static init() {\n`;
    output += dataLoadingLines.join("\n");
    output += `    }\n`;
    output += `}\n`;
    // 4. Run Init automatically or let user do it?
    // Usually better to let user call GameData.init() at start,
    // but to ensure static access works immediately after import in a simple script:
    output += `\n// Initialize data immediately\nGameData.init();\n`;
    // Write File
    fs.writeFileSync(OUTPUT_FILE, output);
    console.log(`Successfully generated ${OUTPUT_FILE} with ${sheetVariables.length / 2} sheets and ${dataLoadingLines.length} entries.`);
}
parse();
