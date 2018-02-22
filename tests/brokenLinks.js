// brokenLinks

"use strict";

const blc = require("broken-link-checker");
const fs = require("fs");
const path = require("path");
const util = require("util");

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

  fs.readdir(dir, (err, files) => {
    if (err) {
      throw new Error(error);
    }

    const newFiles = files.filter((file) => {
      return file !== TRIGGERS_FILES_DIRECTORIES[file];
    });

    newFiles.forEach((file) => {

      fs.stat(path.resolve(ROOT, file), (err, stats) => {
        if (err) {
          throw new Error(error);
        }

        if (stats.isDirectory()) {
          getPaths(path.resolve(ROOT, file));

          console.log(`${path.resolve(ROOT, file)}: `, stats.isDirectory());
        } else {
          console.log(`${path.resolve(ROOT, file)}: `, stats.isDirectory());

          return;
        }
      });
    })
  });
}

//brokenLinks("<a href='https://github.com/stevenvachon/broken-link-checker' target='_blank'>test link</a> <a href='https://prettier.io/docs/en/index.html' target='_blank'>test link</a>");
getPaths(ROOT);
