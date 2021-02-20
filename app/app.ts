import puppeteer from 'puppeteer';

import { setBrowser, setPage } from './state';

export async function initApp() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [ "--disable-notifications" ]
  });
  
  const page = await browser.newPage();
  const [ blank ] = await browser.pages()
  
  await blank.close();

  await page.goto('https://www.reddit.com/');

  setBrowser(browser);
  setPage(page)
}

