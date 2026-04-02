import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ClientWizard from './pages/ClientWizard';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';

function App() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-rose-500/30">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/book" replace />} />
          <Route path="/book/*" element={<ClientWizard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/master" element={<SuperAdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
