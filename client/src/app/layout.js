import { Inter } from "next/font/google";
import "./globals.css";
import AppContainer from "@/components/AppContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Qure AI Ecommerce",
  description: "Qure AI Ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
