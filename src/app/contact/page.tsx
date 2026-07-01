import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Contact Us | Connect with Nyano Space",
  description: "Get in touch with Nyano Space. Whether you're a couple wanting to preserve your story, an influencer looking to collaborate, or a partner organizer, we're here to connect.",
  keywords: ["contact nyano space", "wedding podcast inquiry", "collaborate with nyano space", "event organizer partnership"],
  openGraph: {
    title: "Contact Us | Nyano Space",
    description: "Reach out to the founder or join our community to start your journey with us.",
    url: "https://nyanospace.com/contact",
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
