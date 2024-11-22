import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BudgetProvider } from "./context/Context";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kişisel Bütçe ve Harcama Takip Uygulaması ",
  description:
    "Kişisel bütçe ve harcama takip uygulaması ile harcamalarınızı kontrol altına alın.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const user = cookieStore.get("currentUser");
  return (
    <html lang="tr">
      <body className={inter.className}>
        <BudgetProvider userCookie={user?.value}>{children}</BudgetProvider>
      </body>
    </html>
  );
}
