import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "./App";
import { Header } from "./components/header";
import { ThemeProvider } from "./providers/ThemeProvider";
import { store } from "./store/store";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Header />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
