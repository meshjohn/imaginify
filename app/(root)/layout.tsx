import MobileNav from "@/components/shared/MobileNav";
import { Sidebar } from "@/components/shared/Sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  const isAuth = !!userId;
  if(!isAuth) {
    redirect('/');
  }
  return (
      <main className="root">
        <Sidebar />
        <MobileNav />
        <div className="root-container">
          <div className="wrapper">{children}</div>
        </div>
      </main>
  );
};

export default Layout;
