import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { usePortfolio } from './hooks/usePortfolio';
import { useTheme } from './hooks/useTheme';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';

const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })));
const ResumePage = lazy(() => import('./pages/ResumePage').then((m) => ({ default: m.ResumePage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })));

function AppRoutes() {
  const data = usePortfolio();
  const { theme, toggle } = useTheme();

  return (
    <Routes>
      <Route element={<Layout theme={theme} onToggleTheme={toggle} site={data.site} />}>
        <Route path="/" element={<HomePage data={data} />} />
        <Route
          path="/projects/:slug"
          element={
            <Suspense fallback={<p className="container">Loading…</p>}>
              <ProjectDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/resume"
          element={
            <Suspense fallback={<p className="container">Loading…</p>}>
              <ResumePage data={data} />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<p className="container">Loading…</p>}>
            <AdminLoginPage />
          </Suspense>
        }
      />
      <Route
        path="/admin"
        element={
          <Suspense fallback={<p className="container">Loading…</p>}>
            <AdminPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
