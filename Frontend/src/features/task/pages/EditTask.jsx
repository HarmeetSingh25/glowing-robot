import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import TaskForm from "../components/TaskForm";
import { getTask, updateTask } from "../store/task.slice";
import toast from "react-hot-toast";

const EditTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { task, loading } = useSelector((state) => state.task);

    useEffect(() => {
        dispatch(getTask(id));
    }, [dispatch, id]);

    const handleUpdate = async (data) => {
        const result = await dispatch(
            updateTask({
                id,
                data,
            })
        );

        if (updateTask.fulfilled.match(result)) {
            navigate("/");
            toast.success("Task Updated");
        }
        else{
                    toast.error(result.payload);
        }
    };

    if (loading && !task) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center py-10">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Edit Task
                </h1>

                <TaskForm
                    defaultValues={{
                        title: task?.title || "",
                        description: task?.description || "",
                        status: task?.status || "Pending",
                        priority: task?.priority || "Low",
                        dueDate: task?.dueDate
                            ? task.dueDate.split("T")[0]
                            : "",
                    }}
                    buttonText="Update Task"
                    loading={loading}
                    onSubmit={handleUpdate}
                />

            </div>
        </div>
    );
};

export default EditTask;