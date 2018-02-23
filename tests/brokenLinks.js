// brokenLinks

"use strict";

const blc = require("broken-link-checker");
const fs = require("fs");
const path = require("path");

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

function getPaths(dir) {
  const TRIGGERS_FILES_DIRECTORIES = {
    ".git": ".git",
    ".gitignore": ".gitignore",
    "node_modules": "node_modules",
    "LICENSE": "LICENSE",
    "tests": "tests"
  };

  fs.readdir(dir, (err, items) => {
    if (err) {
      throw new Error(error);
    }

    const newItems = items.filter((item) => {
      return item !== TRIGGERS_FILES_DIRECTORIES[item];
    });

    newItems.forEach((newItem) => {
      fs.stat(newItem, (err, stats) => {
        if (err) {
          throw new Error(err);
        }

        if (stats.isDirectory()) {
          console.log(`${path.resolve(dir, newItem)}: isDirectory`);

          getPaths(path.relative(dir, newItem));
        }

        if (stats.isFile() && path.basename(newItem) === README) {
          console.log("file: ", path.resolve(dir, newItem));
        }
      });
    })
  });
}

//brokenLinks("<a href='https://github.com/stevenvachon/broken-link-checker' target='_blank'>test link</a> <a href='https://prettier.io/docs/en/index.html' target='_blank'>test link</a>");
getPaths(ROOT);
