import { first, map, tap, mapTo } from "rxjs/operators";
import { getSubreddits$ } from "../../state";

export const listSubreddits = getSubreddits$.pipe(
  first(),
  map(itms => itms.map(a => ` - ${a}`).join('\n')),
  tap(a => a.length > 0 ? console.log(a) : 'None stored, login and run subreddit save'),
  mapTo(undefined)
);
