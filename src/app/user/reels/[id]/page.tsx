import SingleReel from "@/components/SingleReel";
import { getPostById } from "@/services/helper/apiFunction/post.function";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";


type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const res = await getPostById({
    id,
    userId: undefined,
  });

  const post = res?.formattedData?.[0];

  const title = `${post?.author?.fullname || "User"} on SocialSphere+`;
  const description =
    post?.caption ||
    "Watch amazing reels and connect with people on SocialSphere+.";

  // IMPORTANT:
  // Use a proper PUBLIC image URL here
  // If media_url is a video, then use thumbnail instead
  const imageUrl =
    post?.media_url ||
    "/images/logo.png";

  const reelUrl = `https://socialsphere-alpha.vercel.app/user/reels/${id}`;

  return {
    metadataBase: new URL("https://socialsphere-alpha.vercel.app"),

    title,
    description,

    keywords: [
      "SocialSphere+",
      "social media",
      "instagram clone",
      "reels",
      "viral videos",
      "photo sharing",
      "video sharing",
      "social networking",
    ],

    authors: [
      {
        name: "Madhumita Das",
      },
    ],

    creator: "Madhumita Das",
    publisher: "SocialSphere+",

    alternates: {
      canonical: reelUrl,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      url: reelUrl,
      siteName: "SocialSphere+",

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "SocialSphere+ Reel Preview",
        },
      ],

      locale: "en_US",
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@yourusername",
      images: [imageUrl],
    },

    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },

    category: "social media",
  };
}


export default async function Page({params}: Props) {
  const {id }= await params;
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["post", id],
    queryFn: ()=> getPostById({id, userId: undefined})
  })
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingleReel /> 
    </HydrationBoundary>
  ) 
}