import { GameData } from "./GameData.js";

GameData.Tasks.forEach((task) => {
  console.log(`${task.name}: ${task.details}`);
});
