function bubbleSort(arr){
  var sorted = false;

  var j = 0;
  while(!sorted){
    sorted = true;
    for(var i = 0; i < arr.length - 1 - j; i++){
      if(arr[i] > arr[i + 1]){
        var tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        sorted = false;
      }
    }
    j++;
  }
  return arr;
}
