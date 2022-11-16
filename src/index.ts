import puppeteer from "puppeteer";
import parse, { NodeType } from "node-html-parser";
import { HTMLElement } from "node-html-parser";

async function runExampleCom() {
  const url = "http://example.com/";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const data = await page.$eval("html", (elem) => elem.innerHTML);

  const dom = parse(data);

  dom.setAttribute('key','11');

  const val = dom.getAttribute('key')

  console.log('html to string---->start');
  console.log(dom.toString());
  const domFromString = parse(dom.toString());
  console.log(domFromString);
  console.log('html to string---->end');

  const bodyElem = dom.querySelector("body");
  // console.log(bodyElem!.innerHTML);

  // --- array of HTMLElement
  const pElems = bodyElem!.querySelectorAll("p");
  console.log(pElems.length);

  // --- get child nodes
  console.log("get child nodes in body > div");
  const parentEl = dom.querySelector("body > div");

  // --- this div has 3 children
  let index = 0;
  // --- childEl is of type Node
  // --- Node is more generic than HTMLElement
  for (const childEl of parentEl!.childNodes) {
    if (childEl.nodeType == NodeType.ELEMENT_NODE) {
      // --- we can cast here from Node to HTMLElement because we have checked the type
      console.log(`tagName : ${(childEl as unknown as HTMLElement).tagName}`);
      console.log(`node : ${index}`, childEl.innerText);
      index++;
    }
  }

  // --- get first child of  body > div
  console.log("sibling not working !!!");

  let sibling = (dom.querySelector("body > div")! as unknown as HTMLElement)
    .firstChild as HTMLElement;

  // loop through next siblings until `null`
  do {
    // push sibling to array
    console.log(sibling.innerText);
  } while ((sibling = sibling!.nextElementSibling));

  await browser.close();
}

function isChecked(elem: HTMLElement): boolean {
  // -- implemented because checked is not working
  return elem.rawAttrs.includes("checked");
}

function removeChecked(elem: HTMLElement) : void{
  elem.removeAttribute('checked')
}

async function runMatlab() {
  const url =
    "https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/blob/main/matlab/matlab-quiz.md";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const data = await page.$eval("html", (elem) => elem.innerHTML);
  const dom = parse(data);

  // -- i am getting here 95 but on firefox browser i get 165 not clear why
  console.log(dom.querySelectorAll('code').length);
  const attrs = dom.querySelector('ul.contains-task-list:nth-child(3) > li:nth-child(4) > input:nth-child(1)');
  
  console.log(dom.querySelectorAll('input').filter(e => isChecked(e)).length);
  removeChecked(dom.querySelectorAll('input').filter(e => isChecked(e))[0])
  console.log(dom.querySelectorAll('input').filter(e => isChecked(e)).length);
  
  
  
   

  await browser.close();
}
// runExampleCom()
 runMatlab()