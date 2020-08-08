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

### Normal mode
User can move freely with WASD or arrows, ENTER or SPACEBAR to trigger buttons actions.

### Forced mode
When UI is forced, user can only move through buttons highlighted position or hotkey, you can use ENTER or SPACEBAR or keyboard hotkeys to trigger actions, 
arrow left and right or TAB to move.

## What's done?
- POC in reactjs
- Cross-browser sizing (at zoom 100%)
- [Vercel deployment](https://textarea-ui-git-master.carmon.vercel.app/) (could be down)
- Added TS, prettier and eslint

## Basic Types so far
- Texts
- Boxes (combined with texts gives windows)
- Button (texts with background and functionality)
- User position and control

## Known issues
- Zoom on other browsers than Firefox break textareas lines, thus glitching app
- No cellphone browser support at the moment