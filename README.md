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


## Credits
