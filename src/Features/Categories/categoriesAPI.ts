import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query";
import { ApiDomain } from "../../Utils/APIDomain";
import type { Category } from "../../Types/categories.Interface";


export const categoriesAPI=createApi({
    reducerPath:"CategoriesAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:ApiDomain,
        prepareHeaders:(headeres)=>{
            const token=localStorage.getItem("token");
            if(token){
                headeres.set("Authorization",`Bearer ${token}`)
            }
            return headeres
        }
    }),
    tagTypes:["Categories"],
    endpoints:(builder)=>({
        getCategories:builder.query<Category[],void>({
            query:()=>({
                url:"api/categories",
                method:"GET"
            }),
            providesTags:["Categories"]
        })
    })
})