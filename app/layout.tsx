import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import CookieBanner from "./components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BelovedMoment - Transform Photos into Living Memories | Professional Video Creation",
  description: "Transform your favorite photos into beautifully crafted emotional videos by our expert editing team. Create stunning living memories from your beloved moments. Rated 4.8/5 by 1,249+ customers.",
  keywords: "photo to video, living memories, emotional videos, photo animation, video creation, beloved moments, professional editing, custom videos",
  authors: [{ name: "BelovedMoment" }],
  creator: "BelovedMoment",
  publisher: "BelovedMoment",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://belovedmoment.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon-purple.svg',
    shortcut: '/favicon-purple.svg',
    apple: '/favicon-purple.svg',
  },
  openGraph: {
    title: "BelovedMoment - Transform Photos into Living Memories",
    description: "Upload your favorite photos and receive beautifully crafted videos filled with emotion. Professional photo to video transformation rated 4.8/5 stars.",
    url: 'https://belovedmoment.com',
    siteName: 'BelovedMoment',
    images: [
      {
        url: '/social-preview.svg',
        width: 1200,
        height: 630,
        alt: 'BelovedMoment - Professional Photo to Video Creation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "BelovedMoment - Transform Photos into Living Memories",
    description: "Professional photo to video transformation. Create emotional videos from your beloved moments. 4.8/5 stars from 1,249+ customers.",
    images: ['/social-preview.svg'],
    creator: '@BelovedMoment',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B9MN2QPJFE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-B9MN2QPJFE');
          `}
        </Script>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        {/* <CookieBanner /> */}
      </body>
    </html>
  );
}
