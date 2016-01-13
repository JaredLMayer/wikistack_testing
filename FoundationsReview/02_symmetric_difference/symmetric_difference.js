function difference (array, arrayTwo) {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    if (arrayTwo.indexOf(array[i])  == -1) {
      newArray.push(array[i]);
    }
  }
  
  return newArray;
}

function symmetricDiff (array, arrayTwo) {

  var newArray = difference(array, arrayTwo);
  var newArray2 =  difference(arrayTwo, array);
  
  return newArray.concat(newArray2);

}



//function symmetricDiff (array, arrayTwo) {
//  var newArray = [];
//      for (var i = 0; i < array.length; i++) {
//                if (arrayTwo.indexOf(array[i])  == -1) {
//                        newArray.push(array[i]);
//                }
//       }
//  for (var i = 0; i < arrayTwo.length; i++) {
//                if (array.indexOf(arrayTwo[i])  == -1) {
//                        newArray.push(arrayTwo[i]);
//                }
//        }
//
//        return newArray;
//}

