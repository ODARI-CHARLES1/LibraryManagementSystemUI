import { ApiDomain } from "../../Utils/APIDomain";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

export const userApi = createApi({
    reducerPath: "UserApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        createUser: builder.mutation<User, Partial<User>>({
            query: (newUser) => ({
                url: "api/users/create",
                method: "POST",
                body: newUser
            }),
            invalidatesTags:["Users"]
        })
    })
})

