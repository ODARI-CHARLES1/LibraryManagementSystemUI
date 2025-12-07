import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiDomain } from "../../Utils/APIDomain";
import type {
  borrowrecords,
  newBorrowRecord,
  updateBorrow,
  clearBorrow
} from "../../Types/borrowrecords.Interface";

export const borrowRecordsAPI = createApi({
  reducerPath: "BorrowRecordsAPI",
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
  tagTypes: ["BorrowRecords"],
  endpoints: (builder) => ({
    getBorrowRecords: builder.query<borrowrecords[], void>({
      query: () => "api/borrow-records",
      providesTags: ["BorrowRecords"],
    }),

    getBorrowRecordById: builder.query<borrowrecords, number>({
      query: (borrow_id) => `api/borrow-records/${borrow_id}`,
      providesTags: ["BorrowRecords"],
    }),

    createBorrowRecord: builder.mutation<borrowrecords, newBorrowRecord>({
      query: (newRecord) => ({
        url: "api/borrow-records/create",
        method: "POST",
        body: newRecord,
      }),
      invalidatesTags: ["BorrowRecords"],
    }),

    updateBorrowRecord: builder.mutation<borrowrecords, updateBorrow>({
      query: (updateData) => ({
        url: `api/borrow-records/update/${updateData.borrow_id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["BorrowRecords"],
    }),

    clearBorrowRecord: builder.mutation<borrowrecords, clearBorrow>({
      query: (clearData) => ({
        url: `api/borrow-records/clear/${clearData.borrow_id}`,
        method: "PATCH",
        body: clearData,
      }),
      invalidatesTags: ["BorrowRecords"],
    }),

    deleteBorrowRecord: builder.mutation<{ message: string }, number>({
      query: (borrow_id) => ({
        url: `api/borrow-records/delete/${borrow_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BorrowRecords"],
    }),
  }),
});

export const {
  useGetBorrowRecordsQuery,
  useGetBorrowRecordByIdQuery,
  useCreateBorrowRecordMutation,
  useUpdateBorrowRecordMutation,
  useClearBorrowRecordMutation,
  useDeleteBorrowRecordMutation,
} = borrowRecordsAPI;