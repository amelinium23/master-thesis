import { fromMeta } from "https://deno.land/x/dirname_deno@v0.3.0/mod.ts";

const { __dirname } = fromMeta(import.meta);

const bubbleSort = (arr) => {
    if (arr.length <= 1) return arr;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
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
    const leftArr = [];
    const rightArr = [];
    for (const i = 1; i < arr.length; i++) {
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
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < size) {
        const randomNumber = Math.floor(Math.random() * size);
        uniqueNumbers.add(randomNumber);
    }
    return Array.from(uniqueNumbers);
};

const bubbleSortBenchmark = (numberOfSamples) => {
    const arr = generateRandomArray(numberOfSamples);
    const start = performance.now();
    const sortingResult = bubbleSort(arr);
    const { rss } = Deno.memoryUsage();
    const end = performance.now();
    return { time: end - start, result: sortingResult, rss };
};

const quickSortBenchmark = (numberOfSamples) => {
    const arr = generateRandomArray(numberOfSamples);
    const start = performance.now();
    const sortingResult = quickSort(arr);
    const { rss } = Deno.memoryUsage();
    const end = performance.now();
    return { time: end - start, result: sortingResult, rss };
};

const radixSortBenchmark = (numberOfSamples) => {
    const arr = generateRandomArray(numberOfSamples);
    const start = performance.now();
    const sortingResult = radixSort(arr);
    const { rss } = Deno.memoryUsage();
    const end = performance.now();
    return { time: end - start, result: sortingResult, rss };
};
const performSortingBenchmark = (type, numberOfSamples, numberOfIterations) => {
    const result = [];

    const startTime = performance.now();

    switch (type) {
        case "bubble":
            for (let i = 0; i < numberOfIterations; i++) {
                const bubbleSortResult = bubbleSortBenchmark(numberOfSamples);
                result.push(bubbleSortResult);
            }
            return { result, time: performance.now() - startTime };
        case "radix":
            for (let i = 0; i < numberOfIterations; i++) {
                const radixSortResult = radixSortBenchmark(numberOfSamples);
                result.push(radixSortResult);
            }
            return { result, time: performance.now() - startTime };
        case "quick":
            for (let i = 0; i < numberOfIterations; i++) {
                const quickSortResult = quickSortBenchmark(numberOfSamples);
                result.push(quickSortResult);
            }
            return { result, time: performance.now() - startTime };

        default:
            throw Error(`[Sorting] Type of ${type} is not defined!`);
    }
};

(() => {
    if (Deno.args < 3) {
        Deno.stderr.write("[Sorting] You did not passed arguments");
        Deno.exit(1);
    }

    const sortingType = Deno.args.at(0);
    const numberOfSamples = Number(Deno.args.at(1));
    const numberOfIterations = Number(Deno.args.at(2));

    if (!sortingType || !numberOfSamples || !numberOfIterations) {
        Deno.exit(1);
    }

    const result = performSortingBenchmark(sortingType, numberOfSamples, numberOfIterations);
    const encoder = new TextEncoder();
    const encoded = encoder.encode(JSON.stringify(result));

    Deno.writeFileSync(`${__dirname}/denoSortingResult.json`, encoded);

    Deno.exit(0);
})();
