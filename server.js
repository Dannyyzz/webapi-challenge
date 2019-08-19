const express = require("express");
const projects = require("./routes/projects");
const actions = require("./routes/actions");

const server = express();

server.use(express.json());

server.use("/api/projects", projects);
server.use("/api/actions", actions);

module.exports = server;
