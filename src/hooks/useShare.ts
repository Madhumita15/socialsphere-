import { toast } from "sonner";


interface ShareProps {
  id: string;
  authorName?: string;
  type: 'image' | 'video'; // To handle both feeds and reels
}

export const useShare = () => {
  const handleShare = async (e: React.MouseEvent, { id, authorName, type }: ShareProps) => {
    // 1. Stop Propagation so the "Background Click" doesn't trigger
    e.stopPropagation();

    // 2. The Link we are sending (Dynamic based on type)
    const shareUrl = `${window.location.origin}/user/reels/${id}`;

    if (navigator.share) {
      // Mobile Flow
      try {
        await navigator.share({
          title: `Check out ${authorName || 'this'}'s ${type === 'video' ? 'reel' : 'post'}`,
          url: shareUrl,
        });
      } catch  {
        console.log("User cancelled share");
      }
    } else {
      // PC/Window Flow
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied! Paste it anywhere.");
      } catch {
        toast.error("Failed to copy link");
      }
    }
  };

  return { handleShare };
};