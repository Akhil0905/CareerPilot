import { useState, useCallback } from "react";
import type { AnalysisState, MatchResult, InterviewPrepPlan, LearningResource } from "@/types/career";

const initialState: AnalysisState = {
  step: 'idle',
  progress: 0,
  currentTask: '',
  resumeData: null,
  jobDescription: null,
  matchResult: null,
  interviewPlan: null,
  resources: null,
  error: null,
};

// Mock data for demonstration - will be replaced with actual AI analysis
const generateMockResults = (): { matchResult: MatchResult; interviewPlan: InterviewPrepPlan; resources: LearningResource[] } => {
  const matchResult: MatchResult = {
    overallScore: 72,
    matchedSkills: [
      "JavaScript", "React", "TypeScript", "Node.js", "Git", 
      "REST APIs", "Agile", "Problem Solving"
    ],
    missingSkills: [
      "AWS", "Docker", "Kubernetes", "GraphQL", "CI/CD"
    ],
    partialMatches: [
      { skill: "Cloud Services", matchedTo: "Basic AWS knowledge", confidence: 0.6 },
      { skill: "Containerization", matchedTo: "Docker basics", confidence: 0.4 },
    ],
    skillGapAnalysis: [
      {
        skill: "AWS",
        priority: "high",
        reason: "Required for cloud infrastructure management in this role",
        estimatedLearningTime: "2-3 weeks",
      },
      {
        skill: "Docker",
        priority: "high",
        reason: "Essential for containerized deployments mentioned in JD",
        estimatedLearningTime: "1-2 weeks",
      },
      {
        skill: "Kubernetes",
        priority: "medium",
        reason: "Used for orchestration in production environment",
        estimatedLearningTime: "3-4 weeks",
      },
      {
        skill: "GraphQL",
        priority: "medium",
        reason: "API layer technology used in current stack",
        estimatedLearningTime: "1 week",
      },
      {
        skill: "CI/CD",
        priority: "low",
        reason: "Nice to have for DevOps understanding",
        estimatedLearningTime: "1 week",
      },
    ],
    strengthsHighlighted: [
      "Strong React and TypeScript experience aligns with frontend requirements",
      "Node.js background supports full-stack development needs",
      "Agile methodology experience matches team workflow",
    ],
  };

  const interviewPlan: InterviewPrepPlan = {
    overview: "Based on your profile and the job requirements, focus on demonstrating your React expertise while showing eagerness to learn cloud technologies. Prepare examples that showcase problem-solving abilities and team collaboration.",
    behavioralQuestions: [
      {
        question: "Tell me about a challenging project where you had to learn a new technology quickly.",
        category: "Learning Agility",
        difficulty: "medium",
        suggestedApproach: "Use STAR method. Focus on a situation where you learned React/TypeScript. Emphasize the process, not just the outcome.",
        sampleAnswer: "At my previous company, we needed to migrate from Angular to React within 3 months...",
      },
      {
        question: "Describe a time when you disagreed with a team member about a technical approach.",
        category: "Collaboration",
        difficulty: "medium",
        suggestedApproach: "Show respect for different viewpoints. Explain how you reached a resolution that benefited the project.",
      },
      {
        question: "How do you handle tight deadlines while maintaining code quality?",
        category: "Time Management",
        difficulty: "easy",
        suggestedApproach: "Discuss prioritization, MVP thinking, and technical debt management.",
      },
    ],
    technicalQuestions: [
      {
        question: "Explain the React component lifecycle and how hooks changed it.",
        category: "React",
        difficulty: "medium",
        suggestedApproach: "Cover class lifecycle methods, then explain useEffect and how it consolidates mount/update/unmount logic.",
      },
      {
        question: "How would you optimize a slow React application?",
        category: "Performance",
        difficulty: "hard",
        suggestedApproach: "Discuss React.memo, useMemo, useCallback, code splitting, lazy loading, and profiling tools.",
      },
      {
        question: "Describe your experience with state management solutions.",
        category: "Architecture",
        difficulty: "medium",
        suggestedApproach: "Compare Redux, Context API, Zustand, or React Query. Explain when to use each.",
      },
    ],
    starExamples: [
      {
        situation: "Our e-commerce platform was experiencing slow page loads, causing a 15% cart abandonment rate.",
        task: "I was tasked with improving the product listing page performance.",
        action: "Implemented React.lazy for code splitting, added virtualization for long lists, and optimized image loading with lazy loading and WebP format.",
        result: "Reduced page load time by 60%, decreased cart abandonment by 8%, and improved Core Web Vitals scores.",
        relevantSkill: "React Performance Optimization",
      },
      {
        situation: "The team was struggling with inconsistent coding patterns across our TypeScript codebase.",
        task: "Lead the effort to establish coding standards and improve code quality.",
        action: "Set up ESLint with strict TypeScript rules, created custom hooks library, and led weekly code review sessions.",
        result: "Reduced bugs in production by 40% and improved PR review time by 50%.",
        relevantSkill: "TypeScript & Code Quality",
      },
    ],
    tipsAndStrategies: [
      "Research the company's tech blog and recent engineering posts to understand their technical challenges.",
      "Prepare questions about their cloud migration journey since AWS is a key requirement.",
      "Be honest about skill gaps but emphasize your learning ability with concrete examples.",
      "Practice explaining technical concepts simply - they may have non-technical stakeholders in interviews.",
      "Prepare a portfolio piece or side project that demonstrates React + TypeScript proficiency.",
    ],
    roleSpecificAdvice: "This role emphasizes full-stack development with a cloud-first approach. While your frontend skills are strong, be prepared to discuss your interest in DevOps practices. Consider doing a small AWS project before the interview to demonstrate initiative.",
  };

  const resources: LearningResource[] = [
    {
      skill: "AWS",
      resources: [
        {
          title: "AWS Certified Cloud Practitioner - Full Course",
          url: "https://youtube.com/watch?v=example1",
          type: "video",
          source: "freeCodeCamp",
          duration: "4 hours",
          description: "Comprehensive introduction to AWS services and cloud concepts.",
        },
        {
          title: "AWS Documentation - Getting Started",
          url: "https://docs.aws.amazon.com/getting-started/",
          type: "documentation",
          source: "AWS",
          description: "Official AWS documentation for beginners.",
        },
      ],
    },
    {
      skill: "Docker",
      resources: [
        {
          title: "Docker Tutorial for Beginners",
          url: "https://youtube.com/watch?v=example2",
          type: "video",
          source: "TechWorld with Nana",
          duration: "3 hours",
          description: "Learn Docker from scratch with practical examples.",
        },
        {
          title: "Docker for JavaScript Developers",
          url: "https://example.com/docker-js",
          type: "article",
          source: "Dev.to",
          description: "Docker setup specifically for Node.js applications.",
        },
      ],
    },
    {
      skill: "GraphQL",
      resources: [
        {
          title: "GraphQL Full Course",
          url: "https://youtube.com/watch?v=example3",
          type: "video",
          source: "The Net Ninja",
          duration: "2 hours",
          description: "Complete GraphQL tutorial with Apollo Client.",
        },
        {
          title: "GraphQL Official Documentation",
          url: "https://graphql.org/learn/",
          type: "documentation",
          source: "GraphQL Foundation",
          description: "Learn GraphQL fundamentals from the official source.",
        },
      ],
    },
  ];

  return { matchResult, interviewPlan, resources };
};

