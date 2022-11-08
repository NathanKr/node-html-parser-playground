import puppeteer from "puppeteer";
import parse, { NodeType } from "node-html-parser";
const url = "http://example.com/";

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const data = await page.$eval("html", (elem) => elem.innerHTML);

  const dom = parse(data);
  const bodyElem = dom.querySelector("body");
  // console.log(bodyElem!.innerHTML);

  // --- array of HTMLElement
  const pElems = bodyElem!.querySelectorAll("p");
  // console.log(pElems.length);

  // --- get first child of  body > div
  const firstChildBodyDiv = dom.querySelector("body > div")?.firstChild;
  if (firstChildBodyDiv) {
    let siebling = firstChildBodyDiv as unknown as HTMLElement;
    console.log(siebling.innerText); 
    
    do {
      siebling = (siebling as unknown as HTMLElement)
        .nextElementSibling as HTMLElement; 
        console.log(siebling);
        
    } while (siebling);
  }

  // --- get child nodes
  // console.log("get child nodes in body > div");
  // const parentEl = dom.querySelector("body > div");

  // --- this div has 3 children
  let index = 0;
  // --- childEl is of type Node
  // --- Node is more generic than HTMLElement
  // for (const childEl of parentEl!.childNodes) {
  //   if (childEl.nodeType == NodeType.ELEMENT_NODE) {
  //     // --- we can cast here from Node to HTMLElement because we have checked the type
  //     console.log(`tagName : ${(childEl as unknown as HTMLElement).tagName}`);
  //     console.log(`node : ${index}`, childEl.innerText);
  //     index++;
  //   }
  // }

  await browser.close();
}

run();
