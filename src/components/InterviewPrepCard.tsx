import { useState } from "react";
import { MessageSquare, Lightbulb, ChevronDown, ChevronUp, Star, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { InterviewPrepPlan, InterviewQuestion, StarExample } from "@/types/career";

interface InterviewPrepCardProps {
  plan: InterviewPrepPlan;
}

const QuestionCard = ({ question, index }: { question: InterviewQuestion; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: InterviewQuestion['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/10 text-success';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'hard': return 'bg-destructive/10 text-destructive';
    }
  };

  return (
    <div className="rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {index + 1}
            </span>
            <Badge variant="outline" className="text-xs">
              {question.category}
            </Badge>
            <Badge className={cn("text-xs", getDifficultyColor(question.difficulty))}>
              {question.difficulty}
            </Badge>
          </div>
          <p className="font-medium">{question.question}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="shrink-0"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 rounded-lg bg-accent/50 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-accent-foreground">
            <Lightbulb className="h-4 w-4" />
            Suggested Approach
          </div>
          <p className="text-sm text-muted-foreground">{question.suggestedApproach}</p>
          {question.sampleAnswer && (
            <div className="mt-3 border-t border-border/50 pt-3">
              <div className="mb-1 text-xs font-medium text-muted-foreground">Sample Answer</div>
              <p className="text-sm italic text-muted-foreground">{question.sampleAnswer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const StarCard = ({ example }: { example: StarExample }) => {
  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-5">
      <div className="mb-4 flex items-center gap-2">
        <Star className="h-5 w-5 text-warning" />
        <Badge variant="outline">{example.relevantSkill}</Badge>
      </div>
      
      <div className="space-y-4">
        {[
          { label: 'Situation', content: example.situation, color: 'text-primary' },
          { label: 'Task', content: example.task, color: 'text-warning' },
          { label: 'Action', content: example.action, color: 'text-success' },
          { label: 'Result', content: example.result, color: 'text-accent-foreground' },
        ].map((item) => (
          <div key={item.label}>
            <span className={cn("text-sm font-semibold", item.color)}>
              {item.label}:
            </span>
            <p className="mt-1 text-sm text-muted-foreground">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const InterviewPrepCard = ({ plan }: InterviewPrepCardProps) => {
  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-cyan-500/10">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Interview Prep Plan</CardTitle>
            <CardDescription>Personalized questions and coaching</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Overview */}
        <div className="mb-6 rounded-lg bg-accent/30 p-4">
          <p className="text-sm text-muted-foreground">{plan.overview}</p>
        </div>

        <Tabs defaultValue="behavioral" className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="star">STAR Examples</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="behavioral" className="space-y-3">
            {plan.behavioralQuestions.map((q, i) => (
              <QuestionCard key={i} question={q} index={i} />
            ))}
          </TabsContent>
          
          <TabsContent value="technical" className="space-y-3">
            {plan.technicalQuestions.map((q, i) => (
              <QuestionCard key={i} question={q} index={i} />
            ))}
          </TabsContent>
          
          <TabsContent value="star" className="space-y-4">
            {plan.starExamples.map((example, i) => (
              <StarCard key={i} example={example} />
            ))}
          </TabsContent>
          
          <TabsContent value="tips">
            <div className="space-y-3">
              {plan.tipsAndStrategies.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <p className="text-sm">{tip}</p>
                </div>
              ))}
              
              {plan.roleSpecificAdvice && (
                <div className="mt-4 rounded-xl bg-primary/5 p-5">
                  <h4 className="mb-2 font-semibold">Role-Specific Advice</h4>
                  <p className="text-sm text-muted-foreground">{plan.roleSpecificAdvice}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InterviewPrepCard;
