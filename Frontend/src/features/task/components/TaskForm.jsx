import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { generateSuggestion } from "../store/aiSlice";
import ReactMarkdown from "react-markdown";

const TaskForm = ({
    defaultValues = {},
    onSubmit,
    loading,
    buttonText,
}) => {
    const { register, handleSubmit, reset, watch,
        formState: { errors },
    } = useForm({
        defaultValues,
    });

    const dispatch = useDispatch();

    const { suggestion, loading: aiLoading } = useSelector(
        (state) => state.ai
    );


    const handleGenerate = () => {
        dispatch(
            generateSuggestion({
                title: watch("title"),
                description: watch("description"),
            })
        );
    };


    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    let navigate = useNavigate()
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            {/* Title */}

            <div>
                <label className="block mb-2 font-medium">
                    Title
                </label>

                <input
                    type="text"
                    className="w-full border rounded-lg p-3"
                    {...register("title", {
                        required: "Title is required",
                    })}
                />

                {errors.title && (
                    <p className="text-red-500 text-sm">
                        {errors.title.message}
                    </p>
                )}
            </div>

            {/* Description */}

            <div>
                <label className="block mb-2 font-medium">
                    Description
                </label>

                <textarea
                    rows={5}
                    className="w-full border rounded-lg p-3"
                    {...register("description")}
                />
            </div>
            <div>
                <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={aiLoading}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
                >
                    {aiLoading
                        ? "Generating..."
                        : "✨ Generate AI Suggestion"}
                </button>
            </div>


            {suggestion && (
                <div className="rounded-xl border bg-gray-50 shadow-sm">

                    <div className="border-b p-4">
                        <h2 className="text-lg font-semibold">
                            ✨ AI Implementation Plan
                        </h2>
                    </div>

                    <div className="max-h-96 overflow-y-auto p-5">
                        <article className="prose prose-sm max-w-none break-words overflow-x-auto">
                            <ReactMarkdown>
                                {suggestion}
                            </ReactMarkdown>
                        </article>
                    </div>

                </div>
            )}
            {/* Status */}

            <div>
                <label className="block mb-2 font-medium">
                    Status
                </label>

                <select
                    className="w-full border rounded-lg p-3"
                    {...register("status")}
                >
                    <option value="Pending">
                        Pending
                    </option>

                    <option value="In Progress">
                        In Progress
                    </option>

                    <option value="Completed">
                        Completed
                    </option>
                </select>
            </div>

            {/* Priority */}

            <div>
                <label className="block mb-2 font-medium">
                    Priority
                </label>

                <select
                    className="w-full border rounded-lg p-3"
                    {...register("priority")}
                >
                    <option value="Low">
                        Low
                    </option>

                    <option value="Medium">
                        Medium
                    </option>

                    <option value="High">
                        High
                    </option>
                </select>
            </div>

            {/* Due Date */}

            <div>
                <label className="block mb-2 font-medium">
                    Due Date
                </label>

                <input
                    type="date"
                    className="w-full border rounded-lg p-3"
                    {...register("dueDate")}
                />
            </div>

            <button
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
            >
                {loading ? "Saving..." : buttonText}
            </button>
        </form>
    );
};

export default TaskForm;