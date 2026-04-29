import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/tasks`,
    }),
  }),
});

export const { useGetTasksQuery } = baseApi;

export default baseApi;
