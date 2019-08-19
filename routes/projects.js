const express = require("express");
const router = express.Router();

const Project = require("../data/helpers/projectModel");

router.get("/", async (_req, res) => {
  try {
    const projects = await Project.get();

    res.json({
      projects
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Internal Server Error",
      message: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.get(id);

    if (!project) {
      res.status(404).json({
        message: "Project not found with that ID"
      });
    }

    res.status(200).json({
      project
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Internal Server Error",
      message: error.message
    });
  }
});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.detele("/:id", (req, res) => {});

module.exports = router;
