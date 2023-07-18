import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { ReceiptPage } from './pages/ReceiptPage';
import { LoginPage } from './pages/LoginPage';
import { ReceiptListPage } from './pages/ReceiptListPage';
import { DetailsPage } from './pages/DetailsPage';
import './App.scss';
import { AuthProvider } from './components/Context/AuthContext';
import { DataProvider } from './components/Context/DataContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'sendreceipt', element: <ReceiptPage /> },
      { path: 'receiptlist', element: <ReceiptListPage /> },
      { path: 'receiptlist/:receiptid', element: <DetailsPage /> },
    ],
  },
]);

const App = () => {
  return (
    <DataProvider>
      <AuthProvider>
        <RouterProvider router={router} />;
      </AuthProvider>
    </DataProvider>
  );
};

export default App;
