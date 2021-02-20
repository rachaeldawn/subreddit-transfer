import { Browser, Page } from "puppeteer";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { getBrowser$, getPage$ } from "../state";
import { CommandFunction, Command, CommandResult } from "./types";

export type BrowserCommandFunction = (browser: Browser, args?: string[]) => CommandResult;
export type PageCommandFunction = (page: Page, args?: string[]) => CommandResult;

/**
 * Safely execute any kind of command. Promises, Observables (once), or regular functions.
 */
async function runCommand(fn: CommandFunction, args: string[]): Promise<void> {
  const res = fn(args);

  if (res instanceof Promise) {
    await res;
  }

  if (res instanceof Observable) {
    await res.pipe(first()).toPromise();
  }
}

/**
 * Create any kind of command. Use this for state-based commands or generalized commands.
 */
export function createCommand(command: string, fire: CommandFunction): Command {
  return (cmd: string, args?: string[]) => cmd === command ? fire(args) : undefined;
}

/**
 * Create a command that requires the browser to work. Use this for things like closing the
 * browser or anything that's not specific to the main page.
 */
export function createBrowserCommand(command: string, fire: BrowserCommandFunction): Command {
  return async (cmd: string, args?: string[]) =>  {
    if (cmd !== command) return;

    const browser = await getBrowser$.pipe(first()).toPromise();
    await runCommand(fire.bind(null, browser), args);
  }
}

/**
 * Create a command that requires the main page to work. Use this operating on Reddit itself.
 */
export function createPageCommand(command: string, fire: PageCommandFunction): Command {
  return async (cmd: string, args?: string[]) =>  {
    if (cmd !== command) return;

    const page = await getPage$.pipe(first()).toPromise();
    await runCommand(fire.bind(null, page), args);
  }
}
