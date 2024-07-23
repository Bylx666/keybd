const { Parser } = require("./cursor");
const constants = require("./constants");

function parseArray(parser) {
    let len = parser.vint();
    let array = new Array(len);
    for (let i = 0; i < len; ++i) 
        array[i] = parseValue(parser);
    return array;
}

function parseObject(parser) {
    let len = parser.vint();
    let obj = {};
    for (let i = 0; i < len; ++i) {
        let key = parser.str(parser.u8());
        obj[key] = parseValue(parser);
    }
    return obj;
}

function parseValue(parser) {
    switch (parser.u8()) {
        case constants.NUL: return null;
        case constants.NUMBER: 
            return parseFloat(parser.str(parser.u8()));
        case constants.FALSE: return false;
        case constants.TRUE: return true;
        case constants.BUFFER: 
            return parser.read(parser.vint());
        case constants.STRING: 
            return parser.str(parser.vint());
        case constants.ARRAY:
            return parseArray(parser);
        case constants.OBJECT:
            return parseObject(parser);
    }
}

module.exports = src=> {
    let parser = new Parser(src);
    return parseValue(parser);
};