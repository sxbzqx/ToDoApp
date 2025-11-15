import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "ToDo App",
  description: "todo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col items-center p-4">
        <header className="text-3xl font-bold mb-6">ToDo App</header>
        <main className="w-full max-w-md">{children}</main>
      </body>
    </html>
  );
}
