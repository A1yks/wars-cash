function formatNumber(num: number, decimalPlaces = 2) {
    const precision = 10 ** decimalPlaces;

    return Math.floor(num * precision) / precision;
}

export default formatNumber;
