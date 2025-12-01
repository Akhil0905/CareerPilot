import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { MatchResult } from "@/types/career";

interface MatchScoreCardProps {
  result: MatchResult;
}

const MatchScoreCard = ({ result }: MatchScoreCardProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const score = result.overallScore;

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const getScoreColor = () => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreGradient = () => {
    if (score >= 80) return "from-success/20 to-success/5";
    if (score >= 60) return "from-warning/20 to-warning/5";
    return "from-destructive/20 to-destructive/5";
  };

  const getScoreRing = () => {
    if (score >= 80) return "border-success";
    if (score >= 60) return "border-warning";
    return "border-destructive";
  };

  const getScoreIcon = () => {
    if (score >= 80) return <TrendingUp className="h-5 w-5 text-success" />;
    if (score >= 60) return <Minus className="h-5 w-5 text-warning" />;
    return <TrendingDown className="h-5 w-5 text-destructive" />;
  };

  const getScoreMessage = () => {
    if (score >= 80) return "Excellent match! You're a strong candidate.";
    if (score >= 60) return "Good match with room for improvement.";
    return "Consider upskilling before applying.";
  };

  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className={cn("bg-gradient-to-b p-1", getScoreGradient())}>
        <CardHeader className="bg-card rounded-t-lg pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">ATS Match Score</CardTitle>
              <CardDescription>How well your resume matches this role</CardDescription>
            </div>
            {getScoreIcon()}
          </div>
        </CardHeader>
      </div>
      
      <CardContent className="pt-6">
        {/* Score Circle */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className={cn(
              "flex h-36 w-36 items-center justify-center rounded-full border-8 bg-background",
              getScoreRing()
            )}>
              <div className="text-center">
                <span className={cn("font-display text-5xl font-bold", getScoreColor())}>
                  {animatedScore}
                </span>
                <span className={cn("text-2xl font-semibold", getScoreColor())}>%</span>
              </div>
            </div>
            <div className="absolute -inset-2 -z-10 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-xl" />
          </div>
        </div>
        
        <p className="mb-6 text-center text-muted-foreground">{getScoreMessage()}</p>

        {/* Matched Skills */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="font-semibold">Matched Skills ({result.matchedSkills.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.matchedSkills.slice(0, 8).map((skill) => (
              <Badge key={skill} variant="default" className="bg-success/10 text-success hover:bg-success/20">
                {skill}
              </Badge>
            ))}
            {result.matchedSkills.length > 8 && (
              <Badge variant="outline">+{result.matchedSkills.length - 8} more</Badge>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <XCircle className="h-4 w-4 text-destructive" />
            <span className="font-semibold">Missing Skills ({result.missingSkills.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.missingSkills.slice(0, 6).map((skill) => (
              <Badge key={skill} variant="default" className="bg-destructive/10 text-destructive hover:bg-destructive/20">
                {skill}
              </Badge>
            ))}
            {result.missingSkills.length > 6 && (
              <Badge variant="outline">+{result.missingSkills.length - 6} more</Badge>
            )}
          </div>
        </div>

        {/* Strengths */}
        {result.strengthsHighlighted.length > 0 && (
          <div className="rounded-lg bg-accent/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-accent-foreground" />
              <span className="font-semibold text-accent-foreground">Strengths to Highlight</span>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {result.strengthsHighlighted.slice(0, 3).map((strength, index) => (
                <li key={index}>• {strength}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchScoreCard;
