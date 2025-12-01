import { useState } from "react";
import { Rocket, ArrowRight, FileText, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FileUpload from "./FileUpload";
import JobDescriptionInput from "./JobDescriptionInput";

interface AnalysisFormProps {
  onAnalyze: (resumeFile: File, jobDescription: string) => void;
  isProcessing: boolean;
}

const AnalysisForm = ({ onAnalyze, isProcessing }: AnalysisFormProps) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const canSubmit = resumeFile && jobDescription.trim().length > 50 && !isProcessing;

  const handleSubmit = () => {
    if (resumeFile && jobDescription) {
      onAnalyze(resumeFile, jobDescription);
    }
  };

  return (
    <section className="py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Start Your Analysis
            </h2>
            <p className="mt-2 text-muted-foreground">
              Upload your resume and paste the job description to get personalized insights
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Resume Upload */}
            <Card variant="glass">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Resume</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFileSelect={setResumeFile}
                  isProcessing={isProcessing}
                  uploadedFile={resumeFile}
                  onClear={() => setResumeFile(null)}
                />
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card variant="glass">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Job Description</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <JobDescriptionInput
                  value={jobDescription}
                  onChange={setJobDescription}
                  isDisabled={isProcessing}
                />
              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <Button
              variant="hero"
              size="xl"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="group min-w-[280px]"
            >
              {isProcessing ? (
                <>
                  <span className="animate-pulse">Analyzing...</span>
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-5 w-5" />
                  Analyze Match
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </div>

          {!canSubmit && !isProcessing && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {!resumeFile && "Upload your resume • "}
              {!jobDescription.trim() && "Paste job description • "}
              {jobDescription.trim().length > 0 && jobDescription.trim().length <= 50 && "Add more job details"}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnalysisForm;
