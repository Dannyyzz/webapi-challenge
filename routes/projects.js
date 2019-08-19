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

router.get("/:id", validateProjectId, (req, res) => {
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

router.put(
  "/:id",
  [validateProjectId, validateProjectInput],
  async (req, res) => {
    try {
      const project = await Project.update(req.project.id, {
        name: req.project.name,
        description: req.project.description,
        ...req.body
      });

      res.status(200).json({
        project
      });
    } catch (error) {
      res.status(500).json({
        errorMessage: "Internal Server Error",
        message: error.message
      });
    }
  }
);

router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    await Project.remove(req.project.id);

    res.status(200).json({
      project: req.project
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Internal Server Error",
      message: error.message
    });
  }
});

module.exports = router;
