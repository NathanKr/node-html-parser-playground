const puppeteer = require('puppeteer');
const {parse} = require('node-html-parser')
const url = 'http://example.com/';

async function run(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.$eval("html", elem => elem.innerHTML);

    const dom = parse(data);
    const bodyElem = dom.querySelector('body');
    console.log(bodyElem.innerHTML);

    const pElems = bodyElem.querySelectorAll('p');
    console.log(pElems.length);

    await browser.close();
}

run()