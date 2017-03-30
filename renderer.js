// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var EventEmitter = require("fbemitter").EventEmitter;
var emitter = new EventEmitter();

global.appEmitter = emitter;

var service = require("./src/background/index");
require("./dist/index");

global.appEmitter.addListener("runDownloader", function(data) {
  if(!data.link || !data.title || !data.type){
    if(!data.link){
      global.appEmitter.emit("submit.error", new Error(`Field "Link to playlist" is empty`));
    } else if(!data.title){
      global.appEmitter.emit("submit.error", new Error(`Field "Title" is empty`));
    } else if(!data.type){
      global.appEmitter.emit("submit.error", new Error(`Field "Send to" is empty`));
    }

    return;
  }

  global.appEmitter.emit("submit.success");

  service.download(data.link, data.title, function(error, chunk) {
    global.appEmitter.emit("download.data.chunk", chunk);
  }, function(error, dir) {
    if(error){
      global.appEmitter.emit("download.error", error);
      return;
    } else {
      console.log(dir);
    }

    //TODO: Send to fileserver
  });
});