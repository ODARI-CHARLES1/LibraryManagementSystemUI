import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query";
import { ApiDomain } from "../../Utils/APIDomain";


export const commentsApi=createApi({
    reducerPath:"Comments",
    baseQuery:fetchBaseQuery({
        baseUrl:ApiDomain,
        prepareHeaders:(headers)=>{
            const token=localStorage.getItem("token")
            if(token){
                headers.set("Authorization",`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes:["Comments"],
    endpoints:(builder)=>({
        getComments:builder.query<Comment[],void>({
            query:()=>({
                url:"api/comments",
                method:"GET"
            }),
            providesTags:["Comments"]
        })
    })
})