import Sidebar from '@/app/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="w-full flex-none md:w-64">
      </div>
      <Sidebar />
      <div className="flex-grow p-6 md:p-12">
        {children}
      </div>
    </div>
  );
}
