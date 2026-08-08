import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  validateCreateTask,
  validateUpdateTask,
} from "../validator/task.validator.js";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(protect);

router.route("/").post(validateCreateTask, createTask).get(getTasks);

router.route("/:id").get(getTask).put(validateUpdateTask, updateTask).delete(deleteTask);
export default router;
