import { exit } from "./exit";
import {createCommand} from "./helpers";
import { subredditHelp, subreddits } from "./subreddits";
import { Command } from "./types";


const messages = [
  subredditHelp,
]

export const HelpMessage = `
  help - display this message
  ${messages.join('\n')}
`;

const help = createCommand('help', () => console.log(HelpMessage));


/** If you make a new command, register it here */
export const commands: Command[] = [
  help,
  subreddits,
  exit,
]
