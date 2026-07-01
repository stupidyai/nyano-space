import { Metadata } from 'next';
import StoriesClient from './StoriesClient';

export const metadata: Metadata = {
  title: "Love Stories | Explore Eternal Time Trees",
  description: "Discover the beautiful journeys of our couples. Explore their unique Eternal Time Trees and wedding podcast interviews preserved forever.",
  keywords: ["love stories gallery", "wedding milestones", "couple timeline", "eternal time tree gallery", "wedding memories"],
  openGraph: {
    title: "Love Stories | Nyano Space",
    description: "A gallery of preserved love stories and wedding milestones.",
    url: "https://nyanospace.com/stories",
  }
};

export default function StoriesPage() {
  return <StoriesClient />;
}
