import { api } from "../api/baseApi";

const subCategorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createSubCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/sub-category",
        method: "POST",
        body: categoryData,
      }),
    }),
    updateSubCategory: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/sub-category/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/sub-category/${id}`,
        method: "DELETE",
      }),
    }),
    getSubCategories: builder.query({
      query: (categoryID) => ({
        url: `/sub-category/${categoryID}`, // ✅ Sending categoryID as a URL parameter
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategorySlice;
