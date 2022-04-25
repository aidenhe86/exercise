// turn string into number
function stringToNums(arr){
    let result =[];

    for(let i = 0; i < arr.length;i++){
        let num = Number(arr[i]);

        if (Number.isNaN(num)){
            return new Error(`The value ${arr[i]} is not a number.`)
        }
        result.push(num);
    }
    return result;
};

// find mean
function findMean(nums){
    if(nums.length === 0) return 0;
    return nums.reduce(function(pre,cur){
        return pre + cur
    }) / nums.length
}


// find median
function findMedian(nums){
    nums.sort((a,b) => a - b);
    let middleI = Math.floor(nums.length / 2 );
    let median;

    if(nums.length % 2 === 0){
        median = (nums[middleI] + nums[middleI - 1]) / 2;
    }else{
        median = nums[middleI];
    }
    return median
}


// find mode
function findMode(nums){
    let counter = nums.reduce(function(pre,cur){
        pre[cur] = (pre[cur] || 0) + 1;
        return pre;
    },{})

    let mode;
    let count = 0
    for(let num in counter){
        if(counter[num] > count){
            mode = num;
            count = counter[num];
        }
    }
    return +mode
}

module.exports = {
    stringToNums,
    findMean,
    findMedian,
    findMode
};