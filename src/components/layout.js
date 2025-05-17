import { Footer } from "@/components/footer";
import { Header } from "@/components/haeder";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex bg-gradient-to-br from-purple-950 via-violet-900 to-indigo-950 min-h-screen flex-col items-center justify-between p-24 border-gray-300 ">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
