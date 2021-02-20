import { initApp } from "./app";
import { setupCommands } from "./events";

async function main() {
  await initApp();
  setupCommands();
  
  console.log('Type help to see commands');
}

main();
