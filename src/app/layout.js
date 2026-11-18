import { Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar.js";
import { Footer } from "../components/layout/Footer.js";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dotix | SaaS, Web & Mobile App Development Company",
  description: "Dotix builds and operates SaaS products, custom software, websites, mobile applications and business dashboards for startups and businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background-primary text-text-primary">
        <div aria-hidden="true" className="site-animated-background" />
        <div className="relative z-10 flex min-h-full flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
