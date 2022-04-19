'use strict';

/*
* Acidd!
* Color drifting front end script based on classes
* https://github.com/kyle138/acidd
* https://www.npmjs.com/package/acidd
*/

// Global array for to store the aciddified elements
var elements = [];

/*
* getElems()
* Identifies all elements containing both 'acidd' and the supplied prefix classes.
* Returns array of unique 'prefix*' classes being used.
* @prefix {string} - typically 'bgc-' or 'clr-'
*/
function getElems(prefix) {
  // Identify all elements with 'acidd' class and the supplied prefix* class.
  let ELEMs = document.querySelectorAll(`.acidd[class*='${prefix}']`);
  // Get array of unique prefix* classes being used.
  let obj = {},
      reggie = new RegExp(`^${prefix}\\d+$`);
  for(var i=0;i<ELEMs.length;i++) {
    ELEMs[i].classList.forEach((cls) => {
      if(reggie.test(cls) && !obj.hasOwnProperty(cls)) {
        obj[cls] = [1,1,1];
      }
    }); // End elems.forEach
  } // End elems for loop
  return obj;
} // End getElems

/*
* getbgcRGB()
* Gets the current backgroundColor for the first element of the selected class.
* If the backgroundColor isn't set, check the parent elements all the way up the DOM.
* If no backgroundColor is set all the way up to HTML element, set to 255,255,255.
* @cls {string} class to get background color for. eg: bgc-0 bgc-1 bgc-2 etc.
* Sets elements['bgc'][cls] with array of R,G,B values and sets the delta direction value to 1 initially.
*/
function getbgcRGB(cls) {
  return new Promise((res) => {
    let rgb =  window.getComputedStyle(document.querySelector(`.${cls}`),null).backgroundColor;
    if(rgb == 'rgba(0, 0, 0, 0)') {
      // Ugh, it's not set, so check its parents.
      let elem = document.querySelector(`.${cls}`);

      do {
        elem=elem.parentElement;
        if(elem.nodeName == 'HTML') {
          // We made it all the way to the HTML element with no background color set. Just return white.
          rgb = 'rgb(255, 255, 255)';
        } else {
          rgb = window.getComputedStyle(elem).backgroundColor;
        }
      } while (rgb == 'rgba(0, 0, 0, 0)')
    }
    // The selected element has a background color set.
    // Convert RGB values to array of numbers.
    // Pair each RGB value with a random directional value of either 1 or -1.
    elements['bgc'][cls] = rgb.split('(')[1].split(')')[0].split(', ').map(x => [parseInt(x),Math.round(Math.random())?1:-1]);
    return res();
  }); // End Promise
} // End getbgcRGB

/*
* getclrRGB()
* Gets the current color for the first element of the selected class.
* @cls {string} class to get background color for. eg: clr-0 clr-1 clr-2 etc.
* Sets elements['clr'][cls] with array of R,G,B values and randomly sets the delta directional values to 1 or -1.
*/
function getclrRGB(cls) {
  return new Promise((res) => {
    elements['clr'][cls] = window.getComputedStyle(document.querySelector(`.${cls}`),null).color.split('(')[1].split(')')[0].split(', ').map(x => [parseInt(x),Math.round(Math.random())?1:-1]);
    return res();
  });
} // End getclrRGB

/*
* randRGB()
* Set new random RGB values for selected element.
* Flip directional if R, G, or B values are out of bounds.
* @type {string} ['bgc' or 'clr']
* @elem {string} The element to randomize RGB values for.
* Sets elements[type][elem] with new RGB and directional values.
*/
function randRGB(type, elem) {
  // For all 3 RGB values add a random delta between 0 and 2 * directional value [-1,1]
  for(let i = 0; i<3;i++) {
    elements[type][elem][i][0] += (elements[type][elem][i][1]*Math.floor(Math.random()*3));
    // Check if we're getting out of bounds
    if(elements[type][elem][i][0] < 0 || elements[type][elem][i][0] > 255 ) {
       elements[type][elem][i][1] *= -1;  // Reroute auxiliary power through the secondary ODN conduits and reverse the polarity.
       elements[type][elem][i][0] += elements[type][elem][i][1]*6;  // Move away from the boundary
    }
  } // End for loop

  // Assign the new values to elements with the selected class
  document.querySelectorAll(`.${elem}`).forEach((ment) => {
    let rgb = `rgb(${elements[type][elem][0][0]},${elements[type][elem][1][0]},${elements[type][elem][2][0]})`;
    if(type == 'bgc') {
      ment.style.backgroundColor = rgb;
      // console.log(`elem: ${elem} background: ${ment.style.backgroundColor}`); // DEBUG:
    } else if(type == 'clr') {
      ment.style.color = rgb;
      // console.log(`elem: ${elem} color: ${ment.style.color}`); // DEBUG:
    }
  }); // End querySelectorAll.forEach
} // End randRGB

/*
* acidd()
* Calls randRGB for all clr and bgc elems in the elements array.
* Then does it again
* and again
* and again
* Recursively.
*/
function acidd() {
  // Set new RGB values for all 'bgc' elements.
  Object.keys(elements['bgc']).forEach((elem) => { randRGB('bgc',elem) }); // End bgc.forEach

  // Set new RGB values for all 'clr' elements.
  Object.keys(elements['clr']).forEach((elem) => { randRGB('clr',elem) }); // End clr.forEach

  // Wait a smidge then play it again
  window.setTimeout(acidd,666);
} // End acidd


//**************
// Main Function
document.addEventListener("DOMContentLoaded", () => {

  // Only execute if any elements have 'acidd' class.
  if(document.getElementsByClassName('acidd').length > 0) {

    // Identify all elements with 'acidd' class and bgc-* or clr-* class.
    elements['bgc'] = getElems('bgc-');
    elements['clr'] = getElems('clr-');

    // Only continue if we have any bgc-* or clr-* classes
    if(Object.keys(elements['bgc']).length+Object.keys(elements['clr']).length > 0) {

      // Retrieve initial BGC and CLR values
      Promise.all(  // I make no promises that this is correct.
        [Object.keys(elements['bgc']).map((elem) => {
          getbgcRGB(elem);
        }),  // End map
         Object.keys(elements['clr']).map((elem) => {
          getclrRGB(elem);
        })]  // End map
      ) // End Promise.all
      .then(() => {
        acidd();   // FLIP THE SWITCH!!!
      });  // End Promise.all.then

    } // End if bgc + clr
  } // End if .acidd
}); // end addEventListener
