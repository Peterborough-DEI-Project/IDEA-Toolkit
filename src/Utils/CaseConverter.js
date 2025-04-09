
// function to convert strings and JSON objects to the desired case
const CaseConverter = {
    toCamelCase: function (str) {
        return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
    },
    toSnakeCase: function (str) {
        return str.replace(/([A-Z])/g, (match) => '_' + match.toLowerCase());
    },
    fromJSON: function (json) {
        return new JSONCaseConverter(json);
    }
}

// Wraps the json object and allows chainable methods
class JSONCaseConverter {
    constructor(json) {
        this.json = json;
    }

    toCamelCase() {
        return convertKeys(this.json, CaseConverter.toCamelCase);
    }

    toSnakeCase() {
        return convertKeys(this.json, CaseConverter.toSnakeCase);
    }
}

// Recursive function for converting a JSON object/array
function convertKeys(obj, converter) {
    if (Array.isArray(obj)) {
        return obj.map((item) => convertKeys(item, converter));
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            const newKey = converter(key);
            acc[newKey] = convertKeys(obj[key], converter);
            return acc;
        }, {});
    }
    return obj;
}

export default CaseConverter;


