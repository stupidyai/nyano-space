import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
import CoupleTimeTreeClient from './CoupleTimeTreeClient';

interface Props {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;

  const { data: couple } = await supabase
    .from('couples')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!couple) {
    return {
      title: 'Story Not Found',
    };
  }

  const title = `${couple.female_name} & ${couple.male_name}'s Eternal Time Tree`;
  const description = `Celebrate the journey of ${couple.female_name} and ${couple.male_name}. Explore their milestones, from how they met to their wedding day, preserved forever at Nyano Space.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://nyanospace.com/couples/${slug}`,
      images: ['/og-image-couple.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CouplePage({ params }: Props) {
  const { slug } = params;
  const { data: couple } = await supabase
    .from('couples')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!couple) return <CoupleTimeTreeClient />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${couple.female_name} & ${couple.male_name}'s Eternal Time Tree`,
    "description": `The love story and wedding milestones of ${couple.female_name} and ${couple.male_name}, preserved by Nyano Space.`,
    "image": "https://nyanospace.com/og-image-couple.jpg",
    "author": {
      "@type": "Organization",
      "name": "Nyano Space",
      "url": "https://nyanospace.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nyano Space",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nyanospace.com/logo.png"
      }
    },
    "datePublished": couple.created_at || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nyanospace.com/couples/${slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoupleTimeTreeClient />
    </>
  );
}
