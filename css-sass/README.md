# CSS / Sass Styleguide

## General Formatting

* Source files are encoded in UTF-8 (no BOM). <sup>[ [.editorconfig](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties#charset) ]</sup> <sup>[ [stackoverflow](https://stackoverflow.com/questions/2223882/whats-different-between-utf-8-and-utf-8-without-bom/2223926#2223926) ]</sup>
* Keep each line of code to a readable length. Unless you have a reason to, keep lines to fewer than **120** characters. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/max-line-length/) ]</sup>
* Ensures the file ends with a newline. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/no-missing-end-of-source-newline/) ]</sup>
* Limit the number of adjacent empty lines. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/max-empty-lines/) ]</sup>
* Disallow end-of-line whitespace. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/no-eol-whitespace/) ]</sup>
* Disallow empty sources. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/no-empty-source/) ]</sup>
* Use soft tabs (2 spaces) for indentation. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/indentation/) ]</sup> <sup>[ [stackoverflow](https://stackoverflow.blog/2017/06/15/developers-use-spaces-make-money-use-tabs/) ]</sup>

## Additional Formatting

* Prefer **dashes** over camelCasing, Underscores and PascalCasing in class names. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/selector-class-pattern/) ]</sup>
* Do not use **ID** selectors. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/selector-id-pattern/) ]</sup> <sup>[ [stylelint](https://stylelint.io/user-guide/rules/selector-max-id/) ]</sup>
* When using multiple selectors in a rule declaration, give each selector its own line. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/selector-list-comma-newline-after/) ]</sup> <sup>[ [stylelint](https://stylelint.io/user-guide/rules/selector-max-empty-lines/) ]</sup>
* Put a space before the opening brace `{` in rule declarations. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/block-opening-brace-space-before/) ]</sup>
* Put a new line after the opening brace `{` in rule declarations. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/block-opening-brace-newline-after/) ]</sup>
* In properties, put a space after, but not before, the `:` character. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/declaration-colon-space-after/) ]</sup> <sup>[ [stylelint](https://stylelint.io/user-guide/rules/declaration-colon-space-before/) ]</sup>
* Give each declaration its own line. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/declaration-block-semicolon-newline-after/) ]</sup>
* Put closing braces `}` of rule declarations on a new line. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/block-closing-brace-newline-after/) ]</sup> <sup>[ [stylelint](https://stylelint.io/user-guide/rules/block-closing-brace-newline-before/) ]</sup>
* Put blank lines between rule declarations. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/rule-empty-line-before/) ]</sup>
* Put a single space after the combinators of selectors. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/selector-combinator-space-after/) ]</sup> <sup>[ [stylelint](https://stylelint.io/user-guide/rules/selector-combinator-space-before/) ]</sup>
* Limit the number of compound selectors in a selector: **4** <sup>[ [stylelint](https://stylelint.io/user-guide/rules/selector-max-compound-selectors/) ]</sup>
* Require a trailing semicolon within declaration blocks. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/declaration-block-trailing-semicolon/) ]</sup>
* Prefer **lowercase** over *UPPERCASE* for properties, units. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/property-case/) ]</sup> <sup>[ [stylelint](https://stylelint.io/user-guide/rules/unit-case/) ]</sup>
* Prefer double quotes over single quotes <sup>[ [stylelint](https://stylelint.io/user-guide/rules/string-quotes/) ]</sup>

## Comments

* Prefer line comments ([// in Sass-land](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#comments)) to block comments. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/comment-whitespace-inside/) ]</sup> <sup>[ [stylelint](https://stylelint.io/user-guide/rules/no-invalid-double-slash-comments/) ]</sup> CSS caveats: <sup>[ [stackoverflow](https://stackoverflow.com/questions/12298890/is-it-bad-practice-to-comment-out-single-lines-of-css-with/20192639#20192639) ]</sup> <sup>[ [xanthir](http://www.xanthir.com/b4U10) ]</sup>
* Prefer comments on their own line. Avoid end-of-line comments. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/comment-empty-line-before/) ]</sup>
* Write detailed comments for code that isn't self-documenting:
  * Uses of `z-index`
  * Compatibility or browser-specific hacks  <sup>[ [github](https://github.com/Slamdunk/stylelint-no-browser-hacks) ]</sup>
* Disallow empty comments. <sup>[ [stylelint](https://stylelint.io/user-guide/rules/comment-no-empty/) ]</sup>
