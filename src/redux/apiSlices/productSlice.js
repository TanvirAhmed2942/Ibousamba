import { api } from "../api/baseApi";

const productSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/product",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/product/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),
    product: builder.query({
      query: () => ({
        url: `/product`,
        method: "GET",
        // };
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productSlice;
