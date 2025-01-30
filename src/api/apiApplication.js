import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
  try {
    const supabase = await supabaseClient(token);
    if (!supabase) throw new Error("Supabase client initialization failed");

    const random = Math.floor(Math.random() * 90000);
    const filename = `resume-${random}-${jobData.candidate_id}`;

    const { error: storageError } = await supabase.storage
      .from("resume")
      .upload(filename, jobData.resume);

    if (storageError) {
      console.error("Error Uploading Resume:", storageError);
      return null;
    }

    const resume = `${supabaseUrl}/storage/v1/object/public/resume/${filename}`;

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

// updateding the job applications -----------------------------------------------------//

export async function updateApplicationStatus(token, { job_id }, status) {
  try {
    const supabase = await supabaseClient(token);
    if (!supabase) throw new Error("Supabase client initialization failed");

    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("job_id", job_id)
      .select();

    if (error || data.length === 0) {
      console.error("Error Updating Application Status:", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error Updating Application Status:", error);
    return null;
  }
}
