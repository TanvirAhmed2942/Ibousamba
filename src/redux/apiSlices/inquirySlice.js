import { api } from "../api/baseApi";

const inquirySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createInquiry: builder.mutation({
      query: (categoryData) => ({
        url: "/inquiry",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),
    updateInquiry: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/inquiry/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    deleteInquiry: builder.mutation({
      query: (id) => {
        return {
          url: `/inquiry/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Category"],
    }),
    inquiry: builder.query({
      query: () => ({
        url: `/inquiry`,
        method: "GET",
        // };
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useInquiryQuery,
  useCreateInquiryMutation,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
} = inquirySlice;
