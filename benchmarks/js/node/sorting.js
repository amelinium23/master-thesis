const bubbleSort = (arr) => {
	if (arr.length <= 1) return arr;
	const n = arr.length;
	for (let i = 0; i < array.length - 1; i++) {
		for (let j = 0; j < array.length - n - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				const temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}
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
