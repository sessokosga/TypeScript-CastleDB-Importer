# CastleDB Data Parser to TypeScript (`GameData.ts`)
This repository contains a TypeScript script designed to convert a CastleDB JSON export (`data.cdb`) into highly structured TypeScript classes and static data structures (`GameData.ts`). This ensures your game data is fully typed, providing compile-time safety and excellent autocompletion in your IDE.

## Prerequisites
You must have `Node.js` and `TypeScript` installed to run this script.
```
npm install -g  typescript
```

## File Structure
For the script to run correctly, you need to set up the following directory structure, which respects the input and output paths configured in the parser.Assuming the script is run from the root directory:
```
.
└──res/
    └── castledb_parser.ts     <-- The main script
    └── castle_db_types.ts     <-- TypeScript definitions for the raw CastleDB JSON structure
    └── data.cdb               <-- Your exported CastleDB JSON file
└── scripts/
    └── GameData.ts        <-- Output file will be placed here
```

## Configuration
The script uses two internal constants to manage file paths. Before running, ensure these paths match your desired setup.The current configuration in `castledb_parser.ts` is:
|Constant|Value|Description|
|---|---|---|
INPUT_FILE|"./data.cdb"|The path to your exported CastleDB JSON file.|
OUTPUT_FILE|"../scripts/GameData.ts"|The relative path where the final TypeScript file with the generated classes and data will be written.|

## Usage
1. Export Data from CastleDB  
Export your project from CastleDB as a JSON file and name it `data.cdb`. Place this file in the same directory as `castledb_parser.ts`.

2. Run the Script  
Execute the parser script using ts-node from your terminal:
```
cd res/
tsc
node castledb_parser.js
```

3. Check the OutputUpon successful execution, the console will confirm the generation, and the file `GameData.ts` will be created in the `scripts` directory (relative to the script's location).

Example console output:
```
Successfully generated ../scripts/GameData.ts` with X sheets and Y entries.
```

## Using the Generated `GameData.ts`
The generated file will contain:
1. TypeScript Interfaces/Classes: A class for every sheet and sub-sheet in your CastleDB project (e.g., `Task`, `TasksNeed`, `TasksResult`).
2. Static Data Array: A static array on the main GameData class for each top-level sheet (e.g., `GameData.Tasks`).
3. Static Lookup Method: A static helper method for looking up entries by ID (e.g., `GameData.getTask(id)`).

You can import and use the data in your application like this:

```typescript
import { GameData, Task } from './GameData';

// Access the full list of tasks
const allTasks: Task[] = GameData.Tasks;

// Look up a specific task by its 'id'
const punchTree = GameData.getTask("task_punch_tree");

if (punchTree) {
    console.log(`Task Name: ${punchTree.name}`);
    console.log(`Resource Needed: ${punchTree.need?.villagers}`);
}
```
Note: The script includes an `init()` method that automatically populates the static data arrays on import.
