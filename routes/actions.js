const express = require("express");
const Action = require("../data/helpers/actionModel");
const Project = require("../data/helpers/projectModel");

const router = express.Router();

function createAction(projectId, description, notes) {
  return {
    project_id: projectId,
    completed: false,
    description,
    notes
  };
}

async function validateActionId(req, res, next) {
  const { id } = req.params;

  try {
    const action = await Action.get(id);

    if (!action) {
      res.status(404).json({
        message: "invalid action id"
      });

      return;
    }

    req.action = action;

    next();
  } catch (error) {
    res.status(500).json({
      errorMessage: "internal server error",
      message: error.message
    });
  }
}

async function validateActionInput(req, res, next) {
  const { project_id, description, notes } = req.body;

  if (!project_id || !description || !notes) {
    res.status(400).json({
      message: "Please provide a project_id, description, and notes"
    });
    return;
  }

  try {
    const project = await Project.get(project_id);

    if (!project) {
      res.status(404).json({
        message: "invalid project_id"
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      errorMessage: "internal server error",
      message: error.message
    });
  }
}

// getAllActions
router.get("/", async (_req, res) => {
  try {
    const actions = await Action.get();

    res.json({
      actions
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "internal server error",
      message: error.message
    });
  }
});

// getActionById
router.get("/:id", validateActionId, async (req, res) => {
  const { action } = req;

  res.json({
    action
  });
});

// createAction
router.post("/", (req, res) => {});

// updateActionById
router.put("/:id", (req, res) => {});

// deleteActionById
router.delete("/:id", (req, res) => {});

module.exports = router;
