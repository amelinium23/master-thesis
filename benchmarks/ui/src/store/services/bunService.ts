import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bunApi = createApi({
  reducerPath: "bun",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.BASE_URL}/api` }),
  endpoints: (builder) => ({
    getTsSorting: builder.query({
      query: () => "/ts/bun/sorting"
    }),
    getJsSorting: builder.query({
      query: () => "/ts/bun/sorting"
    })
  })
});
