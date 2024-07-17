import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" w-full lg:max-w-6xl xl:max-w-[1540px] lg:mx-auto ">
      <Header />

      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full overflow-hidden ">{children}</div>
      </div>
    </main>
  );
}
