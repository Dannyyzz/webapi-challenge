const express = require("express");
const projects = require("./routes/projects");
const projects = require("./routes/actions");

const server = express();

server.use("/api/projects", projects);
server.use("/api/actions", actions);

module.exports = server;
