// src/services/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://identitytoolkit.googleapis.com/v1/",
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: ({ email, password }) => ({
        url: `accounts:signUp?key=AIzaSyDhRiKx3mxZkTLQN4JWC3yyOflyxi6hSLk`,
        method: "POST",
        body: {
          email,
          password,
          returnSecureToken: true,
        },
      }),
    }),
    login: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          
          return { data: userCredential.user };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
