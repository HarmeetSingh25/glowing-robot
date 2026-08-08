import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">

            <h1 className="text-7xl font-bold">
                404
            </h1>

            <p className="text-gray-500 mt-4">
                Page Not Found
            </p>

            <Link
                to="/"
                className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                Go Home
            </Link>

        </div>
    );
};

export default NotFound;