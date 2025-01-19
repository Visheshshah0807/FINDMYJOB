import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { LoaderCircleIcon } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "Recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        navigate(role === "Recruiter" ? "/post-job" : "/jobs");
      })
      .catch((err) => {
        console.error("Error updating role", err);
      });
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#ffffff" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h2 className="text-7xl sm:text-8xl font-extrabold tracking-tighter">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          size="xl"
          className="text-2xl font-bold"
          onClick={() => handleRoleSelection("Candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          size="xl"
          className="text-2xl font-bold"
          onClick={() => handleRoleSelection("Recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
