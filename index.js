"use strict";

async function loop(array, call) {
    async function step(n) {
        if(n == array.length)
            return;
        await call(n);
        await new Promise((resolve) => setImmediate(async () => {await step(n+1); resolve()}));
    }
    await step(0);
}

async function stringify(object) {
    if(object === undefined)
        return "null";
    switch(typeof object) {
        case "object":
            if(object === null)
                return "null";
            if(Array.isArray(object)) {
                if(object.length === 0) {
                    return "[]";
                }
                let buf = "[";
                await loop(object, async i => {
                    if(typeof object[i] === "function")
                        return;
                    buf += await stringify(object[i]);
                    buf += ",";
                });
                buf = buf.substring(0, buf.length - 1);
                buf += "]";
                return buf;
            }

            if(typeof object.toJSON === "function") {
                return await stringify(object.toJSON());
            }
            if(object.toJSON !== undefined) {
                return await stringify(object.toJSON);
            }

            let keys = Object.keys(object);
            if(keys.length === 0) {
                return "{}";
            }
            let buf = "{";
            await loop(keys, async i => {
                if(typeof object[keys[i]] === "function")
                    return;
                buf += await stringify(keys[i]);
                buf += ":";
                buf += await stringify(object[keys[i]]);
                buf += ",";
            });
            buf = buf.substring(0, buf.length - 1);
            buf += "}";
            return buf;
            break;
        default:
            return JSON.stringify(object);
    }
}

module.exports = {
    "stringify": async function (object) {
        return await stringify(object)
    }
}
