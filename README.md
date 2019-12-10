With JS
=======

A declarative way to add/remove attributes, classes and styles on HTML elements when JS is loaded.

Why
---

Some attributes, classes and styles are only relevant once JavaScript has loaded:
 - ARIA properties or roles setting expectations for assistive technologies that are only fullfiled by JavaScript
 - Some fallback HTML that needs hiding once JavaScript is there, because an enhanced widget takes over the feature
 - Or inversely some HTML that needs revealing to provided a better experience, but only when JavaScript is present

Because there's no guarantee JavaScript will load, they should not be present in the HTML that's downloaded by browsers. This library provides a declarative way (through either data attributes or classes) to quickly amend the initial markup once JavaScript has loaded, ensuring a clean experience when it doesn't.

Usage
---

### DOM API

`.js-with-js--remove`
`.js-with-js--add-attribute__role--button`
`.js-with-js--remove-attribute__hidden`
`.js-with-js--add-class__sr-only`
`.js-with-js--remove-class__hidden`

### JS API

```
// Applies the operations to the given `element`
withJS(element);
// Looks up all elements matching given `selector` in the document
// and applies the operations describe by their classes
withJS('selector');
// Looks up all elements with the given `selector` within the given `element`
withJS('selector', element);
// Defaults are set too
withJS();
// Is the same as
withJS('[class*="js-with-js--"]',document)
```

Installation
---

TBD

Adding extra transforms
---

Have an option to set other transforms than the initial ones for more complex setups
