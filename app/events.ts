import { input$ } from './input';
import { commands } from './commands';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const kill = new Subject();

function fireAll([ cmd, args ]: [string, string[]]) {
  commands.forEach(a => a(cmd, args));

  // yes this is hard coded
  if (cmd === 'exit') {
    killCommands();
    process.exit(0);
  }
}

export function setupCommands() {
  input$.pipe(takeUntil(kill)).subscribe(fireAll);
}

export function killCommands() {
  kill.next();
  kill.complete();
}

