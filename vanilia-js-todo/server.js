// A BASIC Node server
// Routing Requests


const http = require("http");
fs = require('fs');
const StringDecoder = require("string_decoder").StringDecoder;
const myModule = require('./database');
const config = require('./config');


if (!fs.existsSync(__dirname+'/db')){
    fs.mkdirSync(__dirname+'/db');
    myModule.createDB();
} else if(!fs.existsSync(__dirname+'/db/'+config.db.name)){
    myModule.createDB();
}


http.createServer(function (request, response) {

    const requestURL = request.url;

    if(request.method === 'GET' && requestURL === "/styles.css"){
        serveCSS(request, response);
        console.log('Styles.css was loaded successfully');
    }else if(request.method === 'GET' && requestURL === "/app.js"){
        serveApp(request, response);
        console.log('App.js was loaded successfully');
    }else if(request.method === 'GET' && requestURL === "/data"){
        servData(request, response);
        console.log('Data from backend was loaded successfully');
    }else if(request.method === 'GET' ){
        serveHTML(request, response);
        console.log('index.html was loaded successfully');
    }

    if(request.method === 'POST' && requestURL === '/addTodo') {
        console.log('Add request was detected');
        addHandler(request);
    }else if(request.method === 'POST' && requestURL === '/update') {
        console.log('Update request was detected');
        updateHandler(request);
    }else if(request.method === 'POST' && requestURL === '/delete') {
        console.log('Delete request was detected');
        deleteHandler(request, response);
    } else if(request.method === 'POST' && requestURL === '/deleteAll') {
        console.log('Delete all request was detected');
        deleteAllHandler();
    }

}).listen(config.app.httpPORT);

console.log('Server running on port ' + config.app.httpPORT +" and "+ config.db.name)

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
