module.exports = {
    HEADER: new TextEncoder().encode("KyBD"),
    NUL   : 0b00000000,
    NUMBER: 0b00000001,
    FALSE : 0b00000010,
    TRUE  : 0b00000011,
    BUFFER: 0b00000100,
    STRING: 0b00000101,
    ARRAY : 0b00000110,
    OBJECT: 0b00000111,
    TYPED : 0b00001000
};