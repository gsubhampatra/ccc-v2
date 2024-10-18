// app/layout.js
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "NIST CCC",
  description: "NIST Cloud Computing Club",
  image: "https://i.ibb.co/C0DGCkd/111.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
    <link rel="icon" href="https://i.ibb.co/C0DGCkd/111.png" />

      <body className={`${inter.className} ${poppins.className} overflow-x-hidden`}>
        <Navigation />
        {children}

        <Footer />
      </body>
    </html>
  );
}
