import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nyanospace.com'),
  title: {
    default: "Nyano Space | Preserving Love Stories Through Podcasts",
    template: "%s | Nyano Space"
  },
  description: "Nyano Space preserves couple's journey through intimate podcast-style interviews. Capturing raw emotions before and after wedding ceremonies to create an Eternal Time Tree.",
  keywords: [
    "wedding podcast", 
    "couple interviews", 
    "love stories", 
    "wedding memory", 
    "eternal time tree", 
    "nyano space",
    "marriage legacy",
    "wedding storytelling",
    "indian wedding podcast",
    "relationship journey"
  ],
  authors: [{ name: "Nyano Space" }],
  creator: "Nyano Space",
  publisher: "Nyano Space",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nyanospace.com",
    siteName: "Nyano Space",
    title: "Nyano Space | Preserving Love Stories Through Podcasts",
    description: "Preserving the soul of your relationship through intimate dialogues and cinematic time trees.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nyano Space - Eternal Time Tree",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyano Space | Preserving Love Stories",
    description: "Capture the raw emotions of your wedding journey with our specialized podcast interviews.",
    creator: "@nyanospace",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: '/',
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
  category: 'Wedding Services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nyano Space",
    "url": "https://nyanospace.com",
    "logo": "https://nyanospace.com/logo.png",
    "sameAs": [
      "https://x.com/nyanospace",
      "https://www.linkedin.com/in/na-madhu-m/",
      "https://www.instagram.com/nyanospace/",
      "https://www.tiktok.com/@inyanospace",
      "https://www.youtube.com/@nyanospace"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-6364913348",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} font-poppins antialiased bg-white`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
