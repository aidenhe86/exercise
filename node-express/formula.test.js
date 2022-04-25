const {findMean, findMedian, findMode} = require("./formula");

describe("Find Mean",function(){
    test("find mean for normal array",function(){
        expect(findMean([1,2,3,4])).toEqual(2.5)
    })
    test("find mean for empty array",function(){
        expect(findMean([])).toEqual(0)
    })

});

describe("Find median",function(){
    test("find the median for even sets",function(){
        expect(findMedian([1,2,3,4])).toEqual(2.5);
    })
    test("find the median for odd sets",function(){
        expect(findMedian([1,2,3])).toEqual(2);
    })
});

describe("Find mode",function(){
    test("find the mode",function(){
        expect(findMode([1,2,3,4,3])).toEqual(3)
    })
})