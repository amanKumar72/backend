const http = require("http");
const url = require("url");
const fs = require("fs");

const requestListener = function (req, res) {
  const parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);

  if (parsedUrl.pathname === "favicon.ico") 
    return res.end("hello ");

  const fun = () => {
    fs.appendFile(
      "./log.txt",
      `${Date.now()} request for ${parsedUrl.pathname} httpMethod : ${req.method} \n`,
      (err) => {}
    );
  };

  switch (parsedUrl.pathname) {
    case "/": res.end("home"); fun();
      break;
    case "/contact":res.end("contact"); fun();
      break;
    case "/about":res.end("about"); fun()
      break;
    case "/signin": res.end("log in succesful"); 
    fs.appendFile(
      "./log.txt",
      `${Date.now()} request for ${parsedUrl.pathname} params : name = ${parsedUrl.query.name} pass=${parsedUrl.query.pass}\n`,
      (err) => {}
    );
      break;
    default:
      res.end("404");
  }
};

const server = http.createServer(requestListener);
server.listen(8000, () => console.log("server is listening on 8000"));
