import { useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState } from "@/redux/store";

// Custom hook with RootState typing
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
