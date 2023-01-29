import path from "path";
import { launch, PuppeteerLaunchOptions, Browser } from "puppeteer";

export enum BrowserProduct {
  Edge = "edge",
  Chrome = "chrome",
  Firefox = "firefox",
  Safari = "safari",
}

type Options = {
  headless?: boolean;
  timeout?: number;
};

const defaultOptions = {
  headless: true,
};

async function BrowserLaunch({
  headless,
  timeout,
}: Options = defaultOptions): Promise<Browser> {
  const browserProduct = process.env.BROWSER_PRODUCT || BrowserProduct.Chrome;

  const launchOptions: PuppeteerLaunchOptions = {
    headless,
    timeout,
  };

  if (
    browserProduct === BrowserProduct.Chrome ||
    browserProduct === BrowserProduct.Firefox
  ) {
    launchOptions.product = browserProduct;
    launchOptions.args = ["-wait-for-browser"];
  }

  if (browserProduct === BrowserProduct.Edge) {
    launchOptions.executablePath =
      "/opt/hostedtoolcache/msedge/stable/x64/msedge";
  }

  if (browserProduct === BrowserProduct.Safari) {
    const filedir = path.resolve("~/Library/WebDriver/");
    launchOptions.executablePath = `${filedir}/com.apple.Safari.plist`;
  }

  return await launch(launchOptions);
}

export default BrowserLaunch;
