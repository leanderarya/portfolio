import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Cahaya Arkana — Arya Ajisadda | Software Engineer",
  description:
    "Cahaya Arkana. Software Engineer & Web Developer. Building robust web applications, CMS, POS systems, and mobile apps.",
  metadataBase: new URL("https://cahayaarkana.site"),
  openGraph: {
    title: "Cahaya Arkana — Arya Ajisadda | Software Engineer",
    description:
      "Cahaya Arkana. Software Engineer & Web Developer. Building robust web applications, CMS, POS systems, and mobile apps.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Cahaya Arkana — Arya Ajisadda" }],
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
