function removeSymbols(obj) {
    const newObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Check if the value is a string
            if (typeof obj[key] === 'string') {
                // Remove symbols from the string
                newObj[key] = obj[key].replace(/[^\w\s]/gi, ''); // Replace all symbols with empty string
            } else {
                // If it's not a string, keep the original value
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}

export default removeSymbols;