/* Cyberpunk Brutalism Design:
 * - Grid layout for project cards
 * - Interactive filters with neon accents
 * - Hover effects on project cards
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Terminal,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Smartphone,
  Globe,
  Database,
  Layers,
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Task Manager",
    description: "A comprehensive task management solution with modern dark UI",
    longDescription:
      "Full-stack monorepo application featuring Fastify API, React Native mobile app, and web interface. Includes Better-Auth authentication, Prisma ORM with PostgreSQL, calendar view, voice input, and contact integration.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663055527424/suLEdTKbfeaspCUi.png",
    technologies: ["React Native", "Expo", "TypeScript", "Fastify", "PostgreSQL", "Prisma"],
    category: "Mobile",
    featured: true,
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Modern online shopping experience with real-time inventory",
    longDescription:
      "Full-featured e-commerce platform with product catalog, shopping cart, secure checkout, order tracking, and admin dashboard. Integrated with Stripe for payments and includes real-time inventory management.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redis", "Docker"],
    category: "Web",
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://demo.example.com",
    featured: true,
  },
  {
    id: 3,
    title: "Real-Time Chat Application",
    description: "WebSocket-based messaging platform with group chat support",
    longDescription:
      "Real-time messaging application with private and group chats, file sharing, emoji reactions, typing indicators, and online status. Built with WebSocket for instant communication.",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80",
    technologies: ["React", "Socket.io", "Express", "MongoDB", "Redis"],
    category: "Web",
    githubUrl: "https://github.com/yourusername/chat-app",
    featured: false,
  },
  {
    id: 4,
    title: "Weather Forecast App",
    description: "Beautiful weather app with location-based forecasts",
    longDescription:
      "Mobile weather application with current conditions, 7-day forecast, hourly predictions, weather alerts, and interactive maps. Features location detection and supports multiple cities.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
    technologies: ["React Native", "Expo", "TypeScript", "Weather API"],
    category: "Mobile",
    githubUrl: "https://github.com/yourusername/weather-app",
    featured: false,
  },
  {
    id: 5,
    title: "Portfolio CMS",
    description: "Headless CMS for managing portfolio content dynamically",
    longDescription:
      "Custom content management system for portfolio websites with drag-and-drop page builder, media library, SEO optimization, and API-first architecture. Perfect for developers and designers.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    technologies: ["Next.js", "GraphQL", "PostgreSQL", "Prisma", "Tailwind CSS"],
    category: "Web",
    githubUrl: "https://github.com/yourusername/portfolio-cms",
    liveUrl: "https://cms.example.com",
    featured: true,
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "Track workouts, nutrition, and progress with detailed analytics",
    longDescription:
      "Comprehensive fitness tracking application with workout logging, nutrition tracking, progress photos, goal setting, and detailed analytics. Includes social features for sharing achievements.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    technologies: ["React Native", "Firebase", "TypeScript", "Chart.js"],
    category: "Mobile",
    featured: false,
  },
  {
    id: 7,
    title: "API Gateway Service",
    description: "Microservices API gateway with rate limiting and auth",
    longDescription:
      "Production-ready API gateway for microservices architecture with request routing, rate limiting, authentication, caching, logging, and monitoring. Built for high-performance applications.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    technologies: ["Node.js", "Express", "Redis", "PostgreSQL", "Docker", "Kubernetes"],
    category: "Backend",
    githubUrl: "https://github.com/yourusername/api-gateway",
    featured: false,
  },
  {
    id: 8,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for business intelligence and analytics",
    longDescription:
      "Real-time data visualization dashboard with customizable widgets, multiple chart types, data export, scheduled reports, and role-based access control. Perfect for business analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "WebSocket"],
    category: "Web",
    liveUrl: "https://dashboard.example.com",
    featured: true,
  },
];

const categories = ["All", "Web", "Mobile", "Backend"];
const allTechnologies = Array.from(
  new Set(projects.flatMap((p) => p.technologies))
).sort();

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = projects.filter((project) => {
    const categoryMatch =
      selectedCategory === "All" || project.category === selectedCategory;
    const techMatch = !selectedTech || project.technologies.includes(selectedTech);
    return categoryMatch && techMatch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-gradient-cyan-purple">PORTFOLIO</span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm hover:text-primary transition-colors">
              HOME
            </Link>
            <Link href="/projects" className="text-sm text-primary">
              PROJECTS
            </Link>
            <Link href="/guide" className="text-sm hover:text-primary transition-colors">
              USER GUIDE
            </Link>
            <a href="/#about" className="text-sm hover:text-primary transition-colors">
              ABOUT
            </a>
            <a href="/#contact" className="text-sm hover:text-primary transition-colors">
              CONTACT
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-border/50">
        <div className="container">
          <div className="max-w-4xl">
            <div className="mb-6 inline-block border-2 border-primary px-4 py-2 glow-cyan">
              <span className="text-sm text-primary font-bold">PORTFOLIO</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              MY <span className="text-gradient-cyan-purple">PROJECTS</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A collection of web, mobile, and backend projects showcasing modern development
              practices and cutting-edge technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border/50 sticky top-[73px] bg-background/95 backdrop-blur-md z-40">
        <div className="container">
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-bold mb-3">CATEGORY</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedTech(null);
                    }}
                    className={
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground glow-cyan"
                        : "border-2 border-border hover:border-primary"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Technology Filter */}
            <div>
              <h3 className="text-sm font-bold mb-3">TECHNOLOGY</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedTech ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTech(null)}
                  className={
                    !selectedTech
                      ? "bg-primary text-primary-foreground glow-cyan"
                      : "border-2 border-border hover:border-primary"
                  }
                >
                  All
                </Button>
                {allTechnologies.map((tech) => (
                  <Button
                    key={tech}
                    variant={selectedTech === tech ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTech(tech)}
                    className={
                      selectedTech === tech
                        ? "bg-primary text-primary-foreground glow-cyan"
                        : "border-2 border-border hover:border-primary"
                    }
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <Card className="p-12 bg-card border-2 border-border text-center">
              <Code2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more projects.
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden bg-card border-2 border-border hover:border-primary transition-all duration-300 hover:glow-cyan group"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-primary px-3 py-1 text-xs font-bold glow-cyan">
                        FEATURED
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-card border-2 border-primary hover:bg-primary/10 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-card border-2 border-primary hover:bg-primary/10 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {project.category === "Mobile" && (
                        <Smartphone className="h-4 w-4 text-primary" />
                      )}
                      {project.category === "Web" && <Globe className="h-4 w-4 text-primary" />}
                      {project.category === "Backend" && (
                        <Database className="h-4 w-4 text-primary" />
                      )}
                      <span className="text-xs font-bold text-primary">{project.category}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs border-primary/50 text-primary"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs border-primary/50 text-primary"
                        >
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.longDescription}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/50">
        <div className="container">
          <Card className="p-12 bg-card border-2 border-primary glow-cyan">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-gradient-cyan-purple">INTERESTED IN WORKING TOGETHER?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be
                part of your vision.
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 text-primary-foreground glow-cyan"
                asChild
              >
                <a href="/#contact">GET IN TOUCH</a>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-gradient-cyan-purple">PORTFOLIO</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Full-stack developer specializing in modern web and mobile applications.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-4">QUICK LINKS</h3>
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/guide"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  User Guide
                </Link>
                <a
                  href="/#about"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </a>
                <a
                  href="/#contact"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-4">CONNECT</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 border-2 border-border hover:border-primary bg-card hover:bg-primary/10 transition-all glow-cyan"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 border-2 border-border hover:border-primary bg-card hover:bg-primary/10 transition-all glow-cyan"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="flex items-center justify-center w-10 h-10 border-2 border-border hover:border-primary bg-card hover:bg-primary/10 transition-all glow-cyan"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground">
              © 2026 Portfolio. Built with React & Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
