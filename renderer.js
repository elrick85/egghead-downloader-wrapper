// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var EventEmitter = require("fbemitter").EventEmitter;
var emitter = new EventEmitter();

global.appEmitter = emitter;

var service = require("./src/background/index");
require("./dist/index");

global.appEmitter.addListener("runDownloader", function(data) {
  if(!data.link || !data.title){
    global.appEmitter.emit("submit.error", new Error(`Field ${!data.link ? "link" : "title"} is empty`));

    return;
  }

  global.appEmitter.emit("submit.success");

  service.download(data.link, data.title, function(error, chunk) {
    global.appEmitter.emit("download.data.chunk", chunk);

    if(error){
      global.appEmitter.emit("download.error", error);
      return;
    }
  });
});