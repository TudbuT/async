"use strict"; 

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
                for(let i = 0; i < object.length - 1; i++) {
                    if(typeof object[i] === "function")
                        continue;
                    buf += await stringify(object[i]);
                    buf += ",";
                }
                if(typeof object[object.length - 1] !== "function") {
                    buf += await stringify(object[object.length - 1]);
                }
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
            for(let i = 0; i < keys.length - 1; i++) {
                if(typeof object[keys[i]] === "function") 
                    continue;
                buf += await stringify(keys[i]);
                buf += ":";
                buf += await stringify(object[keys[i]]);
                buf += ",";
            }
            if(typeof object[keys[keys.length - 1]] !== "function") {
                buf += await stringify(keys[keys.length - 1]);
                buf += ":";
                buf += await stringify(object[keys[keys.length - 1]]);
            }
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
