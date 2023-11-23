export function findIndexOfImmediateGreaterElement<T>(
	arr: T[],
	target: T,
	compareFunction: (a: T, b: T) => number
) {
	let start = 0;
	let end = arr.length - 1;
	let ans = -1;
	while (compareFunction(arr[start], arr[end]) > 0) {
		const mid = Math.floor((start + end) / 2);
		if (arr[mid] > target) {
			ans = mid;
			end = mid - 1;
		} else {
			start = mid + 1;
		}
	}
	return ans;
}
