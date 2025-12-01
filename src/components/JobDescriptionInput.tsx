import { useState } from "react";
import { Briefcase, Clipboard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  isDisabled: boolean;
}

const JobDescriptionInput = ({ value, onChange, isDisabled }: JobDescriptionInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (err) {
      console.error("Failed to read clipboard");
    }
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const hasContent = value.trim().length > 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <Briefcase className="h-4 w-4 text-accent-foreground" />
          </div>
          <span className="font-medium">Job Description</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePaste}
          disabled={isDisabled}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <Clipboard className="h-4 w-4" />
          Paste
        </Button>
      </div>
      
      <div className={cn(
        "relative rounded-xl border-2 transition-all duration-200",
        isFocused ? "border-primary ring-4 ring-primary/10" : "border-border",
        hasContent && !isFocused && "border-success/30 bg-success/5"
      )}>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isDisabled}
          placeholder="Paste the job description here... Include requirements, responsibilities, and qualifications for the best analysis."
          className="min-h-[200px] resize-none border-0 bg-transparent p-4 focus-visible:ring-0"
        />
        
        <div className="flex items-center justify-between border-t border-border/50 px-4 py-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {hasContent && (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                <span>{wordCount} words</span>
              </>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            Tip: Include full job posting for best results
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionInput;
