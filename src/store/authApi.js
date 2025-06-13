// src/services/authService.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://identitytoolkit.googleapis.com/v1/AIzaSyDhRiKx3mxZkTLQN4JWC3yyOflyxi6hSLk",
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (auth) => ({
        url: `accounts:signUp?key=AIzaSyDhRiKx3mxZkTLQN4JWC3yyOflyxi6hSLk`,
        method: "POST",
        body: auth,
      }),
    }),
    login: builder.mutation({
      query: (auth) => ({
        url: `accounts:signInWithPassword?key=AIzaSyDhRiKx3mxZkTLQN4JWC3yyOflyxi6hSLk`,
        method: "POST",
        body: auth,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
