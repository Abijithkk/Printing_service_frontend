import { useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import {
  Cog6ToothIcon,
  ListBulletIcon,
  ComputerDesktopIcon,
  StarIcon,
  TagIcon,
  BriefcaseIcon,
  ChatBubbleBottomCenterTextIcon,
  CursorArrowRaysIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Site Settings', href: '/admin/settings', icon: Cog6ToothIcon },
    { name: 'Navigation', href: '/admin/navigation', icon: ListBulletIcon },
    { name: 'Hero Section', href: '/admin/hero', icon: ComputerDesktopIcon },
    { name: 'Highlights', href: '/admin/highlights', icon: StarIcon },
    { name: 'Categories', href: '/admin/categories', icon: TagIcon },
    { name: 'Services', href: '/admin/services', icon: BriefcaseIcon },
    {
      name: 'Testimonials',
      href: '/admin/testimonials',
      icon: ChatBubbleBottomCenterTextIcon,
    },
    { name: 'CTA Buttons', href: '/admin/cta', icon: CursorArrowRaysIcon },
    { name: 'Newsletter', href: '/admin/newsletter', icon: EnvelopeIcon },
  ];

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-gray-900 text-white">
      <div className="border-b border-gray-800 p-6">
        <h2 className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-2xl font-bold text-transparent">
          QNL Admin
        </h2>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto py-4">
        {navigation.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            isActive={
              location.pathname === item.href ||
              location.pathname.startsWith(item.href + '/')
            }
          />
        ))}
      </nav>
      <div className="border-t border-gray-800 p-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} QNL Software
      </div>
    </aside>
  );
};

export default Sidebar;
