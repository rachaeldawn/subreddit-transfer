import puppeteer from 'puppeteer';

export async function getSubreddits(page: puppeteer.Page): Promise<string[]> {
  await page.goto('https://www.reddit.com/subreddits/mine');
  await page.waitForSelector('.subscription-box');

  const frame = page.mainFrame()
  return frame.$$eval('.subscription-box ul li a.title', a => a.map(itm => itm.getAttribute('href')));
}

