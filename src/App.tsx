import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { ReceiptPage } from './pages/ReceiptPage';
import { LoginPage } from './pages/LoginPage';
import { ReceiptListPage } from './pages/ReceiptListPage';
import { DetailsPage } from './pages/DetailsPage';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import PdfGenerator from './components/forms/PdfForm';
import { PopupProvider } from './context/PopupContext';
import { Popup } from './components/ui';
import './App.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'sendreceipt', element: <ReceiptPage /> },
      { path: 'receiptlist', element: <ReceiptListPage /> },
      { path: 'receiptlist/:receiptid', element: <DetailsPage /> },
      { path: 'pdf', element: <PdfGenerator /> },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <PopupProvider>
          <RouterProvider router={router} />;
          <Popup />
        </PopupProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
