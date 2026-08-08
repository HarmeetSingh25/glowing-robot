import { createBrowserRouter } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Home from "../Home";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import PublicRoute from "../features/auth/components/PublicRoute";
import CreateTask from "../features/task/pages/CreateTask";
import EditTask from "../features/task/pages/EditTask";
import NotFound from "../features/task/pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: (<ProtectedRoute>
            <Home />
        </ProtectedRoute>),
    },
    {
        path: "/login",
        element: <PublicRoute>
            <Login />
        </PublicRoute>,
    },
    {
        path: "/register",
        element: <PublicRoute>
            <Register />
        </PublicRoute>,

    },
    {
        path: "/tasks/new",
        element: (
            <ProtectedRoute>
                <CreateTask />
            </ProtectedRoute>
        ),
    },
    {
    path: "/tasks/:id/edit",
    element: (
        <ProtectedRoute>
            <EditTask />
        </ProtectedRoute>
    ),
},
{
    path: "*",
    element: <NotFound />,
}

]);

export default router;