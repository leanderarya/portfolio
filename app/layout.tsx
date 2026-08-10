import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Arya Ajisadda — Software Engineer & Web Developer",
  description:
    "Software Engineer & Web Developer. Building robust web applications, CMS, POS systems, and mobile apps.",
  // ponytail: metadataBase pakai contoh domain Vercel. Ganti ke domain real
  // sebelum go-live (dipakai OG image URL absolut).
  metadataBase: new URL("https://aryajisadda.vercel.app"),
  openGraph: {
    title: "Arya Ajisadda — Software Engineer & Web Developer",
    description:
      "Software Engineer & Web Developer. Building robust web applications, CMS, POS systems, and mobile apps.",
    type: "website",
    images: [{ url: "/portrait.png", alt: "Arya Ajisadda" }],
  },
  themeColor: "#BFF542",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
