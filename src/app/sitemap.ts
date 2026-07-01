import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nyanospace.com';

  // Static routes
  const staticRoutes = [
    '',
    '/stories',
    '/demo',
    '/collaborate',
    '/partners',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic couple routes
  const { data: couples } = await supabase
    .from('couples')
    .select('slug, updated_at')
    .order('updated_at', { ascending: false });

  const dynamicRoutes = (couples || []).map((couple) => ({
    url: `${baseUrl}/couples/${couple.slug}`,
    lastModified: new Date(couple.updated_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
