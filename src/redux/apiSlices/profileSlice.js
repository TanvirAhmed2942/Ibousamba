import { api } from "../api/baseApi";

const profileSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/users/update-my-profile`,
          method: "PATCH",
          body: data,
        };
      },
    }),

    profile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useProfileQuery, useUpdateProfileMutation } = profileSlice;
