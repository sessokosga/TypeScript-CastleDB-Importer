import { GameData } from "./GameData.js";
GameData.Tasks.forEach((task) => {
    console.log(`${task.name}: ${task.details}`);
    // console.log("\tNeeds");
    // const attributes = Object.entries(task.need as TasksNeed);
    // for (const [name, value] of attributes) {
    //   console.log(`\t${name}: ${value}`);
    // }
    // console.log("\n");
});
