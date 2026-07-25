import { describe, expect, test } from "@jest/globals";

const sum = (a: number, b: number) => a + b;

describe('sum function', () => {
    test('add 1 + 2 equals 3', () => {
        expect(sum(1, 2)).toBe(3);
    })
});