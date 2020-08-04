# textarea-ui
A little retro inspired text-ui for web browsers.

## Instructions
    - npm i
    - npm run start

## How does it work?
As the name should already imply, all react components are built from [HTML textarea tags](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/textarea).
There are 2 types of layers:
- Graphic layers: textareas that function as only graphic ui
- Input layer: textarea that controls user input and browser focus

## What's done?
- POC in reactjs
- Cross-browser sizing (at zoom 100%)

## Basic Types so far
- Texts
- Boxes (combined with texts gives windows)
- Button (texts with background and functionality)
- User position and control

## Known issues
- Zoom on other browsers than Firefox break textareas lines, thus glitching app
