import type { Metadata } from "next";
import "@/app/ui/global.css";

import ContextLayout from "./layouts/ContextLayout";

export const metadata: Metadata = {
  title: "TestFlix",
  description: "Online environment for thesis experiment by Jelle Peperzak",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
      </head>
      <body className={`antialiased`}>
          <ContextLayout>
            {children}
          </ContextLayout>
      </body>
    </html>
  );
}
