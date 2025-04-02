import axiosClient from "@/axios/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
   loading: boolean;
   blogs: BlogResponse | null;
   selectedBlog: Blog | null;
   pageNo: number;
   error: any; //eslint-disable-line
} = {
   loading: true,
   blogs: null,
   pageNo: 1,
   selectedBlog: null,
   error: "",
};

export const fetchBlog = createAsyncThunk(
   "fetchBlog",
   async ({
      pageNo = 1,
      pageSize = 8,
      controller,
   }: {
      pageNo?: number;
      pageSize?: number;
      controller?: AbortController;
   }) => {
      const response = await axiosClient.get(
         `/blog?page=${pageNo}&page_size=${pageSize}`,
         {
            signal: controller?.signal,
         }
      );
      return response.data.data;
   }
);

export const blogSlice = createSlice({
   name: "contact",
   initialState,
   reducers: {
      setSelectedBlog(state, action) {
         state.selectedBlog = action.payload;
      },
      setPageNo(state, action) {
         state.pageNo = action.payload;
      },
   },
   extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchBlog.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchBlog.fulfilled, (state, action) => {
         state.loading = false;
         state.blogs = action.payload;
      });
      builder.addCase(fetchBlog.rejected, (state, action) => {
         state.loading = false;
         if (action.error.name === "TypeError") return;
         state.error = action.error.message as string;
      });
   },
});

export const { setSelectedBlog, setPageNo } = blogSlice.actions;

export default blogSlice.reducer;
