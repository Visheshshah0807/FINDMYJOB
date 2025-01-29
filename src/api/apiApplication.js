import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
  try {
    const supabase = await supabaseClient(token);
    if (!supabase) throw new Error("Supabase client initialization failed");

    const random = Math.floor(Math.random() * 90000);
    const filename = `resume-${random}-${jobData.candidate_id}`;

    const { error: storageError } = await supabase.storage
      .from("resumes")
      .upload(filename, jobData.resume);

    if (storageError) {
      console.error("Error Uploading Resume:", storageError);
      return null;
    }

    const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${filename}`;

    const { data, error } = await supabase
      .from("applications")
      .insert([
        {
          ...jobData,
          resume,
        },
      ])
      .select();

    if (error) {
      console.error("Error Submiting Applications:", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error in Submiting Applications:", error);
    return null;
  }
}
