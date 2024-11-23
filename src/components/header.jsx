import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center">
        <Link>
          <img src="/WFMJ.png" className="h-28" />
        </Link>
        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <Link to="/post-job">
              <Button variant="destructive" className="rounded-md font-bold">
                <PenBox />
                Post a Job
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-65">
          onClick = {handleOverlayClick},
          <SignIn
            signUpFallbackRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
