import { createBrowserCommand } from "./helpers";

export const exit = createBrowserCommand('exit', (b) => b.close());;
