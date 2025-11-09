import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Compositional Generalization CARS',
  description: 'Context-Aware Recommender System with Compositional Generalization',
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
