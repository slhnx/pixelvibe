import DesignSidebar from "@/components/design/sidebar";
import Topbar from "@/components/design/topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="p-3">
      <Topbar />
      <div className="mt-4 flex gap-x-12">
        <DesignSidebar />
        {children}
      </div>
    </main>
  );
};

export default Layout;
