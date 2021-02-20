import { Page } from "puppeteer";
import { first } from "rxjs/operators";
import { getSubreddits$ } from "../../state";

async function joinSubreddit(page: Page, url: string): Promise<void> {
  const subreddit = url.split(/\/r\//)[1].replace(/\//g, '');
  if (!subreddit) {
    console.log('not able to follow people yet, skipping', subreddit)
    return;
  }

  console.log(`Joining subreddit: /${subreddit}/`);
  await page.goto(url);

  // this is ugly but like. No choice because of how reddit works.

  const cls = `.subredditvars-r-${subreddit.toLowerCase()} .ListingLayout-outerContainer div div div div div div button`;
  await page.waitForSelector(cls);

  const joinable = await page.$eval(cls, a => a.textContent.toLowerCase() === 'join');
  if (!joinable) {
    console.log('Already joined', subreddit);
    return;
  }

  const button = await page.$(cls);
  await button.click()
  console.log('Joined', subreddit)
}

export async function importSubreddits(page: Page): Promise<void> {
  const subreddits = await getSubreddits$.pipe(first()).toPromise();
  for (const url of subreddits) {
    await joinSubreddit(page, url).catch(console.error);
    console.log('Short wait to prevent Reddit from flipping out');
    await new Promise(r => setTimeout(r, 300));
  }
}
