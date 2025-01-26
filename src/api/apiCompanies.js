import supabaseClient from "@/utils/supabase";

export async function getCompanies(token) {
  try {
    const supabase = await supabaseClient(token);
    if (!supabase) throw new Error("Supabase client initialization failed");

    const { data, error } = await supabase.from("companies").select("*");

    if (error) {
      console.error("Error Fetching Companies", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error in Fetching function:", error);
    return null;
  }
}
