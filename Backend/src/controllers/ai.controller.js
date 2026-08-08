import { generateTaskSuggestion } from "../services/ai.services.js";

export const suggestTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const suggestion = await generateTaskSuggestion(
      title,
      description
    );

    res.status(200).json({
      success: true,
      suggestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};