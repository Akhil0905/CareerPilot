import { BookOpen, ExternalLink, Play, FileText, GraduationCap, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { LearningResource, ResourceItem } from "@/types/career";

interface ResourcesCardProps {
  resources: LearningResource[];
}

const getTypeIcon = (type: ResourceItem['type']) => {
  switch (type) {
    case 'video': return <Play className="h-4 w-4" />;
    case 'article': return <FileText className="h-4 w-4" />;
    case 'course': return <GraduationCap className="h-4 w-4" />;
    case 'documentation': return <Globe className="h-4 w-4" />;
  }
};

const getTypeColor = (type: ResourceItem['type']) => {
  switch (type) {
    case 'video': return 'bg-destructive/10 text-destructive';
    case 'article': return 'bg-primary/10 text-primary';
    case 'course': return 'bg-warning/10 text-warning';
    case 'documentation': return 'bg-success/10 text-success';
  }
};

const ResourcesCard = ({ resources }: ResourcesCardProps) => {
  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-success/20 to-success/5">
            <BookOpen className="h-5 w-5 text-success" />
          </div>
          <div>
            <CardTitle>Learning Resources</CardTitle>
            <CardDescription>Curated content to close your skill gaps</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {resources.map((skillResources, index) => (
          <div key={skillResources.skill} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="mb-3 flex items-center gap-2">
              <h4 className="font-semibold">{skillResources.skill}</h4>
              <Badge variant="outline" className="text-xs">
                {skillResources.resources.length} resources
              </Badge>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2">
              {skillResources.resources.slice(0, 4).map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <Badge className={getTypeColor(resource.type)}>
                      {getTypeIcon(resource.type)}
                      <span className="ml-1">{resource.type}</span>
                    </Badge>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  
                  <h5 className="mb-1 font-medium line-clamp-2 group-hover:text-primary">
                    {resource.title}
                  </h5>
                  
                  <p className="mb-2 text-xs text-muted-foreground line-clamp-2">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{resource.source}</span>
                    {resource.duration && <span>{resource.duration}</span>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {resources.length === 0 && (
          <div className="rounded-xl bg-accent/50 p-6 text-center">
            <p className="text-muted-foreground">No additional resources needed - you're well-prepared!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourcesCard;
