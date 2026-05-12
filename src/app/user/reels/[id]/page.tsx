import SingleReel from "@/components/SingleReel";
import { getPostById } from "@/services/helper/apiFunction/post.function";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  const res = await getPostById({ id, userId: undefined });
  const post = res?.formattedData?.[0]; 
  console.log("post", post)

  return {
    title: `Reel by ${post?.author?.fullname || 'User'}`,
    description: post?.caption || "Check out this reel!",
    openGraph: {
      title: `Check out this Reel`,
      description: post?.caption,
      images: [
        {
          url: post?.media_url, 
          width: 1200,
          height: 630,
        },
      ],
    },
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