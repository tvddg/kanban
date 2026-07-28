import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kanban-board",
  description: "A kanban board to track your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
