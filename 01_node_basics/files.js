const fs = require("fs");


// reading files
fs.readFile("./docs/blog.txt", (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
});


// writing files
fs.writeFile("./docs/blog2.txt", "This is blog 2", () => {
    console.log("File written successfully");
});


// Creating directories
if (!fs.existsSync("./assets")) {
    fs.mkdir("./assets", (err) => {
        if (err) {
            console.log(err);
        }
        console.log("folder created");
    });
} else {
    fs.rmdir("./assets", (err) => {
        if (err) {
            console.log(err);
        }
        console.log("folder deleted");
    });
}


// deleting files
if (fs.existsSync("./docs/deleteme.txt")) {
    fs.unlink("./docs/deleteme.txt", (err) => {
        if (err) {
            console.log(err);
        }
        console.log("file deleted");
    })
}