const puppeteer = require("puppeteer");
const { parse, NodeType } = require("node-html-parser");
const url = "http://example.com/";

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const data = await page.$eval("html", (elem) => elem.innerHTML);

  const dom = parse(data);
  const bodyElem = dom.querySelector("body");
  console.log(bodyElem.innerHTML);

  const pElems = bodyElem.querySelectorAll("p");
  console.log(pElems.length);

  // --- get child nodes
  console.log("get child nodes in body > div");
  const parentEl = dom.querySelector("body > div");

  // --- this div has 3 children 
  index = 0;
  for (const childEl of parentEl.childNodes) {
    if(childEl.nodeType == NodeType.ELEMENT_NODE){
      console.log(`node : ${index}`,childEl.innerText);
      index++;
    }
  }

  await browser.close();
}

run();

