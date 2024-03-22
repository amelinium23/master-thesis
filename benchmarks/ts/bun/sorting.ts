import fs from "node:fs";
import path from "node:path";

export const bubbleSort = (arr: number[]): number[] => {
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

export const quickSort = (arr: number[]): number[] => {
	if (arr.length <= 1) return arr;
	const pivot = arr[0];

	let leftArr = [];
	let rightArr = [];

	for (let i = 1; i < arr.length; i++) {
		arr[i] < pivot ? leftArr.push(arr[i]) : rightArr.push(arr[i]);
	}

	return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
};

const countingSortNegative = (arr: number[], place: number) => {
	let min = Math.min(...arr);
	let max = Math.max(...arr);
	let range = max - min + 1;
	const n = arr.length;
	let count = new Array(range).fill(0);
	let output = new Array(arr.length).fill(0);

	for (let i = 0; i < n; i++) {
		const num = Math.floor(arr[i] / place) % 10;
		count[num - min]++;
	}

	for (let i = 1; i < count.length; i++) {
		count[i] += count[i - 1];
	}

	for (let i = n - 1; i >= 0; i--) {
		const num = Math.floor(arr[i] / place) % 10;
		output[count[num - min] - 1] = arr[i];
		count[num - min]--;
	}

	for (let i = 0; i < n; i++) {
		arr[i] = output[i];
	}

	return arr;
};

export const radixSort = (arr: number[]) => {
	const max = Math.max(...arr);
	for (let i = 1; Math.floor(max / i) > 0; i *= 10) {
		countingSortNegative(arr, i);
	}
	return arr;
};

const generateRandomArray = (size: number): number[] => {
	const uniqueNumbers = new Set();
	while (uniqueNumbers.size < size) {
		const randomNumber = Math.floor(Math.random() * size);
		uniqueNumbers.add(randomNumber);
	}
	return Array.from(uniqueNumbers) as number[];
};

const bubbleSortBenchmark = (numberOfSamples: number) => {
	const results = [];
	const arr = generateRandomArray(numberOfSamples);
	const start = performance.now();
	const sortingResult = bubbleSort(arr);
	const end = performance.now();
	return { time: end - start, result: sortingResult };
};

const quickSortBenchmark = (numberOfSamples: number) => {
	const arr = generateRandomArray(numberOfSamples);
	const start = performance.now();
	const sortingResult = quickSort(arr);
	const end = performance.now();
	return { time: end - start, result: sortingResult };
};

const radixSortBenchmark = (numberOfSamples: number) => {
	const arr = generateRandomArray(numberOfSamples);
	const start = performance.now();
	const sortingResult = radixSort(arr);
	const end = performance.now();
	return { time: end - start, result: sortingResult };
};

const performSortingBenchmark = (type: string, numberOfSamples: number, numberOfIterations: number) => {
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
				const bubbleSortResult = radixSortBenchmark(numberOfSamples);
				result.push(bubbleSortResult);
			}
			return { result, time: performance.now() - startTime };
		case "quick":
			for (let i = 0; i < numberOfIterations; i++) {
				const bubbleSortResult = quickSortBenchmark(numberOfSamples);
				result.push(bubbleSortResult);
			}
			return { result, time: performance.now() - startTime };

		default:
			throw Error(`[Sorting] Type of ${type} is not defined!`);
	}
};

(() => {
	if (Bun.argv.length < 5) {
		process.exit(1);
	}

	const sortingType = Bun.argv.at(2);
	const numberOfSamples = Number(Bun.argv.at(3));
	const numberOfIterations = Number(Bun.argv.at(4));

	if (!sortingType || !numberOfSamples || !numberOfIterations) {
		process.exit(1);
	}

	const result = performSortingBenchmark(sortingType, numberOfSamples, numberOfIterations);

	fs.writeFileSync(path.join(import.meta.dir, "bunSortingResult.json"), JSON.stringify(result));

	process.exit(0);
})();
