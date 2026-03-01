import type { Metadata } from "next";
import "../../devlink/global.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indian VC Stack",
  description:
    "Visual landscape of 147 tools used by VCs and angel investors, curated by Indian VCs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
