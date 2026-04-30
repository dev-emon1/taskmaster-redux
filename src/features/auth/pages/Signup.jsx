import loginImage from "../../../assets/image/login.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../user/userSlice";
import toast from "react-hot-toast";

const Signup = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.user);

  const onSubmit = async ({ name, email, password }) => {
    const res = await dispatch(createUser({ name, email, password }));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Account created successfully");
      navigate("/");
    } else {
      toast.error(res.payload || "Signup failed");
    }
  };

  const handleGoogleLogin = () => {
    toast("Google signup coming soon 🚀");
  };

  return (
    <div className="flex max-w-7xl mx-auto h-screen items-center">
      {/* Left Image */}
      <div className="w-1/2">
        <img src={loginImage} className="h-full w-full" alt="signup" />
      </div>

      {/* Right Form */}
      <div className="w-1/2 grid place-items-center">
        <div className="bg-primary/5 w-full max-w-sm rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Sign up</h1>

          <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="flex flex-col items-start">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col items-start">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col items-start">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col items-start">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                className="w-full rounded-md"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="!mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </button>
            </div>

            {/* Redirect */}
            <div>
              <p>
                Already have an account?{" "}
                <span
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>
            </div>

            {/* Google Signup */}
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={handleGoogleLogin}
            >
              Sign up with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
