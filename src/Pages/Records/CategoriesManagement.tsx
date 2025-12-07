import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import appContext from '../../Contexts/AppContext';
import { categoriesApi } from "../../Features/Records/CategoriesApi";
import { toast, ToastContainer } from 'react-toastify';
import ScaleLoader from "react-spinners/ScaleLoader";

const categorySchema = yup.object({
  name: yup.string().required("Category name is required"),
  description: yup.string().notRequired(),
});

const CategoriesManagement = ({ embedded = false }: { embedded?: boolean }) => {
  const { theme } = useContext(appContext);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const { data: categories, isLoading, error } = categoriesApi.useGetCategoriesQuery();
  const [createCategory] = categoriesApi.useCreateCategoryMutation();
  const [updateCategory] = categoriesApi.useUpdateCategoryMutation();
  const [deleteCategory] = categoriesApi.useDeleteCategoryMutation();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleEdit = (category: any) => {
    reset({
      name: category.name,
      description: category.description || "",
    });
    setEditingCategory(category);
    setShowForm(true);
  };

  const onSubmit = async (data: any) => {
    try {
      if (editingCategory) {
        await updateCategory({
          id: editingCategory.category_id,
          data: {
            name: data.name,
            description: data.description,
          }
        }).unwrap();

        toast.success("Category updated successfully");
      } else {
        await createCategory({
          name: data.name,
          description: data.description,
        }).unwrap();
        toast.success("Category created successfully");
      }
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Error occurred while saving category");
    }
  };

  const resetForm = () => {
    reset();
    setEditingCategory(null);
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category deleted successfully");
      } catch (err) {
        console.error(err);
        toast.error("Error occurred while deleting category");
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {!embedded && <ToastContainer />}

      <div className="w-full flex justify-between items-center">
        <h2 className={`text-2xl font-semibold ${theme === "light" ? "text-[#313131]" : "text-gray-100"}`}>Categories Management</h2>
        <button
          onClick={() => { reset(); setEditingCategory(null); setShowForm(true); }}
          className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500"
        >
          Add Category
        </button>
      </div>

      {showForm && (
        <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
          <h3 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                  Name
                </label>
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    />
                  )}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                  Description
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500">
                {editingCategory ? "Update" : "Add"} Category
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
        <div className="w-full flex items-center justify-between">
          <h3 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Categories List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className={theme === "light" ? "bg-gray-50" : "bg-gray-700"}>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    <ScaleLoader color="#4ea872" />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-red-500">
                    Error loading categories
                  </td>
                </tr>
              ) : categories && categories.length > 0 ? (
                categories.map((category: any) => (
                  <tr key={category.category_id} className={theme === "light" ? "border-t" : "border-t border-gray-700"}>
                    <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                      {category.name}
                    </td>
                    <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                      {category.description || "—"}
                    </td>
                    <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.category_id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesManagement;