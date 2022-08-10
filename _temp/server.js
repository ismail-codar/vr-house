var http = require("http");
var os = require("os");

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(
    "<pre>Versions: " +
      JSON.stringify(process.versions) +
      " listening on" +
      JSON.stringify(server.address()) +
      " interfaces are " +
      JSON.stringify(os.networkInterfaces()) +
      "</pre>"
  );
});
server.listen(8080, "0.0.0.0");
console.log("Server running at http://0.0.0.0:8080/");
