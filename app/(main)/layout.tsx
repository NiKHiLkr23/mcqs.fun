import Header from "@/components/layout/header";
import { LoadingModal } from "@/components/modal/loading-modal";
import { ClerkProvider } from "@/components/providers/clerk-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/query-provider";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <ModalProvider />

        <main className=" ">
          <Header />

          <div className="flex flex-col  min-h-screen w-full   ">
            {children}
            <LoadingModal />
          </div>
        </main>
      </QueryProvider>
    </ClerkProvider>
  );
}
