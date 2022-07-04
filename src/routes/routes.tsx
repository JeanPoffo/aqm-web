import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DataDashboard from '../pages/DataDashboard';
import Station from '../pages/Station';

import ProtectedRoute from './ProtectedRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataDashboard />} />
        <Route path="/station" element={<ProtectedRoute><Station /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
