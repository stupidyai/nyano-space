import { Metadata } from 'next';
import CollaborateClient from './CollaborateClient';

export const metadata: Metadata = {
  title: "For Influencers | Join the Creator Network",
  description: "Are you a storyteller? Join Nyano Space to host intimate podcast dialogues and wedding chronicles. Help us preserve legacies through love stories.",
  keywords: ["influencer collaboration", "wedding creators", "podcast hosts", "storytelling partnership", "nyano space influencers"],
  openGraph: {
    title: "Influencer Collaboration | Nyano Space",
    description: "Join our network of storytellers and podcast hosts.",
    url: "https://nyanospace.com/collaborate",
  }
};

export default function CollaboratePage() {
  return <CollaborateClient />;
}
