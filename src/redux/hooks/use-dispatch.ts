import { useDispatch } from "react-redux";
// import type { ThunkDispatch } from "@reduxjs/toolkit";
// import type { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";

// export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
