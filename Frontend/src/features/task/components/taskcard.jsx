import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/task.slice";
import toast from "react-hot-toast";

const TaskCard = ({ task }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (!window.confirm("Delete this task?")) return;

        const result = await dispatch(deleteTask(task._id));

        if (deleteTask.fulfilled.match(result)) {
            toast.success("Task Deleted");
        } else {
            toast.error(result.payload);
        }
    };

    const statusColor = {
        Pending: "bg-yellow-100 text-yellow-700",
        "In Progress": "bg-blue-100 text-blue-700",
        Completed: "bg-green-100 text-green-700",
    };

    const priorityColor = {
        Low: "bg-gray-100 text-gray-700",
        Medium: "bg-orange-100 text-orange-700",
        High: "bg-red-100 text-red-700",
    };

    return (
        <div className="bg-white rounded-xl shadow-md border p-6">

            <div className="flex justify-between items-start">

                <div>
                    <h2 className="text-xl font-bold">
                        {task.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                        {task.description}
                    </p>
                </div>

            </div>

            <div className="flex gap-3 mt-5">

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[task.status]
                        }`}
                >
                    {task.status}
                </span>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColor[task.priority]
                        }`}
                >
                    {task.priority}
                </span>

            </div>

            {task.dueDate && (
                <p className="mt-4 text-sm text-gray-500">
                    Due :
                    {" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                </p>
            )}

            <div className="flex gap-3 mt-6">

                <Link
                    to={`/tasks/${task._id}/edit`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Edit
                </Link>

                <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                    Delete
                </button>

            </div>

        </div>
    );
};

export default TaskCard;