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
        className="min-h-full bg-cover bg-center bg-linear-to-br from-red-400 to-purple-600 text-white overscroll-none"
      lang="en"
    >
      <body className="max-h-dvh"
        >
            {children}
        </body>
    </html>
  );
}
