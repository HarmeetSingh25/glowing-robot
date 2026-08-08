import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../store/authSlice";
import { useEffect } from "react";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error , isAuthenticated,  } = useSelector((state) => state.auth);
    useEffect(() => {
    if (!loading && isAuthenticated) {
        navigate("/", { replace: true });
    }
}, [isAuthenticated, loading, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const result = await dispatch(loginUser(data));
        // console.log(result, "restlt");

        if (loginUser.fulfilled.match(result)) {
            //  console.log("Login Success");
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Login to your account
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 mt-8"
                >
                    {/* Email */}

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {error && (
                        <p className="text-red-500 text-center">
                            {error}
                        </p>
                    )}

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Signing In..." : "Login"}
                    </button>

                    <p className="text-center">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 font-medium"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;