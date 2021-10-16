// console.log(global);




setTimeout(() => {
    console.log("hello");
    clearInterval(interval)
}, 4000);

const interval = setInterval(() => {
    console.log("in the interval");
}, 1000);




console.log(__dirname);
console.log(__filename);