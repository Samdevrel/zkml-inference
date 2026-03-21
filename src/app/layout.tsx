import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZKML Inference | @samdevrel",
  description: "Run AI models with zero-knowledge privacy. BERT-13B, GPT-2, ResNet-50, Stable Diffusion, and Llama with verifiable proofs.",
  keywords: ["zkml", "ZKML", "zero-knowledge ML", "dePIN", "decentralized computing", "Ocean Protocol", "Infernet"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
