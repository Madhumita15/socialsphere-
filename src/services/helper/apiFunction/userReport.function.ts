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
};
