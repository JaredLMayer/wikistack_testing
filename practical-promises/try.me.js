var Promise = require('bluebird');

var start = new Date();
function timerPromise(timer){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      console.log('elapsed', (new Date() - start)/1000, ' from start');
      resolve(timer);
    }, timer*1000);
  });
}


if(process.env.BAD){
  Promise.resolve()
    .then(timerPromise(2))
    .then(timerPromise(3))
    .then(function(){
      console.log('done');
    })
}

if(process.env.GOOD){

Promise.resolve()
  .then(function(){
    return timerPromise(2)
  })
  .then(function(){
    return timerPromise(3)
  })
  .then(function(){
    console.log('done');
  })
}
