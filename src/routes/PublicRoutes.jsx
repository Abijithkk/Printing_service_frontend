import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import HomePage from '../pages/public/HomePage';
import CategoryDetailPage from '../pages/public/CategoryDetailPage';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="category/:id" element={<CategoryDetailPage />} />
        {/* Add more public routes here */}
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
