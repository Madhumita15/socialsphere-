export interface ShareProps {
  id: string;
  authorName?: string;
  type: 'image' | 'video'; // To handle both feeds and reels
}