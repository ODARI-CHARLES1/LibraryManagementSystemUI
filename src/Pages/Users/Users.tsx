import { useState, useEffect, useContext } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import { LuListFilter } from "react-icons/lu";
import { userApi } from "../../Features/Auth/userApi";
import appContext from "../../Contexts/AppContext";
import type { User } from "../../Types/users.types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const userSchema = yup
  .object({
    username: yup.string().required("Provide username"),
    email: yup.string().email().required("Provide user email"),
    password: yup.string().required("Provide user password"),
    role: yup
      .mixed<"Member" | "Admin">()
      .oneOf(["Member", "Admin"], "Role must be Member or Admin")
      .required("Provide User role"),
  })
  .required();

type FormInputs = yup.InferType<typeof userSchema>;

const Users = ({ embedded = false }: { embedded?: boolean }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      role: "Member",
      password: "12345",
    },
  });

  const { theme } = useContext(appContext);

  const [getUser] = userApi.useGetUserMutation();
  const [createUser] = userApi.useCreateUserMutation();
  const [UpdateUser]=userApi.useUpdateUserMutation()

  const [users, setUsers] = useState<User[]>([]);
  const [updateUser,setUpdateUser]=useState<User[]>([])
  const [showForm, setShowForm] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if(updateUser.length){
         try {
      await createUser(data).unwrap();
      toast.success("User Created Successfully.");
      reset();
      setShowForm(false);
    } catch (error) {
      toast.error("Error occurred creating user.");
      console.log(error)
    }
    }
   

    try {
       const updateUserInf={
     username:updateUser[0].username,
      email:updateUser[0].email,
      role:updateUser[0].role,
      password:updateUser[0].password
    }
    console.log(updateUserInf)
    const res=await UpdateUser(updateUserInf).unwrap()
    console.log(res)

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getUser().unwrap();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [getUser]);

  const handleDelete = (id: number) => {
    const updatedUsers = users.filter((user) => user.user_id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="w-full  h-full gap-1 flex flex-col items-center">
      {!embedded && <Navbar />}

      <div className="w-full flex gap-5">
        {!embedded && <Sidebar />}

        <div className="w-full flex overflow-y-auto overflow-x-hidden items-start flex-col lg:flex-nowrap flex-wrap gap-5 p-8">
          <div className="w-full flex justify-between items-center">
            <h1 className={`text-3xl font-semibold ${theme === "light" ? "text-[#313131]" : "text-gray-100"}`}>
              Users Management
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500"
            >
              Add User
            </button>
          </div>

          {showForm && (
            <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
              <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
                Add New User
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Name</label>
                    {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
                    <input
                      type="text"
                      {...register("username")}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Email</label>
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Role</label>
                    <select
                      {...register("role")}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    >
                      <option value="Member">Member</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Password</label>
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    <input
                      type="password"
                      {...register("password")}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button type="submit" className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500">
                    Add User
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
            <div className="w-full flex items-center justify-between">
              <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Users List</h2>
              <LuListFilter className={theme === "light" ? "text-gray-700" : "text-gray-300"} />
            </div>

            <div className="overflow-y-auto w-full">
              <div className="min-w-[900px] overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className={theme === "light" ? "bg-gray-50" : "bg-gray-700"}>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Join Date</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Update Date</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr key={user.user_id} className="border-t">
                        <td className={`px-4 py-2 ${theme=="light"?"text-gray-700":"text-gray-300"}`}>{user.username}</td>
                        <td className={`px-4 py-2 ${theme=="light"?"text-gray-700":"text-gray-300"}`}>{user.email}</td>
                        <td className={`px-4 py-2 ${theme=="light"?"text-gray-700":"text-gray-300"}`}>{user.created_at}</td>
                        <td className={`px-4 py-2 ${theme=="light"?"text-gray-700":"text-gray-300"}`}>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className={`px-4 py-2 ${theme=="light"?"text-gray-700":"text-gray-300"}`}>{user.updated_at}</td>
                        <td className={`px-4 py-2 ${theme=="light"?"text-gray-700":"text-gray-300"}`}>
                          <button 
                          onClick={()=>{setUpdateUser([user]);setShowForm(true)}}
                          className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                          <button
                            onClick={() => handleDelete(user.user_id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;