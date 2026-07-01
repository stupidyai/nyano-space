/**
 * Generates a slug for a couple based on the format:
 * "female_name W male_name dd-mm-yy"
 */
export function generateCoupleSlug(femaleName: string, maleName: string, weddingDate: string): string {
  // Format date to dd-mm-yy
  const date = new Date(weddingDate);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2);
  const formattedDate = `${dd}-${mm}-${yy}`;

  // Clean names (remove special characters, replace spaces with hyphens)
  const cleanFemale = femaleName.trim().replace(/\s+/g, '-').toLowerCase();
  const cleanMale = maleName.trim().replace(/\s+/g, '-').toLowerCase();

  return `${cleanFemale}-w-${cleanMale}-${formattedDate}`;
}

/**
 * Formats a date string for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
