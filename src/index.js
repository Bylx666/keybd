
const { Gener, Parser } = require("./cursor");

let g = new Gener();
g.vint(2**30);
let p = new Parser(g.export());
console.log(p.buf);
console.log(p.vint());

module.exports = ()=> {
};

