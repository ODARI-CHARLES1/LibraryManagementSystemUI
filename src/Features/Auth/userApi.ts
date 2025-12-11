import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiDomain } from "../../Utils/APIDomain";

export interface User {
  user_id: number,
  username: string,
  email: string,
  password: string,
  password_hash?: string,
  role: 'Admin' | 'Member',
  created_at?: Date,
  updated_at?: Date
}

export interface newUser {
  username: string,
  email: string,
  password: string,
  role: 'Admin' | 'Member',
  created_at?: Date,
  password_hash?: string
}

export interface updateUser {
  username?: string,
  password?: string,
  role?: 'Admin' | 'Member',
  updated_at?: Date
}


export interface existingUser {
  email: string,
  password: string,
  password_hash?: string
}

export interface CreateUserResponse {
  success: boolean,
  message?: string,
  user?: {
    user_id: number,
    username: string,
    email: string,
    role: 'Admin' | 'Member',
    created_at: Date,
    updated_at?: Date
  }
}

export interface LoginResponse {
  success: boolean,
  data?: {
    token: string,
    role: string,
    username: string,
    email: string,
    id: number,
    created_at: string,
    updated_at: string
  }
}

export interface loginJwtConfig {
  payload: {
    id: number
    username: string,
    role: string
    created: Date
    updated: Date
  },
  expires: string,
  secret: string

}

export const userApi = createApi({
  reducerPath: "UserApi",
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
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    createUser: builder.mutation<CreateUserResponse, Partial<User>>({
      query: (newUser) => ({
        url: "api/users/create",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),

    loginUser: builder.mutation<LoginResponse, Partial<User>>({
      query: (loginUser) => ({
        url: "api/users/login",
        method: "POST",
        body: loginUser,
      }),
    }),

    getUser: builder.query<{ data: User[] }, void>({
      query: () => "api/users",
      providesTags: ["Users"],
    }),
    UpdateUser: builder.mutation<User, Partial<User>>({
      query: ({ user_id, ...rest }) => ({
        url: `api/users/${user_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser:builder.mutation<{ message: string }, number>({
      query:(id)=>({
        url: `api/users/delete/${id}`,
        method:'DELETE',
      })
    })

  }),
});
