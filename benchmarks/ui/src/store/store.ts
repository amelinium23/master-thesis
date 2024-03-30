import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { benchmarkApi } from "./services/benchmarkService";

export const store = configureStore({
  reducer: {
    [benchmarkApi.reducerPath]: benchmarkApi.reducer
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare()
});

setupListeners(store.dispatch);
