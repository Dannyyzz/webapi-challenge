const express = require("express");
const router = express.Router();

const Project = require("../data/helpers/projectModel");

function validateProjectInput(req, res, next) {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({
      message: "Please provide name and description"
    });

    return;
  }

  next();
}

async function validateProjectId(req, res, next) {
  const { id } = req.params;

  try {
    const project = await Project.get(id);

    if (!project) {
      res.status(404).json({
        message: "Invalid Project ID"
      });

      return;
    }

    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({
      errorMessage: "Internal Server Error"
    });
  }
}

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

router.get("/:id",validateProjectId, (req, res) => {
  const { project } = req;
  res.json({ project });
});

router.post("/", validateProjectInput, async (req, res) => {
  const { name, description } = req.body;

  try {
    const project = await Project.insert({
      name,
      description,
      completed: false
    });

    res.status(201).json({
      project
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Internal Server Error",
      message: error.message
    });
  }
});

router.put("/:id", validateProjectId (req, res) => {});

router.detele("/:id", (req, res) => {});

module.exports = router;
