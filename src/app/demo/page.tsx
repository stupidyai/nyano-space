import { Metadata } from 'next';
import DemoClient from './DemoClient';

export const metadata: Metadata = {
  title: "Watch Demos | The Nyano Space Experience",
  description: "Experience how we capture the soul of every celebration. Watch our specialized interview segments: Before & After the Vows, Guest Chronicles, and Family Legacies.",
  keywords: ["wedding podcast demo", "couple interview video", "wedding ceremony podcast", "nyano space demo"],
  openGraph: {
    title: "Watch Demos | Nyano Space",
    description: "Cinematic samples of our wedding podcast segments.",
    url: "https://nyanospace.com/demo",
  }
};

export default function DemoPage() {
  return <DemoClient />;
}
