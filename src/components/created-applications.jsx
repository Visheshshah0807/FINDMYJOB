import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./application-card";

const CreatedApplications = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    data: applications = [], // Ensure applications is always an array
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user?.id, // Ensure user is not null before accessing id
  });

  useEffect(() => {
    if (user?.id) fnApplications();
  }, [user?.id]); // Add user?.id as dependency to avoid unnecessary calls

  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#ffffff" />;
  }

  return (
    <div className="flex flex-col gap-2">
      {applications.length > 0 ? (
        applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate
          />
        ))
      ) : (
        <p className="text-white">No applications found.</p> // Handle empty state
      )}
    </div>
  );
};

export default CreatedApplications;
