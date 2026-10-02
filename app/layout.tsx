import type { Metadata } from "next";
import { Inter, Onest } from "next/font/google";
import { AppShell } from "@/components/shell/app-shell";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const onest = Onest({ variable: "--font-onest", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Secured ChatGPT",
  description: "Prototype de la fonctionnalité Projet de CompagnyChatGPT",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${onest.variable} antialiased`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
