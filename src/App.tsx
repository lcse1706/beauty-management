import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { ReceiptPage } from './pages/ReceiptPage';
import { LoginPage } from './pages/LoginPage';
import { ReceiptListPage } from './pages/ReceiptListPage';
import { DetailsPage } from './pages/DetailsPage';
import { AuthProvider } from './components/Context/AuthContext';
import { DataProvider } from './components/Context/DataContext';
import PdfGenerator from './components/Forms/PdfForm';
import { PopupProvider } from './components/Context/PopupContext';
import { Popup } from './UI/Popup';
import './App.scss';
// import { TestPage } from './pages/TestPage';

const data = {
  receipt_id: '1/2023',
  name: 'Lukasz Czarniecki',
  treatment: 'Brwi',
  email: 'lukasz@email.com',
  price: '500',
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'sendreceipt', element: <ReceiptPage /> },
      { path: 'receiptlist', element: <ReceiptListPage /> },
      { path: 'receiptlist/:receiptid', element: <DetailsPage /> },
      { path: 'pdf', element: <PdfGenerator data={data} /> },
      // { path: 'test', element: <TestPage /> },
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
