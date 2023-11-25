import { findIndexOfImmediateGreaterElement } from "./utils";

describe("findIndexOfImmediateGreaterElement", () => {
	it("should return 0 if array is empty", () => {
		expect(findIndexOfImmediateGreaterElement([], 1, (a, b) => a - b)).toBe(0);
	});

	it("should return 0 if target is greater than all elements", () => {
		expect(findIndexOfImmediateGreaterElement([1, 2, 3], 4, (a, b) => a - b)).toBe(0);
	});

	it("should return 0 if target is equal to first element", () => {
		expect(findIndexOfImmediateGreaterElement([1, 2, 3], 1, (a, b) => a - b)).toBe(0);
	});

	it("should return 1 if target is equal to second element", () => {
		expect(findIndexOfImmediateGreaterElement([1, 2, 3], 2, (a, b) => a - b)).toBe(1);
	});

	it("should return 2 if target is equal to third element", () => {
		expect(findIndexOfImmediateGreaterElement([1, 2, 3], 3, (a, b) => a - b)).toBe(2);
	});

	it("should return 1 if target is between first and second element", () => {
		expect(findIndexOfImmediateGreaterElement([1, 3], 2, (a, b) => a - b)).toBe(1);
	});
});
