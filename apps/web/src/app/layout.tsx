import "@recycle-chain/ui/src/app/globals.css";
import { Container } from "@recycle-chain/ui/src/components/atoms/Container";
import { ToastContainer } from "@recycle-chain/ui/src/components/molecules/Toast";
import { Header } from "@recycle-chain/ui/src/components/organisms/Header";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { RootProvider } from "../providers/root-provider";

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

export const metadata: Metadata = {
  title: "Recycle Chain",
  description: "Recycle Chain Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RootProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-25`}
        >
          <Header />
          <Container>{children}</Container>
          <ToastContainer />
        </body>
      </RootProvider>
    </html>
  );
}
