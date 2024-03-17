import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { Header } from './components/header';
import { ThemeProvider } from './providers/ThemeProvider';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <ThemeProvider>
      <Header />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
