import supabaseClient, { supabaseUrl } from "@/utils/supabase";

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

//Adding New Company name and logo -----------------------------------------------------------------------------//

export async function addNewCompany(token, _, companyData) {
  try {
    const supabase = await supabaseClient(token);
    if (!supabase) throw new Error("Supabase client initialization failed");

    const random = Math.floor(Math.random() * 90000);
    const filename = `logo-${random}-${companyData.name}`;

    const { error: storageError } = await supabase.storage
      .from("companies-logos")
      .upload(filename, companyData.logo);

    if (storageError) {
      console.error("Error Uploading Company:", storageError);
      return null;
    }

    const logo_URL = `${supabaseUrl}/storage/v1/object/public/companies-logos/${filename}`;

    const { data, error } = await supabase
      .from("companies")
      .insert([
        {
          name: companyData.name,
          logo_URL,
        },
      ])
      .select();

    if (error) {
      console.error("Error Submiting Company", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error Submiting Company", error);
    return null;
  }
}
