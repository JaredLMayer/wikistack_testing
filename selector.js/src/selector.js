var traverseDomAndCollectElements = function(matchFunc, startEl, resultSet) {
  resultSet =  resultSet || [];
  
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  if(matchFunc(startEl))
    resultSet.push(startEl);

  for(var i = 0; i < startEl.childNodes.length; i++){
    if(startEl.childNodes[i].tagName)
      //resultSet = resultSet.concat(traverseDomAndCollectElements(matchFunc, startEl.childNodes[i]));
      traverseDomAndCollectElements(matchFunc, startEl.childNodes[i], resultSet);
  }

  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag
//
var selectorTypeMatcher = function(selector) {
  var firstChar = selector.slice(0, 1);
  if(firstChar === '#')
    return 'id';
  if(firstChar === '.')
    return 'class';
  if(selector.indexOf('.') !== -1)
    return 'tag.class';
  return 'tag';
};


// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function(selector) {
  function matchTag(elem, tag){
      return elem.tagName && elem.tagName.toLowerCase() === tag.toLowerCase();
  }

  function matchClass(elem, _class){
      return elem.className.split(' ').indexOf(_class) != -1;
  }
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function(elem){
      return elem.id === selector.slice(1); 
    };

  } else if (selectorType === "class") {
    matchFunction = function(elem){
      return matchClass(elem, selector.slice(1));
    }
    
  } else if (selectorType === "tag.class") {
    var parts = selector.split('.');
    var tag = parts[0];
    var _class = parts[1];
    matchFunction = function(elem){
      return matchTag(elem, tag) && matchClass(elem, _class);
    }
    
  } else if (selectorType === "tag") {
    matchFunction = function(elem){
      return matchTag(elem, selector);
    }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
