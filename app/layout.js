// app/layout.js
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

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
  if (typeof window !== "undefined") {
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    document.addEventListener("keydown", (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    });

    // Clear console
    console.clear();
    // Disable console.log and other console methods
    console.log = console.warn = console.error = () => {};
  }
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <link rel="icon" href="https://i.ibb.co/C0DGCkd/111.png" />

      <body
        className={`${inter.className} ${poppins.className} overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
