// Fallback answer

function defaultArguments(func, params) {
  var functionAsString = func.toString();
  var argumentsList = functionAsString.slice(functionAsString.indexOf('(') + 1, functionAsString.indexOf(')')).split(',').map((arg) => arg.trim());

  return function() {
    var argumentsArray = Array.from(arguments);
    var paramsList = Object.assign({}, params);

    for (const [index, arg] of argumentsArray.entries()) {
      paramsList[argumentsList[index]] = arg;
   }
    for (var key in paramsList) {
      if (paramsList.hasOwnProperty(key) && !argumentsArray.hasOwnProperty(key)) {
        argumentsArray.push(paramsList[key]);
      }
    }
    
    var orderedArgs = argumentsList.map((param) => paramsList[param]);

    return func.apply(null, argumentsArray);
  };
}

//=====================================================//

