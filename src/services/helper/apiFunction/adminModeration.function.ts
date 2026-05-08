import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";


export const allPostWithoutPagination = async ()=>{
    const {data, error} = await supabase.from("posts").select("*")
    if(error) throw error
    return data
}

export const getAllAdminPost = async ({
  page,
  limit,
  search,
  signal
}: {
  page: number;
  limit: number;
  search?: string;
  signal: AbortSignal;
}) => {
  const from = page * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("posts")
    .select("*, author:profile(fullname, username, avatar_url)", {count: "exact"})
    .order("created_at", { ascending: false })
    .range(from, to).abortSignal(signal)

    if(search && search.trim() !== ""){
        query = query.ilike('caption', `%${search}%`)
    }
  const {
    data: allPostData,
    error: allPostError,
    count,
  } = await query
  if (allPostError) throw allPostError;
  console.log("allPostData", allPostData);
  return { allPostData, count };
};


export const postAction = async({post_id, action, currentValue}: {post_id: string, action: "TOGGLE_PIN" | "BOOST_SCORE" | "REMOVE_POST", currentValue?: boolean | number})=>{
    let updateValue = {};
    switch(action){
        case "TOGGLE_PIN":
         updateValue = {is_pinned: !currentValue as boolean}
         toast.success("Successfully change post pinned!")
         break;

        case "BOOST_SCORE":
            updateValue = {trending_score: (currentValue as number + 1)} 
            toast.success("Successfully update trending score!")
            break;
        case "REMOVE_POST":
            toast.success("Successfully hide harmfull post!")
            updateValue = {visibility: "hidden", is_deleted: true}
            
            break
        default:
            break;        
    }

    const {data, error} = await supabase.from("posts").update(updateValue).select().eq("id", post_id)
    if(error) throw error
    console.log("data", data)

    
}
