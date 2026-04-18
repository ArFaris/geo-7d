import { useLanguage } from 'contexts/LanguageContext';
import Header from 'components/Header';
import contentRu from 'content/analytics/gnss-receivers-state/gnss-receivers-state.ru.json';
import contentEn from 'content/analytics/gnss-receivers-state/gnss-receivers-state.en.json';
import { Outlet } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const { locale } = useLanguage();
  const queryClient = new QueryClient();
  
  const content = locale === 'ru' ? contentRu : contentEn;

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
