import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar/Navbar';
import Footer from '../components/public/Footer/Footer';

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
