function parse(data) {
    try {
        return JSON.parse(data);
    } catch {
        return false;
    }
}

function stringify(json) {
    try {
        return JSON.stringify(json);
    } catch {
        return false;
    }
}

module.exports = { parse, stringify };
