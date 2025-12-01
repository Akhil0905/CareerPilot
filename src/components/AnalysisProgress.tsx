import { Loader2, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface AnalysisProgressProps {
  step: string;
  progress: number;
  currentTask: string;
}

const steps = [
  { key: 'parsing', label: 'Parsing Documents' },
  { key: 'analyzing', label: 'Analyzing Skills' },
  { key: 'generating', label: 'Generating Insights' },
];

const AnalysisProgress = ({ step, progress, currentTask }: AnalysisProgressProps) => {
  const currentStepIndex = steps.findIndex(s => s.key === step);

  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-card">
      <div className="mb-6 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
        <h3 className="font-display text-xl font-semibold">Analyzing Your Profile</h3>
        <p className="mt-1 text-sm text-muted-foreground">{currentTask}</p>
      </div>

      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-4">
        {steps.map((s, index) => {
          const isComplete = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isPending = index > currentStepIndex;

          return (
            <div
              key={s.key}
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 transition-all",
                isCurrent && "bg-primary/5",
                isComplete && "opacity-60"
              )}
            >
              {isComplete && (
                <CheckCircle2 className="h-5 w-5 text-success" />
              )}
              {isCurrent && (
                <Loader2 className="h-5 w-5 text-primary animate-spin" />
              )}
              {isPending && (
                <Circle className="h-5 w-5 text-muted-foreground/30" />
              )}
              <span className={cn(
                "font-medium",
                isPending && "text-muted-foreground"
              )}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisProgress;
