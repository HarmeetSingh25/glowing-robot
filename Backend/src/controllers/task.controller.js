import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      reminder,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      reminder,
      user: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const getTasks = async (req, res) => {
  try {
    const {
      search,
      status,
      priority,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      user: req.userId,
    };

    // Search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter
    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Sort
    const sortOption = sort || "-createdAt";

    const tasks = await Task.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const totalTasks = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
    console.log("delete api hit");
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; 