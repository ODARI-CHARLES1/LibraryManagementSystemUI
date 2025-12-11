import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import appContext from '../../Contexts/AppContext';
import { userApi } from "../../Features/Auth/userApi";
import type { User } from "../../Types/users.types";
import { toast, ToastContainer } from 'react-toastify';
import ScaleLoader from "react-spinners/ScaleLoader";

const adminSchema = yup.object({
  username: yup.string().required("Admin username is required"),
  email: yup.string().email().required("Admin email is required"),
  password: yup.string().min(6).required("Password is required"),
  role: yup.string().oneOf(["Admin"], "Role must be Admin").required(),
});

type AdminFormInputs = yup.InferType<typeof adminSchema>;

const Admins = ({ embedded = false }: { embedded?: boolean }) => {
  const { theme } = useContext(appContext);
  const { handleSubmit, register, reset, formState: { errors } } = useForm<AdminFormInputs>({
    resolver: yupResolver(adminSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "Admin",
    },
  });

  const { data: usersData, isLoading: isUsersLoading } = userApi.useGetUserQuery();
  const [createUser] = userApi.useCreateUserMutation();
  const [updateUser] = userApi.useUpdateUserMutation();
  const [deleteUser] = userApi.useDeleteUserMutation();

  const [admins, setAdmins] = useState<User[]>([]);
  const [editAdmin, setEditAdmin] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (usersData) {
      // Filter only admin users - handle both array and object with data property
      const userArray = Array.isArray(usersData) ? usersData : (usersData as { data: User[] })?.data || [];
      const adminUsers = userArray.filter((user: User) => user.role === "Admin");
      setAdmins(adminUsers);
    }
  }, [usersData]);

  const onSubmit = async (data: AdminFormInputs) => {
    try {
      if (editAdmin) {
        // Update existing admin
        await updateUser({
          user_id: editAdmin.user_id,
          ...data
        }).unwrap();
        toast.success("Admin updated successfully");
        setEditAdmin(null);
      } else {
        // Create new admin
        await createUser({
          ...data,
          role: "Admin"
        }).unwrap();
        toast.success("Admin created successfully");
      }
      reset();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Error occurred while saving admin");
    }
  };

  const handleEdit = (admin: User) => {
    setEditAdmin(admin);
    reset({
      username: admin.username,
      email: admin.email,
      password: "", // Don't show existing password for security
      role: "Admin",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this admin?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("Admin deleted successfully");
        // Update local state
        setAdmins(admins.filter(admin => admin.user_id !== id));
      } catch (err) {
        console.error(err);
        toast.error("Error occurred while deleting admin");
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-1">
      <ToastContainer />
      {!embedded && <Navbar />}
      <div className="w-full flex gap-5">
        {!embedded && <Sidebar />}
        <div className="w-full flex flex-col lg:flex-nowrap flex-wrap gap-5 p-8 overflow-x-hidden overflow-y-auto items-start">
          <div className="w-full flex justify-between items-center">
            <h1 className={`text-3xl font-semibold ${theme === "light" ? "text-[#313131]" : "text-gray-100"}`}>Admin Management</h1>
            <button
              onClick={() => { setShowForm(true); setEditAdmin(null); reset(); }}
              className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500"
            >
              Add Admin
            </button>
          </div>

          {showForm && (
            <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
              <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
                {editAdmin ? "Update Admin" : "Add New Admin"}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Username
                    </label>
                    {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
                    <input
                      type="text"
                      {...register("username")}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Email
                    </label>
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Password
                    </label>
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    <input
                      type="password"
                      {...register("password")}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Role
                    </label>
                    <select
                      {...register("role")}
                      disabled
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    >
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button type="submit" className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500">
                    {editAdmin ? "Update Admin" : "Add Admin"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditAdmin(null); reset(); }}
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
              <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Admins List</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className={theme === "light" ? "bg-gray-50" : "bg-gray-700"}>
                    <th className="px-4 py-2 text-left">Username</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Join Date</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isUsersLoading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        <ScaleLoader color="#4ea872" />
                      </td>
                    </tr>
                  ) : admins.length > 0 ? (
                    admins.map((admin) => (
                      <tr key={admin.user_id} className={theme === "light" ? "border-t" : "border-t border-gray-700"}>
                        <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                          {admin.username}
                        </td>
                        <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                          {admin.email}
                        </td>
                        <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {admin.role}
                          </span>
                        </td>
                        <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                          {admin.created_at ? new Date(admin.created_at).toLocaleDateString() : "—"}
                        </td>
                        <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                          <button
                            onClick={() => handleEdit(admin)}
                            className="text-blue-600 hover:text-blue-800 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(admin.user_id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        No admin users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admins;