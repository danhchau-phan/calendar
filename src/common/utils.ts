export function findIndexOfImmediateGreaterElement<T>(
	arr: T[],
	target: T,
	compareFunction: (a: T, b: T) => number
) {
	// returns array length if target is greater than all elements in array
	// returns 0 if target is smaller than all elements in array
	if (arr.length === 0) return 0;
	let start = 0;
	let end = arr.length - 1;
	let mid = -1;
	while (start <= end) {
		mid = Math.floor((start + end) / 2);
		if (mid === start && mid === end) {
			return compareFunction(arr[mid], target) > 0 ? mid : mid + 1;
		}
		if (compareFunction(arr[mid], target) > 0) {
			end = mid;
		} else {
			start = ++mid;
		}
	}
	return mid;
}
