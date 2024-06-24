import Navbar from '@/app/ui/navbar';

export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <Navbar />
      <div className="flex-grow p-6 md:overflow-y-auto md:py-12">{children}</div>
    </div>
  );
}