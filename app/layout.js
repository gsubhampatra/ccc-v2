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
  title: {
    default: "Cloud Computing Club",
    template: "%s | CCC",
  },
  description:
    "Official website of NIST Cloud Computing Club, fostering innovation and learning in cloud technologies.",
  keywords: [
    "cloud computing",
    "NIST",
    "technology club",
    "AWS",
    "Azure",
    "cloud native",
  ],
  authors: [{ name: "Cloud Computing Club" }],
  creator: "Cloud Computing Club",
  publisher: "Cloud Computing Club",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Cloud Computing Club",
    description: "Official website of NIST Cloud Computing Club",
    url: "https://cloudcomputingclub.co.in",
    siteName: "Cloud Computing Club",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Computing Club",
    description: "Official website of NIST Cloud Computing Club",
  },
};

export default function RootLayout({ children }) {
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
