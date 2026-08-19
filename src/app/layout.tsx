import type { Metadata } from "next";
import "./globals.css";
import { Slide, ToastContainer } from "react-toastify";

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
        className="h-svh bg-cover bg-center bg-linear-to-br from-red-400 to-purple-600 text-white overscroll-none"
      lang="en"
    >
      <body className="h-full overflow-clip"
        >
            {children}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
        </body>
    </html>
  );
}
