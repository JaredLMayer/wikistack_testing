function sometimes(fn) {
  var i = 0
  return function() {
    if (++i >= 4 && ( i%2 === 0)) {
      return "I do not know!"
    }
    return fn.apply(null, arguments)
  }
}
