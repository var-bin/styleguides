// brokenLinks

"use strict";
const fs = require("fs");
const path = require("path");

// https://github.com/stevenvachon/broken-link-checker
const blc = require("broken-link-checker");
// https://github.com/markdown-it/markdown-it
const md = require("markdown-it")({
  html: true,
  linkify: true
});
// https://github.com/chalk/chalk
const chalk = require("chalk");

const README = "README.md";
const ROOT = path.resolve(__dirname, "../");

/**
 * Helper for checking links in HTML through `broken-link-checker`
 *
 * @param {String} html - string with HTML markup
 * @param {String} [baseUrl] - is the address to which all relative URLs will be made absolute
 */
function brokenLinks(html, baseUrl) {
  baseUrl = baseUrl || "";

  const htmlChecker = new blc.HtmlChecker({}, {
    link: (result) => {
      const resultLink = result.url.original;
      const resultBroken = result.broken ? chalk.red("  🔗 Broken") : chalk.green("  🔗 OK");

      if (resultBroken) {
        const msg = `${resultBroken} ${resultLink}`;

        console.info(msg);
      }

      if (result.broken) {
        htmlChecker.pause();
        const errMsg = `Link ${result.url.original} is broken ${result.brokenReason}. Please check it and fix it!`;

        throw new Error(errMsg);
      }
    },
    complete: () => {
      const endMsg = chalk.bgYellow("\n=== Finish broken link checker ===");

      console.info(endMsg);
    }
  });

  const initMsg = chalk.bgYellow("=== Init broken link checker ===\n");
  console.info(initMsg);

  htmlChecker.scan(html, baseUrl);
}

/**
 * Do links checking for markdown files
 *
 * @param {String} err - Error thrown by `fs.readFile`
 * @param {String} data - File content is given by `fs.readFile`
 */
function checkLinks(err, data) {
  if (err) {
    throw err;
  }

  brokenLinks(md.render(data));
}

/**
 * Recursively iterate through project directories tree. Found all README.md, convert it to HTML and do checks
 *
 * @param {String} dir - Name of directory for starting do recursively checking
 * @param {Function} callback - Function with two args.
 */
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
          console.log(chalk.underline(`${path.resolve(dir, newItem)}: isFile`));

          if (typeof callback === "function") {
            fs.readFile(path.resolve(dir, newItem), "utf8", callback);
          }
        }

        // if `newItem` is directory, read it
        if (stats.isDirectory()) {
          console.log(chalk.italic(`${path.resolve(dir, newItem)}: isDirectory`));

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
