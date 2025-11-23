import { useState, useEffect, useContext } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { LuListFilter } from "react-icons/lu";
import { userApi } from "../../Features/Auth/userApi";
import appContext from '../../Contexts/AppContext';
import  * as yup from 'yup'
interface User {
  id: number;
  username: string;
  email: string;
  role: 'Admin' | 'Member';
  status: 'active' | 'inactive';
  joinDate: string;
  password:string;
}

const userSchema=yup.object({ 
    password:yup.string().required("Password Required"),
    email:yup.string().required("Email Required"),
})

const Users = ({ embedded = false }: { embedded?: boolean }) => {

  const { theme } = useContext(appContext);
  const [createUser] = userApi.useCreateUserMutation();
 const [getUser]=userApi.useGetUserMutation()
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Omit<User, 'id' | 'joinDate'>>({
    username: '',
    email: '',
    role: 'Member',
    status: 'active',
    password:"12345"
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      const updatedUsers = users.map(user =>
        user.id === editingUser.id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
      localStorage.setItem('libraryUsers', JSON.stringify(updatedUsers));
    } else {
      const newUser: User = {
        id: Date.now(),
        ...formData,
        joinDate: new Date().toISOString().split('T')[0]
      };

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('libraryUsers', JSON.stringify(updatedUsers));
    }

    // Make API call
    try {
      console.log(formData)
      const response = await createUser(formData).unwrap();
    console.log(response);
    } catch (error) {
      console.log(error)
    }

    resetForm();
  };

  useEffect(()=>{
   const getUsers=async()=>{
     try {
      const response=await getUser().unwrap()
     setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
   }
   getUsers()

  },[])

  const resetForm = () => {
    setFormData({ username: '', email: '', role: 'Member', status: 'active',password:'' });
    setEditingUser(null);
    setShowForm(false);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
      password:user.username
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className='w-full overflow-hidden h-full gap-1 flex flex-col items-center'>
      {!embedded && <Navbar />}

      <div className='w-full flex gap-5'>
        {!embedded && <Sidebar />}

        <div className="w-full flex overflow-y-auto overflow-x-hidden items-start flex-col lg:flex-nowrap flex-wrap gap-5 p-8">

          <div className="w-full flex justify-between items-center">
            <h1 className={`text-3xl font-semibold ${theme === "light" ? "text-[#313131]" : "text-gray-100"}`}>Users Management</h1>
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
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Name</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as 'Admin' | 'Member' })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    >
                      <option value="Member">Member</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                </div>

                <div className="flex gap-2">
                  <button type="submit" className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500">
                    {editingUser ? 'Update' : 'Add'} User
                  </button>

                  <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          )}

          <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
            <div className='w-full flex items-center justify-between'>
              <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Users List</h2>
              <LuListFilter className={theme === "light" ? "text-gray-700" : "text-gray-300"} />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className={theme === "light" ? "bg-gray-50" : "bg-gray-700"}>
                    <th className={`px-4 py-2 text-left ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Name</th>
                    <th className={`px-4 py-2 text-left ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Email</th>
                    <th className={`px-4 py-2 text-left ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Join Date</th>
                    <th className={`px-4 py-2 text-left ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Status</th>
                    <th className={`px-4 py-2 text-left ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Update Date</th>
                    <th className={`px-4 py-2 text-left ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className={theme === "light" ? "border-t" : "border-t border-gray-700"}>
                      <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>{user.username}</td>
                      <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>{user.email}</td>
                      <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>{user.created_at}</td>

                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}>
                          {"active"}
                        </span>
                      </td>

                      <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>{user.updated_at}</td>

                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(user.id)}
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
  );
};

export default Users;
