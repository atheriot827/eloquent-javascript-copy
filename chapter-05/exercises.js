// /////////////////////////////////////////////////////////////////////////////
// flatten /////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

function flatten(arrays) {
  //use reduce to process each sub arr and accum results into single arr
  return arrays.reduce(function(acc, curr) {
    //concat curr sub arr with acc
    return acc.concat(curr);
  }, []); //initial val for acc is empty arr

}

// /////////////////////////////////////////////////////////////////////////////
// loop ////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

function loop(value, test, update, body) {
  //value - init val to start loop
  //test - func that tests if loop should cont
  //update - func that updates loop val
  //body - func that is called on each iteration with the curr val

  //iterate
  while(test(value)) {
    body(value);
    value = update(value);
  }

}

// /////////////////////////////////////////////////////////////////////////////
// every ///////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

//using loop
//array - arr to test
//test - the predicate func that tests each ele

function every(array, test) {
  //iterate over each ele in arr
  for(let i = 0; i < array.length; i++) {
    //if test func returns false for any ele, return false
    if(!test(array[i])) {
      return false;
    }
  }
  //if all ele pass test, return true
  return true;

}

//using some method
//the some method is used to check if there is at least one element in the array that fails the test

function every(array, test) {
  //use some method with neg test func to implement the every logic
  return !array.some(element => !test(element));
}

// /////////////////////////////////////////////////////////////////////////////
// dominantDirection ///////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

//simplified characterScript implementation
function characterScript(code) {
  const scripts = [
    {name: "Latin", direction: "ltr", range: [65, 122]},  // A-Z and a-z
    {name: "Arabic", direction: "rtl", range: [1536, 1791]}, // Arabic script range
    {name: "Hebrew", direction: "rtl", range: [1424, 1524]}, // Hebrew script range
    // Add more scripts as needed
  ];

  for (let script of scripts) {
    if (code >= script.range[0] && code <= script.range[1]) {
      return script;
    }
  }
  return null; //return null if no script matches
}

function countBy(array, func) {
  let counts = {};
  for (let element of array) {
    let key = func(element);
    if (key !== null) { //exclude null keys
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  return counts;
}

function dominantDirection(text) {
  //convert text into arr of char codes
  let codes = Array.from(text).map(char => char.codePointAt(0));

  //count occ of each script dir
  let scriptCounts = countBy(codes, code => {
    let script = characterScript(code);
    return script ? script.direction : null;
  });

  //remove null enteries and find most freq dir
  delete scriptCounts[null];
  let dominant = Object.keys(scriptCounts).reduce((a, b) =>
  scriptCounts[a] > scriptCounts[b] ? a : b
  );

  return dominant;

}

// /////////////////////////////////////////////////////////////////////////////
//  //////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

if ((typeof process !== 'undefined') &&
  (typeof process.versions.node !== 'undefined')) {
  module.exports = {
    flatten,
    loop,
    every,
    dominantDirection,
  };
};