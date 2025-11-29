import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiDomain } from "../../Utils/APIDomain";

export interface Book {
  book_id: number;
  title: string;
  author: string;
  category_id: number | null;
  publication_year: number | null;
  stock_quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface BookInput {
  title: string;
  author: string;
  category_id?: number | null;
  publication_year?: number | null;
  stock_quantity: number;
}

export const bookAPI = createApi({
  reducerPath: "BookApi",
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
  tagTypes: ["Books"],

  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => ({
        url: "/api/books",
        method: "GET",
      }),
      providesTags: ["Books"],
    }),

    getBookById: builder.query<Book, number>({
      query: (id) => ({
        url: `/api/books/${id}`,
        method: "GET",
      }),
      providesTags: ["Books"],
    }),

    createBook: builder.mutation<Book, BookInput>({
      query: (newBook) => ({
        url: "/api/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    updateBook: builder.mutation<Book, { id: number; data: BookInput }>({
      query: ({ id, data }) => ({
        url: `/api/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    deleteBook: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/api/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookAPI;
