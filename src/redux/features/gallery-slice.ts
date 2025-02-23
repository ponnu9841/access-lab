import axiosClient from "@/axios/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean;
  gallery: GalleryResponse | null;
  pageNo: number;
  error: any; //eslint-disable-line
  selectedGallery: Gallery | null;
} = {
  loading: true,
  gallery: null,
  pageNo: 1,
  error: "",
  selectedGallery: null,
};

export const fetchGallery = createAsyncThunk(
  "fetchGallery",
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
      `/gallery?page=${pageNo}&page_size=${pageSize}`,
      {
        signal: controller?.signal,
      }
    );
    return response.data.data;
  }
);

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setPageNo: (state, action) => {
      state.pageNo = action.payload;
    },
    resetPageNo: (state) => {
      state.pageNo = initialState.pageNo;
    },
    setSelectedGallery: (state, action) => {
      state.selectedGallery = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchGallery.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGallery.fulfilled, (state, action) => {
      state.loading = false;
      state.gallery = action.payload;
    });
    builder.addCase(fetchGallery.rejected, (state, action) => {
      state.loading = false;
      if (action.error.name === "TypeError") return;
      state.error = action.error.message as string;
    });
  },
});

export const { setPageNo, resetPageNo, setSelectedGallery } =
  gallerySlice.actions;

export default gallerySlice.reducer;
