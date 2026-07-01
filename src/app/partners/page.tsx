import { Metadata } from 'next';
import PartnersClient from './PartnersClient';

export const metadata: Metadata = {
  title: "Event Organizers | Our Professional Network",
  description: "Collaborating with the finest professionals in the wedding industry. From blouse designers to event organizers, we work together to preserve every memory.",
  keywords: ["wedding organizers", "blouse designers", "event planners", "wedding vendors", "nyano space partners"],
  openGraph: {
    title: "Event Organizers | Nyano Space",
    description: "Join our elite network of wedding professionals.",
    url: "https://nyanospace.com/partners",
  }
};

export default function PartnerNetworkPage() {
  return <PartnersClient />;
}
