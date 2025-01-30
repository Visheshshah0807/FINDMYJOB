import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company: companies(name, logo_URL), saved: saved_jobs(id)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error Fecting Jobs", error);
    return null;
  }

  return data;
}

// saved_Jobs api are here ----------------------------------------------------------------------------------------//

export async function saveJob(token, { alreadySaved }, saveData) {
  try {
    const supabase = await supabaseClient(token);
    if (!supabase) throw new Error("Supabase client initialization failed");

    if (alreadySaved) {
      const { data, error: deleteError } = await supabase
        .from("saved_jobs")
        .delete()
        .eq("job_id", saveData.job_id);

      if (deleteError) {
        console.error("Error Deleting Saved Jobs", deleteError);
        return null;
      }
      return data;
    } else {
      const { data, error: insertError } = await supabase
        .from("saved_jobs")
        .insert([saveData])
        .select();

      if (insertError) {
        console.error("Error Inserting Saved Jobs", insertError);
        return null;
      }
      return data;
    }
  } catch (error) {
    console.error("Error in saveJob function:", error);
    return null;
  }
}

// Jobs api are here --------------------------------------------------------//
export async function getSingleJob(token, { job_id }) {
  try {
    const supabase = await supabaseClient(token);
    if (!supabase) throw new Error("Supabase client initialization failed");

    const { data, error } = await supabase
      .from("jobs")
      .select(
        "*, company: companies(name, logo_URL), applications: applications(*)"
      )
      .eq("id", job_id)
      .single();

    if (error) {
      console.error("Error Fetching Jobs", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error in Fetching Jobs:", error);
    return null;
  }
}

// updating hiring status ------------------------------------------------------------------//

export async function updateHiringStatus(token, { job_id }, isOpen) {
  try {
    const supabase = await supabaseClient(token);
    if (!supabase) throw new Error("Supabase client initialization failed");

    const { data, error } = await supabase
      .from("jobs")
      .update({ isOpen })
      .eq("id", job_id)
      .select();

    if (error) {
      console.error("Error in Updating Jobs", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error in Updating Jobs:", error);
    return null;
  }
}

// creating the New Jobs ---------------------------------------------------------------------------//

export async function addNewJob(token, _, jobData) {
  try {
    const supabase = await supabaseClient(token);
    if (!supabase) throw new Error("Supabase client initialization failed");

    const { data, error } = await supabase
      .from("jobs")
      .insert([jobData])
      .select();

    if (error) {
      console.error("Error in Updating Jobs", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error in Updating Jobs:", error);
    return null;
  }
}
