const fs = require('fs-extra-promise');
const path = require('path');
const prepend = require('prepend');
const readline = require('readline');

const sitejsonpath = 'site.json';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please input the full path of a Markbind site: ', (pathName) => {
  migrate(pathName);
});


const migrate = function(sitePath) {
  //read site.json
  rl.question('Please input the prefix of the site: ', (prefix) => {
    let sitejson = fs.readJsonSync(path.resolve(sitePath, sitejsonpath))
    let prefixToRemove = new RegExp(prefix + ' - ');
    console.log(prefixToRemove);
    const pages = sitejson.pages
    
  // prepend each page with FM data
  pages.forEach(page => {
    if (!page.src.match(/^book/)) {
    prepend(path.resolve(sitePath, page.src),
    `<frontmatter>
title: "${page.title.replace(prefixToRemove, '')}"
</frontmatter>
`,
    function(error) {
    if (error)
      console.error(error.message);
  });
}
  });

  // get addressable array
  const candidates = pages.map(page => page.src).map(src => src.split("/")).map(arr => arr[arr.length-1]);
    sitejson.addressable = (Array.from(new Set (candidates)).map(e => '**/' + e));

    sitejson.titlePrefix = prefix;
    // remove pages array
    delete sitejson.pages; 
    fs.writeJsonSync(path.resolve(sitePath, sitejsonpath), sitejson);
    rl.close();
});
};

