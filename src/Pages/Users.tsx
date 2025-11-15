import { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { LuListFilter } from "react-icons/lu";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const Users = ({ embedded = false }: { embedded?: boolean }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Member',
    status: 'active' as 'active' | 'inactive'
  });

  useEffect(() => {
    // Load users from localStorage or initialize with sample data
    const storedUsers = localStorage.getItem('libraryUsers');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      const sampleUsers: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Member', status: 'active', joinDate: '2023-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Member', status: 'active', joinDate: '2023-02-20' },
        { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-01' },
      ];
      setUsers(sampleUsers);
      localStorage.setItem('libraryUsers', JSON.stringify(sampleUsers));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
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
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', role: 'Member', status: 'active' });
    setEditingUser(null);
    setShowForm(false);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('libraryUsers', JSON.stringify(updatedUsers));
  };

  return (
    <div className='w-full overflow-hidden h-full gap-1 flex flex-col items-center'>
      {!embedded && <Navbar />}
      <div className='w-full flex gap-5'>
        {!embedded && <Sidebar />}
        <div className="w-full flex overflow-y-auto overflow-x-hidden items-start flex-col lg:flex-nowrap flex-wrap gap-5 p-8">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-[#313131]">Users Management</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500"
            >
              Add User
            </button>
          </div>

          {showForm && (
            <div className="w-full bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{editingUser ? 'Edit User' : 'Add New User'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      <option value="Member">Member</option>
                      <option value="Admin">Admin</option>
                      <option value="Librarian">Librarian</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
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

          <div className="w-full bg-white p-6 rounded-lg shadow-md">
           <div className='w-full flex items-cente justify-between'>
             <h2 className="text-xl font-semibold mb-4">Users List</h2>
             <LuListFilter/>
           </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Join Date</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">{user.joinDate}</td>
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