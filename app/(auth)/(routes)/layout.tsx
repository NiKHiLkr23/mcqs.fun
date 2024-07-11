import Header from "@/components/layout/header";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" ">
      <Header />
      <main className="pt-20 pb-2 flex flex-col items-center min-h-screen  w-full max-w-7xl mx-auto ">
        {children}
      </main>
    </section>
  );
}
