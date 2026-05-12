import { supabase } from "@/lib/supabaseClient"
import { useQuery } from "@tanstack/react-query"


export const usePostUsersStats = ()=>{
    return useQuery({
        queryKey: ["user-post-stats"],
        queryFn: async()=>{
            const [users, posts] = await Promise.all([
                supabase.from("profile").select("*", {count: "exact", head: true}),
                supabase.from("posts").select("*", {count: "exact", head: true})
            ])
            return {
                totalUsers: users.count || 0,
                totalPosts: posts.count || 0
            }
        },
        refetchInterval: 1000* 60
    })
}


export const useEngagementState = ()=>{ //engagement means total like + comment + save post, means action of users performs to post
    return useQuery({
        queryKey: ["engagement"],
        queryFn: async()=>{
            const [likes, bookmark] = await Promise.all([
                supabase.from("likes").select("*", {count: "exact", head: true}),
                supabase.from("bookmark").select("*", {count: "exact", head: true})
            ])
            return {
                totalEngagement: (likes.count || 0) + (bookmark.count || 0)
            }
        },
        refetchInterval: 1000 * 60
    })
}


export const useRecentSignUps = ()=>{ // recentusers 
    return useQuery({
        queryKey: ["recent-signups"],
        queryFn: async()=>{
            const {data:recentData, error:recentError} = await supabase.from("profile").select("*").neq("role", "admin").order("created_at", {ascending: false}).limit(5)
            if(recentError) throw recentError
            return recentData
        }
    })

}


export const useUserGrowthRate = ()=>{ // previos month users vs cuurent users  growth rate, 30 days ago users and recent users growth rate
    return useQuery({
        queryKey: ["growth-rate"],
        queryFn: async ()=>{
            const thirtyDaysAgo = new Date()
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate()- 30)
            const [currentUser, previousUser] = await Promise.all([
                supabase.from("profile").select("*", {count: "exact", head: true}),
                supabase.from("profile").select("*", {count: "exact", head: true}).lt("created_at", thirtyDaysAgo)
            ])

          const totalCurrentUser = currentUser.count || 0
          const totalPreviousUser = previousUser.count || 0
          console.log("user", totalCurrentUser, totalPreviousUser)
          const growthRate = totalPreviousUser === 0 ? 0 : ((totalCurrentUser - totalPreviousUser)/totalPreviousUser * 100)
          return growthRate
          
        }
    })
}


export const useUserGrowth = () => {
  return useQuery({
    queryKey: ["user-growth"],
    queryFn: async () => {
      // .rpc() calls the function you just created in the database
      const { data, error } = await supabase.rpc('get_user_growth');
      
      if (error) {
        console.error("Error fetching growth data:", error);
        throw error;
      }
      
      return data; 
    }
  });
};


export const useSimpleTrending = () => {
  return useQuery({
    queryKey: ["simple-trending"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_simple_trending_hashtags');
      if (error) throw error;
      return data;
    }
  });
};