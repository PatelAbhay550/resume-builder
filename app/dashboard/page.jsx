"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ResumeForm from "@/components/resume";

const DashboardPage = () => {
  const [isCreatingResume, setIsCreatingResume] = useState(false);

  return (
    <div className="p-6 space-y-8 w-full  flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Welcome to Resume Builder!
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create a professional resume tailored to your needs. For free!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="default"
              className="bg-primary  text-white transition-all duration-200"
              onClick={() => setIsCreatingResume(true)}
            >
              Create New Resume
            </Button>
            
          </div>
        </CardContent>
      </Card>

      {isCreatingResume &&(<div className="p-6 bg-zinc-800 rounded-lg shadow-md">
          <ResumeForm />
        </div>)}
    </div>
  );
};

export default DashboardPage;
