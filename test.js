"use strict";

const aJSON = require("./index.js");

let s

(async () => {
    if((s = await aJSON.stringify({
        test: {
            a: [],
            b: [
                "a",
                "b",
                {},
                [],
                {
                    1: "aushf"
                }
            ]
        },
        "works": true
    })) !== '{"test":{"a":[],"b":["a","b",{},[],{"1":"aushf"}]},"works":true}') {
        console.log(s);
        process.exit(1);
    }
    console.log(s);
})()