export const useCareerAnalysis = () => {
  const [state, setState] = useState<AnalysisState>(initialState);

  const updateProgress = (step: AnalysisState['step'], progress: number, currentTask: string) => {
    setState(prev => ({ ...prev, step, progress, currentTask }));
  };

  const analyze = useCallback(async (resumeFile: File, jobDescriptionText: string) => {
    try {
      // Start analysis
      updateProgress('uploading', 10, 'Uploading your resume...');
      await new Promise(resolve => setTimeout(resolve, 800));

      updateProgress('parsing', 30, 'Parsing resume content...');
      await new Promise(resolve => setTimeout(resolve, 1200));

      updateProgress('analyzing', 50, 'Analyzing skill match...');
      await new Promise(resolve => setTimeout(resolve, 1500));

      updateProgress('analyzing', 70, 'Identifying skill gaps...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      updateProgress('generating', 85, 'Generating interview prep plan...');
      await new Promise(resolve => setTimeout(resolve, 1200));

      updateProgress('generating', 95, 'Curating learning resources...');
      await new Promise(resolve => setTimeout(resolve, 800));

      // Generate results
      const { matchResult, interviewPlan, resources } = generateMockResults();

      setState(prev => ({
        ...prev,
        step: 'complete',
        progress: 100,
        currentTask: 'Analysis complete!',
        matchResult,
        interviewPlan,
        resources,
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        step: 'error',
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
    }
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    analyze,
    reset,
    isAnalyzing: ['uploading', 'parsing', 'analyzing', 'generating'].includes(state.step),
    isComplete: state.step === 'complete',
    hasError: state.step === 'error',
  };
};
