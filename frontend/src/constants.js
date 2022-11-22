const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
    // Authorization: apiKey,
  };

let localIP = "http://localhost:8000/"


export {headers, localIP};