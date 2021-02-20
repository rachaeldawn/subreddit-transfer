import { Browser, Page } from 'puppeteer';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

export interface IAppState {
  // an array of /u/sers or /r/eddits in the format
  // /r/subreddit or /u/user
  subreddits: string[];
  browser?: Browser;
  page?: Page;
}

type StateKey = keyof IAppState;

const appState = new BehaviorSubject<IAppState>({ subreddits: [] });

const setProperty = <T extends StateKey>(key: T) => (val: IAppState[T]) =>
  appState.pipe(first(), map(a => ({ ... a, [key]: val })))
    .subscribe(a => appState.next(a))

const getProperty$ = <T extends StateKey>(key: T): Observable<IAppState[T]> =>
  appState.pipe(map(a => a[key]));

const propertyPair = (key: StateKey) => () => [ getProperty$(key), setProperty(key) ];

export const useSubreddits = propertyPair('subreddits');
export const getSubreddits$ = getProperty$('subreddits');
export const setSubreddits = setProperty('subreddits');

export const useBrowser = propertyPair('browser');
export const getBrowser$: Observable<Browser> = getProperty$('browser');
export const setBrowser = setProperty('browser');

export const usePage = propertyPair('page');
export const getPage$ = getProperty$('page');
export const setPage = setProperty('page');
