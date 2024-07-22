const { Gener } = require("./cursor");
const constants = require("./constants");

function generObject(gener, obj) {

}

function generArray(gener, array) {

}

function generValue(gener, any) {
    switch (any) {
        case null: case undefined: return gener.u8(constants.NUL);
    }
    var str;
    switch (typeof any) {
        case "number": 
            gener.u8(constants.NUMBER);
            str = String(any);
            gener.u8(str.length);
            gener.str(str);
            break;
        case "boolean": 
            gener.u8(any? constants.TRUE: constants.FALSE);
            break;
        case "string": 
            gener.u8(constants.STRING);
            // gener.
            break;
        case "object":
            Array.isArray(any)? 
                generArray(gener, any):
                generObject(gener, any);
            break;
        case "function": // TODO
        case "symbol": case "bigint": 
            throw new TypeError("不可输入Symbol和Bigint类型");
    }
}

function generTyped(gener, ty, val) {
    switch (any) {
        case null: case undefined: 
            if (!mayNull) throw new TypeError("非空检查失败");

        // case NaN: case Infinity: 
    }
    
}

module.exports = src=> {
    let gener = new Gener(src);
    
};
