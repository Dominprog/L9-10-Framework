function validateTypes(data) {
    const typesFound = {
        string: false,
        number: false,
        boolean: false,
        Date: false,
        Array: false
    };

    for (const value of Object.values(data)) {
        if (typeof value === 'string') {
            typesFound.string = true;
            if (!isNaN(Date.parse(value))) typesFound.Date = true;
        }
        if (typeof value === 'number') typesFound.number = true;
        if (typeof value === 'boolean') typesFound.boolean = true;
        if (Array.isArray(value)) typesFound.Array = true;
    }

    return Object.values(typesFound).every(type => type === true);
}

module.exports = { validateTypes };