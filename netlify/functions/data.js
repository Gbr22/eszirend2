let {getData} = require("../../logic/data.js");
let fetch = require("node-fetch");
exports.handler = async function(event, context){
    return {
        statusCode: 200,
        body: JSON.stringify(await getData(fetch)),
    };
}