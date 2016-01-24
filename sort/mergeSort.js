function merge(left, right){
  var results = [];

  while(left.length && right.length){
    if(left[0] < right[0])
      results.push(left.shift());
    else
      results.push(right.shift());
  }
  if(left.length)
    results = results.concat(left);
  if(right.length)
    results = results.concat(right);
  return results;
}

function mergeSort(arr){
  if(arr.length <= 1)
    return arr;

  var middle = Math.floor(arr.length/2);
  var left = arr.slice(0, middle);
  var right = arr.slice(middle);
  left = mergeSort(left);
  right = mergeSort(right);
  
  return merge(left, right);
};
