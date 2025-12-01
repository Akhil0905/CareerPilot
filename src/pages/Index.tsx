import { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AnalysisForm from "@/components/AnalysisForm";
import AnalysisProgress from "@/components/AnalysisProgress";
import ResultsDashboard from "@/components/ResultsDashboard";
import { useCareerAnalysis } from "@/hooks/useCareerAnalysis";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const { state, analyze, reset, isAnalyzing, isComplete } = useCareerAnalysis();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnalyze = (resumeFile: File, jobDescription: string) => {
    analyze(resumeFile, jobDescription);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {!isComplete && (
        <HeroSection onGetStarted={scrollToForm} />
      )}

      <div ref={formRef}>
        {!isAnalyzing && !isComplete && (
          <AnalysisForm onAnalyze={handleAnalyze} isProcessing={false} />
        )}

        {isAnalyzing && (
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-lg">
                <AnalysisProgress
                  step={state.step}
                  progress={state.progress}
                  currentTask={state.currentTask}
                />
              </div>
            </div>
          </section>
        )}

        {isComplete && (
          <ResultsDashboard state={state} onReset={reset} />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            CareerPilot — Your AI Copilot for Career Success
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
