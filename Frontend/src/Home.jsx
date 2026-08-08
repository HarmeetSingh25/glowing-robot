import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./features/task/components/SearchBar";
import { useState } from "react";
import { getTasks } from "./features/task/store/task.slice";
import TaskCard from "./features/task/components/taskcard";
import { logoutUser } from "./features/auth/store/authSlice";
import Loader from "./features/task/components/Loader";
import StatsCard from "./shared/components/StatsCard";

const Home = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const dispatch = useDispatch();

    const { tasks, loading, error } = useSelector((state) => state.task);

    const { user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        const result = await dispatch(logoutUser());

        if (logoutUser.fulfilled.match(result)) {
            navigate("/login");
        }
    };

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    if (loading) return <h1><Loader /></h1>;

    if (error) return <h1>{error}</h1>;


    const total = tasks.length;

    const pending = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    const inProgress = tasks.filter(
        (task) => task.status === "In Progress"
    ).length;

    const completed = tasks.filter(
        (task) => task.status === "Completed"
    ).length;


    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            filter === "All"
                ? true
                : task.status === filter;

        return matchesSearch && matchesStatus;
    });
    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-6xl mx-auto p-8">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Task Manager
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Welcome, {user?.name}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/tasks/new"
                            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                        >
                            + New Task
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>


                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                    <StatsCard
                        title="Total Tasks"
                        value={total}
                        color="text-blue-600"
                    />

                    <StatsCard
                        title="Pending"
                        value={pending}
                        color="text-yellow-500"
                    />

                    <StatsCard
                        title="In Progress"
                        value={inProgress}
                        color="text-indigo-600"
                    />

                    <StatsCard
                        title="Completed"
                        value={completed}
                        color="text-green-600"
                    />

                </div>
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                />

                {tasks.length === 0 ? (
                    <div className="text-center py-20">

                        <h2 className="text-3xl font-bold">
                            No Tasks Yet
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Create your first task to get started.
                        </p>

                        <Link
                            to="/tasks/new"
                            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg"
                        >
                            Create Task
                        </Link>

                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredTasks.length === 0 ? (
                            <div className="text-center py-20">
                                <h2 className="text-2xl font-bold">
                                    No matching tasks found
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    Try changing your search or filter.
                                </p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                {filteredTasks.map((task) => (
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>

        </div>
    );
};

export default Home;