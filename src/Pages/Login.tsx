import { useNavigate } from 'react-router-dom';
import { HiMiniBuildingLibrary } from 'react-icons/hi2';
import * as yup from 'yup';
import { useForm,  } from 'react-hook-form';
import type{SubmitHandler} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import appContext from '../Contexts/AppContext';
import { useContext } from 'react';
interface LoginUser {
  password: string;
  email: string;
}

const Login = () => {
  const {setIsAuthenticated}=useContext(appContext)
  const LoginSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Enter a valid email'
      )
      .required('Email is required'),
    password: yup
      .string()
      .min(4, 'Password must be at least 4 characters')
      .required('Enter password'),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      password: '',
      email: '',
    },
  });

  const onSubmit: SubmitHandler<LoginUser> = (data) => {
    console.log('Form submitted', data);
    setIsAuthenticated(true);
    navigate("/dashboard")

    // i will do API operation here...
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <HiMiniBuildingLibrary className="text-4xl text-green-400 mx-auto mb-4" />
          <h1 className="text-3xl font-semibold text-[#313131]">Library System</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 px-4 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-green-400 hover:text-green-500 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
