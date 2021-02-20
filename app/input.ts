import readline from 'readline';

import { ReplaySubject } from 'rxjs';

export const input$ = new ReplaySubject<[string, string[]]>(0);

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

read.on('line', data => {
  const [ cmd, ... args ] = data.split(' ');
  input$.next([cmd, args]);
});

