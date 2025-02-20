const fs = require("fs");
const os=require('os')
console.log(os.cpus().length)
//writing and reading in the file synchronously or blocking
fs.writeFileSync("./hello.txt", "hello from txt");
var data = fs.readFileSync("./hello.txt", "utf-8");
console.log(data);

//appending in the existing file and read synchronously or blocking
fs.appendFileSync("./hello.txt", "\n How are you");
data = fs.readFileSync("./hello.txt", "utf-8");
console.log(data);

//writing and reading in the file Asynchronously or non-blocking
fs.writeFile("./helloAsync.txt", "hello from async txt", (error) => {});
fs.readFile("./helloAsync.txt", "utf-8", (err, data) => {
  console.log(data);
});

//appending in the existing file and read Asynchronously or non-blocking
fs.appendFile("./helloAsync.txt", "\n How are you async", (error) => {});
fs.readFile("./helloAsync.txt", "utf-8", (err, data) => {
  console.log(data);
});

//delete a file
fs.unlinkSync('./hello.txt')

//return he stats of the file
console.log(fs.statSync('./hello.txt'))

//creates a directory 
fs.mkdirSync('myFolder')
//to creates dir inside dir 
fs.mkdirSync('myFolder/a/b',{recursive:true})


//delete a directory
fs.rmdirSync('myFolder')

//delete a directory with all its content
fs.rmdirSync('myFolder', {recursive: true})

//to read the content of the directory
console.log(fs.readdirSync('./'))