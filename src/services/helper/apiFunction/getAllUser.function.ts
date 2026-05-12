import { supabase } from "@/lib/supabaseClient";

export const getAllUser = async ({page, limit}: {page: number, limit: number}) => {
  const from = page * limit;
  const to = from + limit - 1;
  const { data: allUserData, error: allUserError, count } = await supabase
    .from("profile")
    .select("*", {count: "exact"}).neq("role", "admin")
    .order("created_at", { ascending: false }).range(from, to);
  if (allUserError) throw allUserError;
  console.log(allUserData);
  return {allUserData, count};
};


export const toggleBlockUnblock = async ({userId, newStatus}:{userId: string, newStatus: "active" | "blocked"})=>{
  // console.log("newstatys", newStatus)
  // console.log("toggle user id", userId)
    const {data, error} = await supabase.from("profile").update({
        "status": newStatus
    }).eq("id", userId).select()
    if(error) throw error
    console.log("data", data)
    return data
}



export const updateUser = async ({userId, newChange}: {userId: string, newChange: string})=>{
  const {data, error} = await supabase.from("profile").update({
        "role": newChange
    }).eq("id", userId).select()
    if(error) throw error
    return data

}
