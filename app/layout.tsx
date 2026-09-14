import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://souzaflores.com"),
  title: "Souza Flores | Flores para todas as ocasiões",
  description:
    "Loja online da Souza Flores com buquês, arranjos, presentes e entrega em Feira de Santana, Bahia.",
  openGraph: {
    title: "Souza Flores",
    description: "Flores para todas as ocasiões.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f7f3ee] text-[#18241a]">{children}</body>
    </html>
  );
}
