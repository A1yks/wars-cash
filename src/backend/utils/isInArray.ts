function isInArray<T>(arr: T[], value: T, errMsg?: string) {
    const result = arr.includes(value);

    if (!result && errMsg !== undefined) {
        throw new Error(errMsg);
    }

    return result;
}

export default isInArray;
