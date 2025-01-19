import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import { useSession, useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import React from "react";
import { BarLoader } from "react-spinners";

const Joblisting = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [company_id, setCompanyId] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isLoaded } = useUser();
  const { session } = useSession();

  const fetchJobs = async () => {
    if (!session) return;

    setLoading(true);
    setError(null);

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

      const data = await getJobs(supabaseAccessToken, {
        location,
        company_id,
        searchQuery,
      });
      setJobs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) fetchJobs();
  }, [session, isLoaded, location, company_id, searchQuery]); // Re-fetch jobs when filters change

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#ffffff" />;
  }

  return (
    <div>
      <h1 className="text-4xl text-center sm:text-5xl xl:text-7xl lg:text-8xl font-extrabold gradient-title py-5">
        Latest Jobs
      </h1>

      {/* add filters init */}

      {loading && <BarLoader className="mb-4" width={"100%"} color="#ffffff" />}

      {loading === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return <JobCard key={job.id} job={job} />;
            })
          ) : (
            <div>No jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Joblisting;
