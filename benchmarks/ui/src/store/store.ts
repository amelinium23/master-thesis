import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { benchmarkApi } from "./services/benchmarkService";

export const store = configureStore({
  reducer: {
    [benchmarkApi.reducerPath]: benchmarkApi.reducer
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(benchmarkApi.middleware)
});

setupListeners(store.dispatch);
