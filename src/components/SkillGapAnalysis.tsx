import { ArrowUp, Clock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SkillGap } from "@/types/career";

interface SkillGapAnalysisProps {
  gaps: SkillGap[];
}

const SkillGapAnalysis = ({ gaps }: SkillGapAnalysisProps) => {
  const getPriorityColor = (priority: SkillGap['priority']) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'medium': return 'bg-warning/10 text-warning border-warning/30';
      case 'low': return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityLabel = (priority: SkillGap['priority']) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Nice to Have';
    }
  };

  const sortedGaps = [...gaps].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-warning/20 to-warning/5">
            <Target className="h-5 w-5 text-warning" />
          </div>
          <div>
            <CardTitle>Skill Gap Analysis</CardTitle>
            <CardDescription>Prioritized learning roadmap</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {sortedGaps.map((gap, index) => (
          <div
            key={gap.skill}
            className={cn(
              "rounded-xl border p-4 transition-all hover:shadow-md",
              getPriorityColor(gap.priority)
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <ArrowUp className={cn(
                  "h-4 w-4",
                  gap.priority === 'high' && "text-destructive",
                  gap.priority === 'medium' && "text-warning",
                  gap.priority === 'low' && "text-muted-foreground"
                )} />
                <h4 className="font-semibold">{gap.skill}</h4>
              </div>
              <Badge variant="outline" className="text-xs">
                {getPriorityLabel(gap.priority)}
              </Badge>
            </div>
            
            <p className="mb-3 text-sm opacity-80">{gap.reason}</p>
            
            <div className="flex items-center gap-2 text-xs opacity-70">
              <Clock className="h-3.5 w-3.5" />
              <span>Est. {gap.estimatedLearningTime}</span>
            </div>
          </div>
        ))}

        {gaps.length === 0 && (
          <div className="rounded-xl bg-success/10 p-6 text-center">
            <p className="font-medium text-success">Great news! No significant skill gaps identified.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillGapAnalysis;
