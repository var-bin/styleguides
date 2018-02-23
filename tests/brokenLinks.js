// brokenLinks

"use strict";

const blc = require("broken-link-checker");
const fs = require("fs");
const path = require("path");
const md = require("markdown-it")({
  html: true,
  linkify: true
});

const README = "README.md";
const ROOT = path.resolve(__dirname, "../");

function brokenLinks(html, baseUrl) {
  baseUrl = baseUrl || "";

  const htmlChecker = new blc.HtmlChecker({}, {
    link: (result) => {
      const resultLink = result.url.original;
      const resultBroken = result.broken ? "🔗 Broken" : "🔗 OK";

      const msg = `${resultLink}: ${resultBroken}`;
      console.info(msg);
    },
    complete: () => {
      const endMsg = "\n=== Finish broken link checker ===";

      console.info(endMsg);
    }
  });

  const initMsg = "=== Init broken link checker ===\n";
  console.info(initMsg);

  htmlChecker.scan(html, baseUrl);
}

function checkLinks(err, data) {
  if (err) {
    throw err;
  }

  brokenLinks(md.render(data));
}

function getFiles(dir, callback) {
  dir = dir || "";
  callback = callback || undefined;

  const TRIGGERS_FILES_DIRECTORIES = {
    ".git": ".git",
    ".gitignore": ".gitignore",
    "node_modules": "node_modules",
    "LICENSE": "LICENSE",
    "tests": "tests"
  };

  fs.readdir(dir, (err, items) => {
    if (err) {
      throw err;
    }

    const newItems = items.filter((item) => {
      return item !== TRIGGERS_FILES_DIRECTORIES[item];
    });

    newItems.forEach((newItem) => {
      fs.stat(newItem, (err, stats) => {
        if (err) {
          throw err;
        }

        if (stats.isFile() && path.basename(newItem) === README) {
          console.log(`${path.resolve(dir, newItem)}: isFile`);

          if (typeof callback === "function") {
            fs.readFile(path.resolve(dir, newItem), "utf8", callback);
          }
        }

        if (stats.isDirectory()) {
          console.log(`${path.resolve(dir, newItem)}: isDirectory`);

          // magic happens here
          getFiles(path.relative(dir, newItem), (err, data) => {
            checkLinks(err, data);
          });
        }
      });
    });
  });
}

getFiles(ROOT, (err, data) => {
  checkLinks(err, data);
});
