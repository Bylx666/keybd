/// 二进制解析器和生成器实现

class Parser {
    constructor(buf) {
        this.buf = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
        this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        this.i = 0;
        this.decoder = new TextDecoder();
    }
    u8() {
        this.i += 1;
        return this.view.getUint8(this.i - 1);
    }
    i8() {
        this.i += 1;
        return this.view.getInt8(this.i - 1);
    }
    vint() {
        let n = this.u8();
        let len = n >>> 6;
        n &= 0x3F;
        if (len) {
            n |= this.u8() << 6;
            for (let i = 1; i < len; ++i) 
                n |= this.u8() << i * 8 + 6;
        }
        return n;
    }
    read(n) {
        this.i += n;
        return this.buf.slice(this.i - n, this.i);
    }
    str(n) {
        return this.decoder.decode(this.read(n));
    }
}

class Gener {
    constructor(capacity = 1) {
        this.buf = new Uint8Array(capacity);
        this.view = new DataView(this.buf.buffer);
        this.i = 0;
        this.encoder = new TextEncoder();
    }
    go(n) {
        this.i += n;
        while (this.i >= this.buf.byteLength) {
            let old = this.buf;
            this.buf = new Uint8Array(old.byteLength * 2);
            this.view = new DataView(this.buf.buffer);
            this.buf.set(old, 0);
        }
    }
    u8(n) {
        this.go(1);
        this.view.setUint8(this.i - 1, n);
    }
    vint(n) {
        let bytes = [n & 0x3F];
        n >>>= 6;
        while (n > 0xFF) {
            bytes.push(n & 0xFF);
            n >>>= 8;
        }
        if (n > 0) bytes.push(n);
        // if (bytes.length > 4) throw new TypeError("数字超过2**30 - 1");
        bytes[0] |= (bytes.length - 1) << 6;
        this.write(bytes);
    }
    write(write) {
        this.go(write.length);
        this.buf.set(write, this.i - write.length);
    }
    str(str) {
        return this.write(this.encoder.encode(str));
    }
    export() {
        return this.buf.subarray(0, this.i);
    }
}

module.exports = {
    Parser, Gener
};