import { Rocket, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-cyan-500 opacity-30 blur-sm" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-cyan-500">
              <Rocket className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight">
              Career<span className="text-gradient">Pilot</span>
            </h1>
            <p className="text-xs text-muted-foreground">AI Job Match & Interview Coach</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-accent/50 px-3 py-1.5 text-xs font-medium text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
