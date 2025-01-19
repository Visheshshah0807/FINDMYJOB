import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Trash2 } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import { MapPinIcon } from "lucide-react";
import { Link } from "lucide-react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const { user } = useUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}

          {!isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && (
            <img
              src={job.company.logo_URL}
              alt="Company Logo"
              className="h-8 w-auto sm:h-10 object-contain"
            />
          )}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={12} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center text-base font-medium"
          >
            More Details
          </Button>
        </Link>

        <Heart size={20} stroke="red" fill="red" className="cursor-pointer" />
      </CardFooter>
    </Card>
  );
};

export default JobCard;
