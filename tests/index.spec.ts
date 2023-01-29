import { Browser } from "puppeteer";
import BrowserLaunch from "./launch";

describe("My First Test", () => {
  let browser: Browser;

  beforeAll(async () => {
    browser = await BrowserLaunch({
      headless: true,
    });
  });

  it("test", async () => {
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");

    expect(1).toEqual(1);
  });

  afterAll(async () => {
    browser.close();
  });
});
