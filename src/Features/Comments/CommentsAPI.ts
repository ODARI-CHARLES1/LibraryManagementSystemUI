import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../Utils/APIDomain";
import type { Comment } from "../../Types/comments.Interface";

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
        }),
        getCommentsByBook:builder.query<Comment[],number>({
            query:(book_id)=>({
                url:`api/comments/book/${book_id}`,
                method:"GET"
            }),
            providesTags:["Comments"]
        }),
        getCommentsByUser:builder.query<Comment[],number>({
            query:(user_id)=>({
                url:`api/comments/user/${user_id}`,
                method:"GET"
            }),
            providesTags:["Comments"]
        }),
        addComment:builder.mutation<Comment,Omit<Comment,"comment_id"|"created_at">>({
            query:(newComment)=>({
                url:"api/comments",
                method:"POST",
                body:newComment
            }),
            invalidatesTags:["Comments"]
        }),
        updateComment:builder.mutation<Comment,Partial<Comment>&{comment_id:number}>({
            query:(updatedComment)=>({
                url:`api/comments/${updatedComment.comment_id}`,
                method:"PUT",
                body:updatedComment
            }),
            invalidatesTags:["Comments"]
        }),
        deleteComment:builder.mutation<{success:boolean,id:number},{comment_id:number}>({
            query:(commentId)=>({
                url:`api/comments/${commentId}`,
                method:"DELETE"
            }),
            invalidatesTags:["Comments"]
        })
    })
})

// Commenting out hook exports due to TypeScript resolution issues
// export const {
//     useGetCommentsQuery,
//     useGetCommentsByBookQuery,
//     useGetCommentsByUserQuery,
//     useAddCommentMutation,
//     useUpdateCommentMutation,
//     useDeleteCommentMutation
// } = commentsApi;