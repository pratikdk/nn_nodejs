const fs = require("fs");

// const readStream = fs.createReadStream("./docs/longblog1.txt");

// readStream.on("data", (dataChunk) => { // dataChunk === single buffer
//     console.log("==== NEW CHUNK ====");
//     console.log(dataChunk);
// })




const readStream = fs.createReadStream("./docs/longblog1.txt", { encoding: "utf-8"});
const writeStream = fs.createWriteStream("./docs/longblog2.txt");

readStream.on("data", (dataChunk) => { 
    console.log("==== NEW CHUNK ====");
    console.log(dataChunk);
    writeStream.write(dataChunk);
})



// piping
readStream.pipe(writeStream);