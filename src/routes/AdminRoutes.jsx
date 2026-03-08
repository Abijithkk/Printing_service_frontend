import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import SiteSettingsPage from '../pages/admin/SiteSettingsPage';
import NavigationPage from '../pages/admin/NavigationPage';
import HeroPage from '../pages/admin/HeroPage';
import HighlightsPage from '../pages/admin/HighlightsPage';
import CategoriesPage from '../pages/admin/CategoriesPage';
import ServicesPage from '../pages/admin/ServicesPage';
import TestimonialsPage from '../pages/admin/TestimonialsPage';
import CTAButtonsPage from '../pages/admin/CTAButtonsPage';
import NewsletterSubmissionsPage from '../pages/admin/NewsletterSubmissionsPage';
import LoginPage from '../pages/admin/LoginPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="settings" element={<SiteSettingsPage />} />
        <Route path="navigation" element={<NavigationPage />} />
        <Route path="hero" element={<HeroPage />} />
        <Route path="highlights" element={<HighlightsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="cta" element={<CTAButtonsPage />} />
        <Route path="newsletter" element={<NewsletterSubmissionsPage />} />

        {/* Default admin redirect */}
        <Route path="" element={<Navigate to="/admin/settings" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
