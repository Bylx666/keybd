const { Gener } = require("./cursor");
const constants = require("./constants");

function generArray(gener, array) {
    gener.u8(constants.ARRAY);
    gener.vint(array.length);
    for (let item of array) generValue(gener, item);
}

function generObject(gener, obj) {
    gener.u8(constants.OBJECT);
    let keys = Object.keys(obj);
    gener.vint(keys.length);
    for (let key of keys) {
        generVStr(gener, key);
        generValue(gener, obj[key]);
    }
}

function generVStr(gener, str) {
    let buf = gener.encoder.encode(str);
    gener.u8(buf.byteLength);
    gener.write(buf);
}

function generValue(gener, any) {
    switch (any) {
        case null: case undefined: 
            return gener.u8(constants.NUL);
    }

    if (any instanceof ArrayBuffer) any = new Uint8Array(any);
    if (any instanceof Uint8Array) {
        gener.u8(constants.BUFFER);
        gener.vint(any.byteLength);
        return gener.write(any);
    }

    switch (typeof any) {
        case "number": 
            gener.u8(constants.NUMBER);
            let str = String(any);
            gener.u8(str.length);
            gener.str(str);
            break;
        case "boolean": 
            gener.u8(any? constants.TRUE: constants.FALSE);
            break;
        case "string": 
            gener.u8(constants.STRING);
            generVStr(gener, any);
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

module.exports = value=> {
    let gener = new Gener(4);
    generValue(gener, value);
    return gener.export();
};
