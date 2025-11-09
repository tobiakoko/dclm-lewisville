import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Users, MapPin, ArrowRight } from "lucide-react";

interface ServiceTime {
  name: string;
  day: string;
  time: string;
  description: string;
  featured?: boolean; // Optional: to highlight a specific service
}

interface ServicesGridProps {
  times: ServiceTime[];
}

export function ServicesGrid({ times }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {times.map((service, index) => (
        <Card
          key={service.name}
          className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ${
            service.featured
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          {/* Featured Badge */}
          {service.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            </div>
          )}

          <CardHeader className="space-y-4 pb-4">
            {/* Icon Container */}
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                service.featured
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
              }`}
            >
              <Clock className="w-7 h-7" />
            </div>

            {/* Service Name */}
            <CardTitle className="text-2xl font-heading">
              {service.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Time Details */}
            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground group-hover:text-foreground transition-colors">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center mr-3">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="font-medium">{service.day}s</span>
              </div>

              <div className="flex items-center text-muted-foreground group-hover:text-foreground transition-colors">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center mr-3">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="font-medium">{service.time}</span>
              </div>
            </div>

            {/* Description */}
            <CardDescription className="text-base leading-relaxed pt-2">
              {service.description}
            </CardDescription>

            {/* Hover Arrow Indicator */}
            <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2 pt-2">
              <span className="text-sm font-semibold mr-2">Learn more</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </CardContent>

          {/* Decorative Element */}
          <div
            className={`absolute bottom-0 left-0 h-1 w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
              service.featured ? "bg-primary" : "bg-primary/70"
            }`}
          />
        </Card>
      ))}
    </div>
  );
}

interface ServiceTime {
  name: string;
  day: string;
  time: string;
  description: string;
  location?: string;
}

interface ServicesGridCompactProps {
  times: ServiceTime[];
}

export function ServicesGridCompact({ times }: ServicesGridCompactProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {times.map((service) => (
        <Card
          key={service.name}
          className="group relative overflow-hidden border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 hover:border-l-secondary"
        >
          <CardContent className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-heading text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ml-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-medium">{service.day}s</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-medium">{service.time}</span>
              </div>
              {service.location && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="font-medium">{service.location}</span>
                </div>
              )}
            </div>
          </CardContent>

          {/* Hover Effect Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500 pointer-events-none" />
        </Card>
      ))}
    </div>
  );
}



interface ServiceTime {
  name: string;
  day: string;
  time: string;
  description: string;
  attendees?: string; // e.g., "200+ members"
}

interface ServicesGridModernProps {
  times: ServiceTime[];
  onServiceClick?: (serviceName: string) => void;
}

export function ServicesGridModern({ 
  times, 
  onServiceClick 
}: ServicesGridModernProps) {
  const gradients = [
    "from-primary/90 to-secondary/90",
    "from-secondary/90 to-primary/90",
    "from-primary/80 to-primary/95",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {times.map((service, index) => (
        <Card
          key={service.name}
          className="group relative overflow-hidden border-0 bg-gradient-to-br text-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
          style={{
            backgroundImage: `linear-gradient(135deg, ${
              index % 3 === 0
                ? "oklch(0.64 0.155 255), oklch(0.71 0.14 240)"
                : index % 3 === 1
                ? "oklch(0.71 0.14 240), oklch(0.64 0.155 255)"
                : "oklch(0.64 0.155 255), oklch(0.58 0.15 255)"
            })`,
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
          </div>

          <div className="relative p-8 space-y-6">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
              <Clock className="w-8 h-8 text-white" />
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="font-heading text-2xl font-bold">
                {service.name}
              </h3>

              <p className="text-white/90 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Time Info */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3 text-white/95">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{service.day}s</span>
                </div>
                <div className="flex items-center gap-3 text-white/95">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{service.time}</span>
                </div>
                {service.attendees && (
                  <div className="flex items-center gap-3 text-white/95">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">{service.attendees}</span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button */}
            {onServiceClick && (
              <Button
                variant="secondary"
                className="w-full bg-white text-primary hover:bg-white/90 group-hover:shadow-xl transition-all duration-300"
                onClick={() => onServiceClick(service.name)}
              >
                <span className="font-semibold">Join This Service</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}

            {/* Decorative Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
        </Card>
      ))}
    </div>
  );
}