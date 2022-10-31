// A BASIC Node server
// Routing Requests


const http = require("http");
fs = require('fs');
const StringDecoder = require("string_decoder").StringDecoder;
const myModule = require('./database');


if (!fs.existsSync(__dirname+'/db')){
    fs.mkdirSync(__dirname+'/db');
    myModule.createDB();
}

http.createServer(function (request, response) {

    const requestURL = request.url;

    if(request.method === 'GET' && requestURL === "/styles.css"){
        serveCSS(request, response);
    }else if(request.method === 'GET' && requestURL === "/app.js"){
        serveApp(request, response);
    }else if(request.method === 'GET' && requestURL === "/data"){
        servData(request, response);
    }else if(request.method === 'GET' && requestURL === '/index.html?'){
        serveHTML(request, response);
    }else if(request.method === 'GET' ){
        serveHTML(request, response);
    }

    if(request.method === 'POST' && requestURL === '/addTodo') {
        addHandler(request);
    }else if(request.method === 'POST' && requestURL === '/update') {
        updateHandler(request);
    }else if(request.method === 'POST' && requestURL === '/delete') {
        deleteHandler(request, response);
    }
    else if(request.method === 'POST' && requestURL === '/deleteAll') {
        deleteAllHandler();
    }


}).listen(8000);

const addHandler = function (req) {
    let buffer = "";
    let decoder = new StringDecoder('utf-8');

    req.on('data', function (data) {
        buffer += decoder.write(data)
        const obj = {};
        obj['todo'] = data.toString();
        myModule.addElement(buffer);
    })
}

const updateHandler = function (req) {

    req.on('data', function (data) {
        let obj = JSON.parse(data);
        myModule.updateElement(obj['todo'],obj['done']);
    })
}

const deleteHandler = function (req) {

    req.on('data', function (data) {
        let obj = JSON.parse(data);
        myModule.deleteElement(obj['todo']);
    })
}

const deleteAllHandler = function () {
    myModule.deleteAllElements();
}


const servData = function (request, response) {

    let toDosToDisplay =[]

    myModule.loadDB().then((result) => {
        for (let key in result) {
            toDosToDisplay.push(result[key]);
        }
    response.writeHeader(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(toDosToDisplay));
    response.end();
    });
}

const serveHTML = function (request, response) {
    fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
};


const serveCSS = function (req, res) {
    fs.createReadStream(__dirname + req.url, 'UTF-8').pipe(res);
};

const serveApp = function (req, res) {
    fs.createReadStream(__dirname + req.url, 'UTF-8').pipe(res);
};
