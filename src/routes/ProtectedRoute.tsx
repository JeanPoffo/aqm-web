/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/auth';

interface ProtectedRouteParam {
  children: ReactNode,
}

export default function ProtectedRoute({ children }: ProtectedRouteParam) {
  const { user } = useAuth();

  return <>{user ? children : <Navigate to="/" />}</>;
}
