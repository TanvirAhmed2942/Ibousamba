// import { api } from "../api/baseApi";

// const subCategorySlice = api.injectEndpoints({
//   endpoints: (builder) => ({
//     createSubCategory: builder.mutation({
//       query: (categoryData) => {
//         return {
//           url: "/sub-category",
//           method: "POST",
//           body: categoryData,
//           //   headers: {
//           //     Authorization: `Bearer ${JSON.parse(
//           //       localStorage.getItem("token")
//           //     )}`,
//           //   },
//         };
//       },
//     }),
//     updateSubCategory: builder.mutation({
//       query: ({ id, updatedData }) => {
//         return {
//           url: `/subCategory/${id}`,
//           method: "PATCH",
//           body: updatedData,
//           headers: {
//             Authorization: `Bearer ${JSON.parse(
//               localStorage.getItem("token")
//             )}`,
//           },
//         };
//       },
//     }),
//     deleteSubCategory: builder.mutation({
//       query: (id) => {
//         return {
//           url: `/subCategory/${id}`,
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${JSON.parse(
//               localStorage.getItem("token")
//             )}`,
//           },
//         };
//       },
//     }),
//     getSubCategories: builder.query({
//       query: (categoryID) => {
//         return {
//           url: "/subCategory",
//           method: "GET",
//           body: categoryID,
//           headers: {
//             Authorization: `Bearer ${JSON.parse(
//               localStorage.getItem("token")
//             )}`,
//           },
//         };
//       },
//     }),
//   }),
// });

// export const {
//   useGetSubCategoriesQuery,
//   useCreateSubCategoryMutation,
//   useUpdateSubCategoryMutation,
//   useDeleteSubCategoryMutation,
// } = subCategorySlice;

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
