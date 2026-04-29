"use client"
import { ReelsVideo } from "@/components/ReelsVideo"


const Reels = () => {
 const MOCK_REELS = [
  {
    id: '1',
    username: '@user_one',
    caption: 'Amazing sunset at the beach today! 🌅 Nature is beautiful',
    likes: 1245,
    comments: 87,
  },
  {
    id: '2',
    username: '@travel_lover',
    caption: 'Exploring the ancient temples of Southeast Asia',
    likes: 3421,
    comments: 234,
  },
  {
    id: '3',
    username: '@food_blogger',
    caption: 'Making homemade pasta from scratch - so worth it!',
    likes: 892,
    comments: 45,
  },
  {
    id: '4',
    username: '@fitness_coach',
    caption: 'Morning workout motivation! Let\'s crush our goals today 💪',
    likes: 2156,
    comments: 156,
  },
  {
    id: '5',
    username: '@music_vibes',
    caption: 'New music production setup is finally complete!',
    likes: 654,
    comments: 32,
  },
]
  return (
    <>
   <main className="h-screen isolate relative  w-full overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide">
      {/* Hide scrollbar */}
      {MOCK_REELS.map((reel) => (
        <div key={reel.id} className="snap-start h-screen">
          <ReelsVideo
            id={reel.id}
            username={reel.username}
            caption={reel.caption}
            likes={reel.likes}
            comments={reel.comments}
          />
        </div>
      ))}
      <div className="h-20 md:hidden" />
    </main>
    </>
  )
}

export default Reels