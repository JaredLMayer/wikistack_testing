describe('mergeSort', function(){

  describe('merging', function(){
    var result;
    beforeEach(function(){
      result = merge([1, 3, 4], [2, 5]);
    });
    it('merges two array which have been presorted', function(){
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('mergeSorting', function(){
    describe('using [9, 10, 2, 7, 5]', function(){
      var result;
      beforeEach(function(){
        result = mergeSort([2, 5, 7, 9, 10]);
      });
      it('will return [2, 5, 7, 9, 10]', function(){
        expect(result).toEqual([2, 5, 7, 9, 10]);
      });
    
    });
  
  });

});
