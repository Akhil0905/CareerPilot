import { useState, useCallback } from "react";
import { Upload, FileText, X, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  uploadedFile: File | null;
  onClear: () => void;
}

const FileUpload = ({ onFileSelect, isProcessing, uploadedFile, onClear }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  if (uploadedFile) {
    return (
      <div className="rounded-xl border-2 border-success/30 bg-success/5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              {isProcessing ? (
                <Loader2 className="h-6 w-6 text-success animate-spin" />
              ) : (
                <CheckCircle2 className="h-6 w-6 text-success" />
              )}
            </div>
            <div>
              <p className="font-semibold text-foreground">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {isProcessing ? "Processing..." : "Ready for analysis"}
              </p>
            </div>
          </div>
          {!isProcessing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClear}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50 hover:bg-accent/30"
      )}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileInput}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
      
      <div className="flex flex-col items-center gap-4">
        <div className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl transition-all",
          isDragging
            ? "bg-primary/20 scale-110"
            : "bg-accent"
        )}>
          {isDragging ? (
            <FileText className="h-8 w-8 text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        
        <div>
          <p className="font-semibold text-foreground">
            {isDragging ? "Drop your resume here" : "Upload your resume"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Drag and drop or click to browse • PDF only
          </p>
        </div>
        
        <Button variant="outline" size="sm" className="pointer-events-none">
          Choose File
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
