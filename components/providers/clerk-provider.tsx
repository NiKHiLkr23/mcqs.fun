"use client";

// import { dark, shadesOfPurple, neobrutalism } from "@clerk/themes";
import { ClerkProvider as ClerkAuthProvider } from "@clerk/nextjs";
// import { useTheme } from "next-themes";
// import { usePathname } from "next/navigation";
export const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  // const { resolvedTheme } = useTheme();

  // const pathname = usePathname();

  return (
    <ClerkAuthProvider
    // appearance={{
    //   baseTheme:
    //     resolvedTheme === "dark" ? dark : undefined,
    //   signIn: { baseTheme: undefined, variables: { colorPrimary: "black" } },
    //   signUp: { baseTheme: undefined, variables: { colorPrimary: "black" } },
    // }}
    >
      {children}
    </ClerkAuthProvider>
  );
};
