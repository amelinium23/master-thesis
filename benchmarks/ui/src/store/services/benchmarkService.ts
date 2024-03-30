import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Base64Request, FilesRequest, ServerRequest, SortingRequest, SqLiteRequest } from "./request.types";
import { FilesResult, Response, SortingResult, SqliteResults } from "./response.types";

export const benchmarkApi = createApi({
  reducerPath: "bun",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.BASE_URL}/api`, method: "POST" }),
  endpoints: (builder) => ({
    getSortingResults: builder.query<Response<SortingResult>, SortingRequest>({
      query: (body) => ({ url: "/sorting", method: "POST", body: body })
    }),
    getFilesResults: builder.query<Response<FilesResult>, FilesRequest>({
      query: (body) => ({ url: "/files", method: "POST", body: body })
    }),
    getBase64Results: builder.query<Response<{ num: number }>, Base64Request>({
      query: (body) => ({ url: "/base64", method: "POST", body: body })
    }),
    getServerResults: builder.query<Response<object>, ServerRequest>({
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
