export interface ResumeData {
  rawText: string;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
}

export interface JobDescription {
  rawText: string;
  title: string;
  company: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  qualifications: string[];
}

export interface MatchResult {
  overallScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  partialMatches: {
    skill: string;
    matchedTo: string;
    confidence: number;
  }[];
  skillGapAnalysis: SkillGap[];
  strengthsHighlighted: string[];
}

export interface SkillGap {
  skill: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  estimatedLearningTime: string;
}

export interface InterviewPrepPlan {
  overview: string;
  behavioralQuestions: InterviewQuestion[];
  technicalQuestions: InterviewQuestion[];
  starExamples: StarExample[];
  tipsAndStrategies: string[];
  roleSpecificAdvice: string;
}

export interface InterviewQuestion {
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  suggestedApproach: string;
  sampleAnswer?: string;
}

export interface StarExample {
  situation: string;
  task: string;
  action: string;
  result: string;
  relevantSkill: string;
}

export interface LearningResource {
  skill: string;
  resources: ResourceItem[];
}

export interface ResourceItem {
  title: string;
  url: string;
  type: 'video' | 'article' | 'course' | 'documentation';
  source: string;
  duration?: string;
  description: string;
}

export interface AnalysisState {
  step: 'idle' | 'uploading' | 'parsing' | 'analyzing' | 'generating' | 'complete' | 'error';
  progress: number;
  currentTask: string;
  resumeData: ResumeData | null;
  jobDescription: JobDescription | null;
  matchResult: MatchResult | null;
  interviewPlan: InterviewPrepPlan | null;
  resources: LearningResource[] | null;
  error: string | null;
}
