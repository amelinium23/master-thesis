import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { bunApi } from "./services/bunService";

export const store = configureStore({
  reducer: {
    [bunApi.reducerPath]: bunApi.reducer
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare()
});

setupListeners(store.dispatch);
