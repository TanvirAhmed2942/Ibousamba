import { api } from "../api/baseApi";

const brancdSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (categoryData) => ({
        url: "/brand",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/brand/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    deleteBrand: builder.mutation({
      query: (id) => {
        return {
          url: `/brand/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Category"],
    }),
    brand: builder.query({
      query: () => ({
        url: "/brand",
        method: "GET",
        // };
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brancdSlice;
