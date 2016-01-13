function translate(wordString){
	var vowel = "aeiou";
	var index = 0;
	var inputWordArr = wordString.split(" ");
	var pigWordArray = [];

	inputWordArr.forEach(function(word){
  	for(var i = 0; i < word.length; i++){
  		if(vowel.search(word[i]) !== -1){ // is the character word[i] a vowel?
  			if(word[i] !== "u" || (word[i] === "u" && word[i-1] !== "q")){
  				index = i;
  				break;
  			}
  		}
  	}
  	pigWordArray.push(word.substring(index, word.length) + word.substring(0, index) + 'ay');
  });

  return pigWordArray.join(" ");
}
