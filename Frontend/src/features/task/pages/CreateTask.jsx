import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createTask } from "../store/task.slice";
import TaskForm from "../components/TaskForm";
import toast from "react-hot-toast";

const CreateTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector(
        (state) => state.task
    );

    const handleCreate = async (data) => {
        const result = await dispatch(createTask(data));

        if (createTask.fulfilled.match(result)) {
             navigate("/");
            toast.success("Task Created");
        }else{
            toast.error(result.payload);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center py-10">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Create Task
                </h1>

                <TaskForm
                    buttonText="Create Task"
                    loading={loading}
                    onSubmit={handleCreate}
                />

            </div>
        </div>
    );
};

export default CreateTask;