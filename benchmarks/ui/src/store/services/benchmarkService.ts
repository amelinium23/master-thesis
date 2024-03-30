import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Base64Request, FilesRequest, ServerRequest, SortingRequest, SqLiteRequest } from "./request.types";
import { Base64Results, FilesResults, Response, ServerResults, SortingResults, SqliteResults } from "./response.types";

export const benchmarkApi = createApi({
  reducerPath: "benchmark",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api`, method: "POST" }),
  endpoints: (builder) => ({
    getSortingResults: builder.query<Response<SortingResults>, SortingRequest>({
      query: (body) => ({ url: "/sorting", method: "POST", body: body })
    }),
    getFilesResults: builder.query<Response<FilesResults>, FilesRequest>({
      query: (body) => ({ url: "/files", method: "POST", body: body })
    }),
    getBase64Results: builder.query<Response<Base64Results>, Base64Request>({
      query: (body) => ({ url: "/base64", method: "POST", body: body })
    }),
    getServerResults: builder.query<Response<ServerResults>, ServerRequest>({
      query: (body) => ({ url: "/server", method: "POST", body: body })
    }),
    getSqliteResults: builder.query<Response<SqliteResults>, SqLiteRequest>({
      query: (body) => ({ url: "/sqlite", method: "POST", body: body })
    })
  })
});

export const {
  useGetBase64ResultsQuery,
  useGetFilesResultsQuery,
  useGetSortingResultsQuery,
  useGetSqliteResultsQuery,
  useGetServerResultsQuery
} = benchmarkApi;
