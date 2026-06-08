import '@/vendor/normalize.css';
import '@/vendor/fonts.css';
import '@/vendor/page.css';
import '@/components/App/App.css';
import AppProvider from '@/components/AppProvider';

export const metadata = { title: 'Movies Explorer — Сафронов Константин', description: 'Дипломный проект ЮТМиИТ' };

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
