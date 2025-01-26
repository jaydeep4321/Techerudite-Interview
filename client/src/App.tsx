import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './screen/login/Login';
import Register from './screen/admin/register/Register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmailVerify from './screen/admin/email-verify/EmailVerify';
import Home from './screen/home/Home';
import CustomerRegister from './screen/customer/register/Register';
import { Toaster } from 'sonner';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster duration={10000} position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/customer/register" element={<CustomerRegister />} />
          <Route path="/verify-otp" element={<EmailVerify />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
