"use client"

import localFont from "next/font/local";
import "./globals.css";
import { IntlProvider } from 'react-intl';
import esMessages from './locales/es.json';
import enMessages from './locales/en.json';
import { useEffect, useState } from 'react';

type SupportedLanguages = 'es' | 'en';

const messages: Record<SupportedLanguages, Record<string, string>> = {
  es: esMessages,
  en: enMessages,
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [browserLanguage, setBrowserLanguage] = useState<SupportedLanguages>('en');

  useEffect(() => {
    const lang = navigator.language.startsWith('es') ? 'es' : 'en';
    setBrowserLanguage(lang);
  }, []);

  return (
    <IntlProvider locale={browserLanguage} messages={messages[browserLanguage]}>
      <html lang={browserLanguage}>
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{browserLanguage === 'es' ? 'Realidad Aumentada Web' : 'Augmented Reality Web'}</title>
          <link rel="icon" type="image/svg+xml" href="images/favicon.svg" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </IntlProvider>
  );
}
