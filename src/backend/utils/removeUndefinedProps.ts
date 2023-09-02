function removeUndefinedProps(obj: object) {
    const newObj = { ...obj } as Record<string, unknown>;

    for (const key in newObj) {
        if (newObj[key] === undefined) {
            delete newObj[key];
        }
    }

    return newObj;
}

export default removeUndefinedProps;
