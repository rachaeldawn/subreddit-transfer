import { setSubreddits } from "../../state";
import { Page } from "puppeteer";

export async function saveSubreddits(page: Page): Promise<void> {
  console.log('Navigating to your subreddits');
  await page.goto('https://www.reddit.com/subreddits/mine');
  await page.waitForSelector('.subscription-box');

  const cls = '.subscription-box ul li a.title';
  const subreddits = await page.$$eval(cls, a => a.map(itm => itm.getAttribute('href')));

  setSubreddits(subreddits);
  console.log(`Successfully saved (${subreddits.length}) subreddits`);
}


