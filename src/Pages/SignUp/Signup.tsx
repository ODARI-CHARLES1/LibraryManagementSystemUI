import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type {SubmitHandler} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import appContext from "../../Contexts/AppContext";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { userApi } from "../../Features/Auth/userApi";

interface RegisterUser {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(appContext);
  const [createUser, { isLoading }] = userApi.useCreateUserMutation();

  const registerSchema = yup.object({
    username: yup.string().required("Full Name is required"),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter a valid email"
      )
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters")
      .required("Enter password"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterUser>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterUser> = async (data) => {
    try {
      const res = await createUser(data).unwrap();

      if (res.success) {
        setIsAuthenticated(true);
        toast.success("Signup successful. Please login.");
        navigate("/login");
      } else {
        toast.warn(res.message || "Account already exists. Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.warn("User Exists. Login");
      navigate("/login")
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <HiMiniBuildingLibrary className="text-4xl text-green-400 mx-auto mb-4" />
          <h1 className="text-3xl font-semibold text-[#313131]">Library System</h1>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Names</label>
            <input
              type="text"
              {...register("username")}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              {...register("confirm")}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center bg-green-400 text-white py-2 rounded-md hover:bg-green-500 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? <ScaleLoader color="#ffffff" height={20} width={4} radius={2} margin={2} /> : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-green-500 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
