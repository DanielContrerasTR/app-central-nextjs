import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search results",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
