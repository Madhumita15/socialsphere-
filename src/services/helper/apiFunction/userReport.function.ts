import { supabase } from "@/lib/supabaseClient";
import { ReportNewDataType } from "@/typescript/type/userReport.type";

export const userReport = async (data: ReportNewDataType) => {
  const { data: insertData, error: insertError } = await supabase
    .from("reports")
    .insert({
      reporter_id: data.userId,
      target_post_id: data.postId,
      description: data.description,
      category: data.category,
      target_type: data.report_type,
    })
    .select("*");
    if (insertError) throw insertError;
  console.log("insertData", insertData);
  console.log("Attempting to increment post with ID:", data.postId);

    const {data:newCount, error:rpcError} = await supabase.rpc("increment_report_count", {target_id: data.postId})
    if(rpcError) return rpcError
    console.log("newCount", newCount)
    return newCount


  
};

export const getModeratorReport = async () => {
  const { data, error } = await supabase.from("reports")
    .select(`*, reporter:profile!reports_reporter_id_fkey(fullname, username, avatar_url), target_post:posts(id,
          caption,
          media_url,
          media_type,
          hashtags,
          location,
          created_at,
          visibility,
          is_pinned,
          trending_score,
          user_id)`).order("created_at", {ascending: false});
  if (error) throw error;
  return data;
};



export const getModeratorReportById = async (id: string) => {
  const { data, error } = await supabase
    .from("reports")
    .select(
      `*, reporter:profile!reports_reporter_id_fkey(fullname, username, avatar_url), target_post:posts(id,
          caption,
          media_url,
          media_type,
          hashtags,
          location,
          created_at,
          visibility,
          is_pinned,
          trending_score,
          user_id)`,
    )
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  console.log("data", data);
  return data;
};




export const resolveModeratorReports = async ({id, postId}:{id: string, postId:string}) => {
  const { data, error } = await supabase
    .from("reports")
    .update({
      status: "resolved",
    })
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  console.log(data);

  const { data: newCount } = await supabase.rpc('decrement_report_count', { 
    target_id: postId 
  });
  return {data, newCount};
};


export const removeModeratorReports = async ({report_id, post_id}: {report_id: string, post_id: string})=>{
  console.log("report", report_id, post_id)
  const {data:postData, error:postError} = await supabase.from("posts").update({
    is_deleted: true
  }).eq("id", post_id).maybeSingle()
  if(postError) throw postError
  console.log("postData", postData)

  const {data: reportData,error: reportError} = await supabase.from("reports").update({
    status: "take_action"
  }).eq("id", report_id).maybeSingle()

  if(reportError) throw postError
  console.log(reportData)
  return {postData , reportData}


}


export const getReportTrends = async () => {
  const { data, error } = await supabase
    .from("report_trends_monthly")
    .select("*");
    
  if (error) throw error;
  return data;
};