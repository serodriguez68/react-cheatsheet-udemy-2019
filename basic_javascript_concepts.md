# Basic Javascript Concepts
## What is Babel?
Babel is a transpiler that converts our js code in any modern version (e.g. ES2016, ES2017) to ES5, which is universally supported by browsers.  It also converts jsx to js.

## How does JS import system work?
There are 2 module systems in JS: 
- JS ES2015 Modules use the `import` keyword. (this is the one we typically use)
- Common Modules use the `require` keyword.

## How does the `import` keyword work?
- Explained through an example: `import React from 'react'` looks for the 'react' folder insite the `node_modules` and assigns all the code to the `React` variable in my file (I can name it whatever I want).
- We could also import from a path `import MyLibrary from 'a/path'`.