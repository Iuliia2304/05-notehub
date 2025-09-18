import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './components/App/App';
import './index.css';
import 'modern-normalize/modern-normalize.css';


const queryClient = new QueryClient({
defaultOptions: {
queries: {
retry: 1,
refetchOnWindowFocus: false,
},
},
});


ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<QueryClientProvider client={queryClient}>
<App />
</QueryClientProvider>
</React.StrictMode>,
);