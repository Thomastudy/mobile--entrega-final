import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://proyecto-coder-mobile-default-rtdb.firebaseio.com/",
  }),
  endpoints: (builder) => ({
    putProfilePicture: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profilePictures/${localId}.json`,
        method: "PUT",
        body: { photoURL: image },
      }),
    }),
    getProfilePicture: builder.query({
      query: (localId) => `profilePictures/${localId}.json`,
    }),
  }),
});

export const { usePutProfilePictureMutation, useGetProfilePictureQuery } =
  userApi;
