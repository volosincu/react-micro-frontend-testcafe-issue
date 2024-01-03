const path = require("path"),
  request = require("request");

var express = require("express");
const http = require("http");
const fs = require("fs").promises;
const fs_ = require("fs");
var cors = require("cors");
const fileUpload = require("express-fileupload");

var argv = require("yargs/yargs")(process.argv.slice(2))
  .options({
    host: {
      alias: "h",
      describe: "choose the host",
      choices: ["localhost", "domeniu.etc.hosts"],
      demandOption: false,
    },
    port: {
      alias: "p",
      describe: "provide a port",
      demandOption: false,
    },
    spec: {
      alias: "s",
      describe: "program specifications",
    },
  })
  .help().argv;

console.log("%c INFO: script arguments: ", "background: #222; color: #bada55");
console.log(
  "%c " + JSON.stringify(argv) + " ",
  "background: #000; color: #fff"
);

var app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  setTimeout(next, Math.floor(Math.random() * 1000 + 100));
});

app.use(cors());

app.use(
  fileUpload({
    limits: {
      fileSize: 50 * 1024 * 1024,
      useTempFiles: true,
      tempFileDir: "./tmp/",
    },
  })
);

// app.use(express.static('public'));

// app.get("/", (req, res)=> {
// 	res.sendFile(path.join(__dirname + '/index.html'));
// });

const activeFeeds =
  '[{"text":"Account request","feedid":"5a46s4","name":"Notification"},{"text":"Account request ","feedId":"32e4r344","name":"Alert"},{"text":"Form validation ","feedId":"145s6f","name":"Information"},{"text":"Account request ","feedId":"5a46s4","name":"Notification"},{"text":"Account request ","feedId":"32e4r344","name":"Alert"},{"text":"Form validation ","feedId":"145s6f","name":"Information"},{"text":"Account request ","feedId":"5a46s4","name":"Notification"},{"text":"Account request ","feedId":"32e4r344","name":"Alert"},{"text":"Form validation ","feedId":"145s6f","name":"Information"},{"text":"Account request ","feedId":"5a46s4","name":"Notification"},{"text":"Account request ","feedId":"32e4r344","name":"Alert"},{"text":"Form validation ","feedId":"145s6f","name":"Information"},{"text":"Account request ","feedId":"5a46s4","name":"Notification"},{"text":"Account request ","feedId":"32e4r344","name":"Alert"},{"text":"Form validation ","feedId":"145s6f","name":"Information"},{"text":"Account request ","feedId":"5a46s4","name":"Notification"},{"text":"Account request ","feedId":"3Gti52e4r344","name":"Alert"},{"text":"Form validation ","feedId":"145s6f","name":"Information"}]';

app.get("/account/logout", (req, res) => {
  // res.status(500).send('Something broke!')
  console.log(req.query.redirect_uri);
  console.log(decodeURIComponent(req.query.redirect_uri));
  res.redirect(302, "https://localhost:10000/mfestudio/#/journeyA/insert");
  // res.status(200).send();
});

app.get("/account/login", (req, res) => {
  // res.status(500).send('Something broke!')
  console.log(req.query.redirect_uri);
  console.log(decodeURIComponent(req.query.redirect_uri));
  // res.redirect(302, decodeURIComponent(req.query.redirect_uri));
  res.redirect(302, decodeURIComponent(req.query.redirect_uri));
  // res.status(200).send();
});

app.get("/feeds/active", (req, res) => {
  // res.status(401).send("Unauthorized");
  res.send(activeFeeds);
});

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// app.post("/api/upload", async (req, res) => {
//   console.log(req.body);
//   if (req.body.message === "send err") {
//     await sleep(3000);
//     res.sendStatus(500);
//   } else {
//     console.log(req.file); // the uploaded file object
//     console.log(req.data);
//     res.sendStatus(200);
//   }
// });

const port = argv.p || 7272,
  host = argv.h || "localhost";

server = app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
