import { RefreshCw, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MatchScoreCard from "./MatchScoreCard";
import SkillGapAnalysis from "./SkillGapAnalysis";
import InterviewPrepCard from "./InterviewPrepCard";
import ResourcesCard from "./ResourcesCard";
import type { AnalysisState } from "@/types/career";

interface ResultsDashboardProps {
  state: AnalysisState;
  onReset: () => void;
}

const ResultsDashboard = ({ state, onReset }: ResultsDashboardProps) => {
  const { matchResult, interviewPlan, resources } = state;

  if (!matchResult || !interviewPlan || !resources) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">Your Analysis Results</h2>
            <p className="text-muted-foreground">Personalized insights based on your profile</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="secondary" size="sm" onClick={onReset} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              New Analysis
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
              <MatchScoreCard result={matchResult} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <SkillGapAnalysis gaps={matchResult.skillGapAnalysis} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <InterviewPrepCard plan={interviewPlan} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <ResourcesCard resources={resources} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsDashboard;
