import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { registerUser } from "../store/authSlice";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        dispatch(registerUser(data));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Register to continue
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-5"
                >
                    {/* Name */}

                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

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
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* API Error */}

                    {error && (
                        <p className="text-red-500 text-center">
                            {error}
                        </p>
                    )}

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Creating..." : "Register"}
                    </button>

                    <p className="text-center">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 font-medium"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;