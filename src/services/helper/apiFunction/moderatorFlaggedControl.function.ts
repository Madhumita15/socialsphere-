import { supabase } from "@/lib/supabaseClient";

export const getModeratorFlaggedControl = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select(`*, author:profile(username, fullname, avatar_url), report:reports(id, category, status)`)
    .gte("report_count", 5)
    .eq("is_deleted", false)
    .order("report_count", { ascending: false });
  if (error) throw error;
  console.log(data);
  return data;
};


export const approveModeratorFlaggedControl = async(post_id: string)=>{
    const {data:approvePostData, error:approvePostError} = await supabase.from("posts").update({
        report_count: 0
    }).eq("id", post_id).maybeSingle()
    if(approvePostError) throw approvePostError
    const {error: rpcError} = await supabase.rpc("update_approve_post", {target_id: post_id})
    if(rpcError) throw rpcError
    return {approvePostData}

    

  
    
}


export const rejectModeratorFlaggedControl = async(post_id: string)=>{
    const {data:approvePostData, error:approvePostError} = await supabase.from("posts").update({
        is_deleted: true
    }).eq("id", post_id).maybeSingle()
    if(approvePostError) throw approvePostError
    const {error: rpcError} = await supabase.rpc("update_reject_error", {target_id: post_id})
    if(rpcError) throw rpcError

    

    return {approvePostData}


}
