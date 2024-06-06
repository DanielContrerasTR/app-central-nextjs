import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "Page not found",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
