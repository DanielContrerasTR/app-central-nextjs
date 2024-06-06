import { WithProvider } from "app/components/shared/WithProvider/WithProvider";
import "./globals.scss";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GlobalLoader } from "app/components/shared/GlobalLoader/GlobalLoader";
import { Layout } from "app/components/shared/Layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App Central",
  description: "Thomson Reuters App Central",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} app-store-mfe`}>
        <WithProvider>
          <Layout>{children}</Layout>
          <GlobalLoader />
        </WithProvider>
      </body>
    </html>
  );
}
