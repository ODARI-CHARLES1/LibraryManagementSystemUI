import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiDomain } from "../../Utils/APIDomain";
import type { Category, CategoryInput, CategoryUpdateInput } from "../../Types/categories.Interface";

export const categoriesApi = createApi({
  reducerPath: "CategoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "api/categories",
      providesTags: ["Categories"],
    }),

    getCategoryById: builder.query<Category, number>({
      query: (id) => `api/categories/${id}`,
      providesTags: ["Categories"],
    }),

    createCategory: builder.mutation<Category, CategoryInput>({
      query: (newCategory) => ({
        url: "api/categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation<Category, { id: number; data: CategoryUpdateInput }>({
      query: ({ id, data }) => ({
        url: `api/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `api/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;