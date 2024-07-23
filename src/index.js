
const parse = require("./parse");
const gener = require("./gener");

let buf = gener({
    b: 632526.000000001
});
console.log(buf, parse(buf));

module.exports = ()=> {
};

