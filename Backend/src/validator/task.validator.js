const validStatus = ["Pending", "In Progress", "Completed"];
const validPriority = ["Low", "Medium", "High"];

export const validateCreateTask = (req, res, next) => {
  const { title, status, priority } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  if (title.length < 3 || title.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Title must be between 3 and 100 characters",
    });
  }

  if (status && !validStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  if (priority && !validPriority.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: "Invalid priority",
    });
  }

  next();
};

export const validateUpdateTask = (req, res, next) => {
  const { title, status, priority } = req.body;

  if (title !== undefined) {
    if (title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title cannot be empty",
      });
    }

    if (title.length < 3 || title.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Title must be between 3 and 100 characters",
      });
    }
  }

  if (status && !validStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  if (priority && !validPriority.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: "Invalid priority",
    });
  }

  next();
};