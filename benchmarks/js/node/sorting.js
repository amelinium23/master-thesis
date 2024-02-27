const bubbleSort = (arr) => {
    if (arr.length <= 1) return arr;
    const n = arr.length;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - n - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
};

const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[0];

    let leftArr = [];
    let rightArr = [];

    for (let i = 1; i < arr.length; i++) {
        arr[i] < pivot ? leftArr.push(arr[i]) : rightArr.push(arr[i]);
    }

    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
};

const countingSortNegative = (arr, place) => {
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let range = max - min + 1;
    const n = arr.length;
    let count = new Array(range).fill(0);
    let output = new Array(arr.length).fill(0);

    //Store the frequency
    for (let i = 0; i < n; i++) {
        const num = Math.floor(arr[i] / place) % 10;
        count[num - min]++;
    }

    //Accumulate the frequency
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    //Sort based on frequency
    for (let i = n - 1; i >= 0; i--) {
        const num = Math.floor(arr[i] / place) % 10;
        output[count[num - min] - 1] = arr[i];
        count[num - min]--;
    }

    //Copy the output array
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
};

const radixSort = (arr) => {
    const max = Math.max(...arr);

    for (let i = 1; Math.floor(max / i) > 0; i *= 10) {
        countingSortNegative(arr, i);
    }
    return arr;
};

const generateRandomArray = (size) => {
    return Array.from(new Set(Array.from({ length: size }, () => Math.floor(Math.random() * size))));
};

const bubbleSortBenchmark = (numOfSamples, sizeOfArray) => {
    const results = [];
    for (let i = 0; i < numOfSamples; i++) {
        const arr = generateRandomArray(sizeOfArray);
        const start = performance.now();
        const sortingResult = bubbleSort(arr);
        const end = performance.now();
        results.push([end - start, sortingResult]);
    }
    return results;
};

const quickSortBenchmark = (numOfSamples, sizeOfArray) => {
    const results = [];
    for (let i = 0; i < numOfSamples; i++) {
        const arr = generateRandomArray(sizeOfArray);
        const start = performance.now();
        const sortingResult = quickSort(arr);
        const end = performance.now();
        results.push([end - start, sortingResult]);
    }
    return results;
};

const radixSortBenchmark = (numOfSamples, sizeOfArray) => {
    const results = [];
    for (let i = 0; i < numOfSamples; i++) {
        const arr = generateRandomArray(sizeOfArray);
        const start = performance.now();
        const sortingResult = radixSort(arr);
        const end = performance.now();
        results.push([end - start, sortingResult]);
    }
    return results;
};

(() => {
    const numOfSamples = 10;
    const sizeOfArray = 1000;
    const bubbleSortResults = bubbleSortBenchmark(numOfSamples, sizeOfArray);
    const quickSortResults = quickSortBenchmark(numOfSamples, sizeOfArray);
    const radixSortResults = radixSortBenchmark(numOfSamples, sizeOfArray);
    console.log(bubbleSortResults);
    console.log(quickSortResults);
    console.log(radixSortResults);
})();
