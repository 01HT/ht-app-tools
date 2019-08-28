const puppeteer = require("puppeteer");
const fs = require("fs");
const fetch = require("node-fetch");

const url = "http://localhost:5000/aboutd";
const googleUserAgent = "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

async function saveInFile(str) {
  fs.writeFile("./result.txt", str, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }); 
}

async function getInPuppeteer(url, userAgent) {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();

  await page.setUserAgent(userAgent);

  await page.goto(url, {
    waitUntil: "load"
  });

  let content = await page.content();

  await saveInFile(content);
}

async function fetchLikeCrawler(url, userAgent) {
  let res = await fetch(url, {
    headers: { "User-Agent": userAgent }
  });
  console.log("Status-Code: "+ res.status);
  let text = await res.text();
  await saveInFile(text);
}

// getInPuppeteer(url, googleUserAgent);
fetchLikeCrawler(url, googleUserAgent);
