const fs = require("fs");
const path = require("path");

const bubbleSort = (arr) => {
    const cArr = [...arr];
    if (cArr.length <= 1) return cArr;
    const n = cArr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (cArr[j] > cArr[j + 1]) {
                const temp = cArr[j];
                cArr[j] = cArr[j + 1];
                cArr[j + 1] = temp;
            }
        }
    }
    return cArr;
};

const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[0];

    const leftArr = [];
    const rightArr = [];

    for (let i = 1; i < arr.length; i++) {
        arr[i] < pivot ? leftArr.push(arr[i]) : rightArr.push(arr[i]);
    }

    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
};

const countingSortNegative = (arr, place) => {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;
    const n = arr.length;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length).fill(0);

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
    const arr = [];
    while (arr.length < size) {
        const r = Math.floor(Math.random() * size * 0.5);
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
};

const bubbleSortBenchmark = (numberOfSamples, sizeOfArray) => {
    const results = [];
    for (let i = 0; i < numberOfSamples; i++) {
        const arr = generateRandomArray(sizeOfArray);
        const start = performance.now();
        const sortingResult = bubbleSort(arr);
        const end = performance.now();
        results.push({ time: end - start, result: sortingResult });
    }
    return results;
};

const quickSortBenchmark = (numberOfSamples, sizeOfArray) => {
    const results = [];
    for (let i = 0; i < numberOfSamples; i++) {
        const arr = generateRandomArray(sizeOfArray);
        const start = performance.now();
        const sortingResult = quickSort(arr);
        const end = performance.now();
        results.push({ time: end - start, result: sortingResult });
    }
    return results;
};

const radixSortBenchmark = (numberOfSamples, sizeOfArray) => {
    const results = [];
    for (let i = 0; i < numberOfSamples; i++) {
        const arr = generateRandomArray(sizeOfArray);
        const start = performance.now();
        const sortingResult = radixSort(arr);
        const end = performance.now();
        results.push({ time: end - start, result: sortingResult });
    }

    return results;
};

const performSortingBenchmark = (type, numberOfSamples, sizeOfArray, numberOfIterations) => {
    const result = [];

    const startTime = performance.now();

    switch (type) {
        case "bubble":
            for (let i = 0; i < numberOfIterations; i++) {
                const bubbleSortResult = bubbleSortBenchmark(numberOfSamples, sizeOfArray);
                result.push(bubbleSortResult);
            }
            return { result, time: performance.now() - startTime };
        case "radix":
            for (let i = 0; i < numberOfIterations; i++) {
                const bubbleSortResult = radixSortBenchmark(numberOfSamples, sizeOfArray);
                result.push(bubbleSortResult);
            }
            return { result, time: performance.now() - startTime };
        case "quick":
            for (let i = 0; i < numberOfIterations; i++) {
                const bubbleSortResult = quickSortBenchmark(numberOfSamples, sizeOfArray);
                result.push(bubbleSortResult);
            }
            return { result, time: performance.now() - startTime };

        default:
            throw Error(`[Sorting] Type of ${type} is not defined!`);
    }
};

(() => {
    if (process.argv.length < 7) {
        process.exit(1);
    }

    const sortingType = process.argv.at(2);
    const numberOfSamples = Number(process.argv.at(3));
    const numberOfIterations = Number(process.argv.at(4));
    const arraySize = Number(process.argv.at(5));

    if (!sortingType || !numberOfSamples || !numberOfIterations || !arraySize) {
        process.exit(1);
    }

    const result = performSortingBenchmark(sortingType, numberOfSamples, arraySize, numberOfIterations);

    fs.writeFileSync(path.join(__dirname, "nodeSortingResult.json"), JSON.stringify(result));

    process.exit(0);
})();
