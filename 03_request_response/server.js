const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);
    
    // console.log(_.random(1, 20));

    // res.setHeader("Content-Type", "text/plain");
    // res.write("Hello, world");


    // res.setHeader("Content-Type", "text/html");
    // res.write("<h1>Home Page</h1>");
    // res.end();


    // res.setHeader("Content-Type", "text/html");
    // fs.readFile("./views/index.html", (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         res.end();
    //     } else {
    //         // res.write(data)
    //         res.end(data);
    //     }
    // })

    // const greet = _.once(() => {
    //     console.log("Greet once");
    // });
    // greet();
    // greet();

    res.setHeader("Content-Type", "text/html");

    let path = "./views/"
    switch(req.url) {
        case "/":
            path += "index.html";
            res.statusCode = 200;
            break;
        case "/about":
            path += "about.html";
            res.statusCode = 200;
            break;
        case "/about-us":
            res.statusCode = 301;
            res.setHeader("Location", "/about");
            res.end();
            break;
        default:
            path += "404.html";
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            // res.write(data)
            res.end(data);
        }
    })
})

server.listen(3000, "localhost", () => {
    console.log("Listening on port 3000");
})