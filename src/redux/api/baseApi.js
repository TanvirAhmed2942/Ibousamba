// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://10.0.70.36:8011/api/v1",
//     // baseUrl: "http://192.168.10.195:5000/api"
//   }),
//   endpoints: () => ({}),
// });

// export const imageUrl = "http://206.189.231.81:5000";
// export const imageUrl = "http://206.189.231.81:5000";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.0.70.36:8011/api/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
      } catch (error) {
        console.error("Invalid token format:", error);
      }
    }
    return headers;
  },
});

export const imageUrl = "http://10.0.70.36:8011/";

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
});
