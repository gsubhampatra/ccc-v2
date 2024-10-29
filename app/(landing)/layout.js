// app/layout.js
import { Inter, Poppins } from "next/font/google";
import "@/app/globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export default function LandingLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <link rel="icon" href="https://i.ibb.co/C0DGCkd/111.png" />

      <body
        className={`${inter.className} ${poppins.className} overflow-x-hidden`}
      >
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
