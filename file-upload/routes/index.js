const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

let routes = (app) => {
  router.post("/api/upload", controller.upload);
  router.get("/api/files", controller.getListFiles);
  router.get("/api/files/:name", controller.show);
  router.delete("/api/delete/:name", controller.deleteFile);

  app.use(router);
};

module.exports = routes;
