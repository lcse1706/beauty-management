import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { ReceiptPage } from './pages/ReceiptPage';
import { LoginPage } from './pages/LoginPage';
import { ReceiptListPage } from './pages/ReceiptListPage';
import { DetailsPage } from './pages/DetailsPage';
import { AuthProvider } from './components/Context/AuthContext';
import { DataProvider } from './components/Context/DataContext';
import PdfGenerator from './components/Forms/PdfForm';
import { ModalProvider } from './components/Context/ModalContext';
import { Modal } from './UI/Modal';
import './App.scss';

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
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <ModalProvider>
          <RouterProvider router={router} />;
          <Modal />
        </ModalProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
