[![NPM](https://nodei.co/npm/acidd.png)](https://www.npmjs.com/package/acidd)

# acidd
Color drifting frontend utility

## Description
Randomly drifts the RGB values of the 'color' and 'backgroundColor' properties for all DOM elements containing the 'acidd' and a 'bgc-*' and/or 'clr-*' class where the * is an integer value (eg: bgc-0, clr-1). Multiple elements can be assigned the same 'bgc-*' or 'clr-*' class and will be assigned the same colors as their RGB values begin to drift. For this reason it is recommended that the elements with the same initial backgroundColor or color value be assigned the same bgc-* or clr-* class. Acidd will scan the DOM before randomizing in order to obtain the initial RGB values for all 'acidd' elements.

## Install
Run the following command from the root of the web directory:  
`npm install acidd`

Add the following line in your html file:  
`<script src="./node_modules/acidd/acidd.js"></script>`

## Usage
* To drift backgroundColor values for an element add the following classes: `acidd bgc-0`, `acidd bgc-1`, `acidd bgc-2`, etc.  
* To drift color values for an elements add the following classes: `acidd clr-0`, `acidd clr-1`, `acidd clr-2`, etc.  
* To drift both color and backgroundColor values for an element add the following classes: `acidd bgc-0 clr-2`, `acidd bgc-2 clr-13`, etc.  

## Example
* I have an example page running this script [here](https://acidd.kylemunz.com/).

## Credits
* Back in the early 90s there was a DOS program called 'acid' that we were spreading around with floppies. No idea who wrote it or where it came from but when you executed it as a TSR it would start to phase the R,G, & B values for the monitor. That is if you had a color monitor because those weren't ubiquitous yet back then. You could execute acid before launching win.com and then your Windows 3.1 or Win95 environment would phase as well. 
* Around 10 or 15 years ago I remembered that little app and wrote a GreaseMonkey userscript to emulate it in a web environment. Remember GreaseMonkey? Those were crazy times back before people worried about browser security I guess. The userscript site is gone now but you can still find it on the mirror: <https://userscripts-mirror.org/scripts/show/126687>. Anyways, I got to thinking about that and decided to resurrect it, again.
