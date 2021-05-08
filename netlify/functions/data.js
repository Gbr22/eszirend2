let {getData} = require("../../logic/data.js");
let fetch = require("node-fetch");
exports.handler = async function(event, context){
    let id = event.queryStringParameters.id;
    if (!id){
        return {
            statusCode: 400,
        };
    }
    
    return {
        statusCode: 200,
        body: await getData(fetch,id),
    };
}