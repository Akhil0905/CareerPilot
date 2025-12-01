import { ArrowRight, FileText, Target, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-hero py-20 lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10" />
      
      {/* Gradient orbs */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground/90 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>Your AI Career Copilot</span>
          </div>
          
          {/* Headline */}
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Land Your Dream Job with{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/30 to-cyan-400/30 blur-sm" />
            </span>{" "}
            Precision
          </h1>
          
          {/* Subheadline */}
          <p className="mb-10 text-lg text-primary-foreground/70 sm:text-xl">
            Upload your resume, paste a job description, and let CareerPilot analyze your match,
            identify skill gaps, and create a personalized interview prep strategy.
          </p>
          
          {/* CTA */}
          <Button
            variant="hero"
            size="xl"
            onClick={onGetStarted}
            className="group"
          >
            Analyze Your Resume
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          {/* Features */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: FileText,
                title: "ATS Match Score",
                description: "Get your resume analyzed against job requirements",
              },
              {
                icon: Target,
                title: "Skill Gap Analysis",
                description: "Identify missing skills and get upskilling priorities",
              },
              {
                icon: BookOpen,
                title: "Interview Prep",
                description: "Personalized questions and STAR method coaching",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-primary-foreground/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-cyan-500/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-primary-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-primary-foreground/60">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
