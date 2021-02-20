import { Observable } from "rxjs";

export type CommandResult = void | Promise<void> | Observable<void>;
export type CommandFunction = (args?: string[]) => CommandResult;
export type Command = (cmd: string, args?: string[]) => CommandResult;
