/* Cyberpunk Brutalism Design:
 * - Asymmetric diagonal layouts with overlapping panels
 * - Neon cyan (#00d9ff) and purple (#b026ff) accents on dark backgrounds
 * - Monospace typography for technical authenticity
 * - Glowing borders and digital artifacts
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Code2, Database, Smartphone, Terminal, Send, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-gradient-cyan-purple">PORTFOLIO</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/projects" className="text-sm hover:text-primary transition-colors">
              PROJECTS
            </Link>
            <a href="#guide" className="text-sm hover:text-primary transition-colors">
              USER GUIDE
            </a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">
              ABOUT
            </a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">
              CONTACT
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/6mbB3Hyp6dtlOZiGOkD794/sandbox/EEBrzqZUe95LRvL2ekTxz5-img-1_1770824307000_na1fn_aGVyby1iYWNrZ3JvdW5k.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNm1iQjNIeXA2ZHRsT1ppR09rRDc5NC9zYW5kYm94L0VFQnJ6cVpVZTk1TFJ2TDJla1R4ejUtaW1nLTFfMTc3MDgyNDMwNzAwMF9uYTFmbl9hR1Z5YnkxaVlXTnJaM0p2ZFc1ay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=YibeUcxM3FbsJOsPYKNPIzclOXtafbjo9HbiLNbo0tzQsDgk9dHBCfnVCoZ0168iOzDXyyp~m-YNSaHwLIRhRFRG2kT3ol5u9nMY8QBD-smTml-TgjCscYiIOUQ6~7f5vAFiOe~5G4Pg~tRlUjvQWjaYUWxsD0Yq-B4KhJoGDWXG82dShhCi7mYb6pvbetRPTnUVVrJo5paTYyJ2PCFHGG6TEJ1hI57ygw4XD1xGs3qsSGy7tsA7fuuGZd1q~t0MiAb80GlgwVzd32m91ivCG-lZTkp6PVVNq9moyQAUUcd~nPaCOlK0X21dLjYL-uLsqoXFgsu5i3PKC9fP0YFehA__')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/70" />
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="mb-6 inline-block border-2 border-primary px-4 py-2 glow-cyan">
              <span className="text-sm text-primary font-bold">FULL-STACK DEVELOPER</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              BUILDING
              <br />
              <span className="text-gradient-cyan-purple">DIGITAL</span>
              <br />
              EXPERIENCES
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Specialized in React Native, Node.js, and modern web technologies. Creating seamless
              mobile and web applications with cutting-edge design.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 text-primary-foreground glow-cyan"
                asChild
              >
                <Link href="/projects">
                  VIEW PROJECTS <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/10"
                asChild
              >
                <a href="#guide">USER GUIDE</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 border-t border-border/50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-gradient-cyan-purple">TECH STACK</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, title: "MOBILE", desc: "React Native, Expo" },
              { icon: Code2, title: "FRONTEND", desc: "React, TypeScript, Tailwind" },
              { icon: Terminal, title: "BACKEND", desc: "Node.js, Fastify, Express" },
              { icon: Database, title: "DATABASE", desc: "PostgreSQL, Prisma ORM" },
            ].map((item, i) => (
              <Card
                key={i}
                className="p-6 bg-card border-2 border-border hover:border-primary transition-all duration-300 hover:glow-cyan"
              >
                <item.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section
        id="projects"
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/6mbB3Hyp6dtlOZiGOkD794/sandbox/EEBrzqZUe95LRvL2ekTxz5-img-2_1770824297000_na1fn_cHJvamVjdC1zaG93Y2FzZS1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNm1iQjNIeXA2ZHRsT1ppR09rRDc5NC9zYW5kYm94L0VFQnJ6cVpVZTk1TFJ2TDJla1R4ejUtaW1nLTJfMTc3MDgyNDI5NzAwMF9uYTFmbl9jSEp2YW1WamRDMXphRzkzWTJGelpTMWlady5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ror6HE2qXq3zIICvbrDLwDQwZTKP4cfCEnImtaaSZUf4RS5BPTzyNXwt23vjPfvCdRT9UZaL-TWJx4bo4~lR0bWL0Sox1QBq3Q-EMqq~wYtH71XiI7C4ECz9DaSmLPliT~JhpfEMvGThryJHkcUkNCGJFMLhZtQyQFcpBAnmkxFeAqJ1YgNQW~vugl9-i3BHWJoz650uqIbNVraq2yFGqG1C6FT3FThHMw-2dSA5z7Dh03lt3WPt4KL4321~LbXQ0zNPgOKBvLeMb64U3my-UUDg3C2e2yJAn5KM39YiAeFXpaZu7zQgEYYIjcibY~nq0mMmeDQekklvB7EGF3djmA__')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/85" />
        <div className="container relative z-10">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-4">
              FEATURED <span className="text-gradient-cyan-purple">PROJECT</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              A comprehensive task management solution built with modern technologies
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-primary/20 border border-primary text-primary text-sm font-bold mb-4">
                  REACT NATIVE • EXPO
                </span>
                <h3 className="text-4xl font-bold mb-4">TASK MANAGER</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  A professional task management application featuring a modern dark interface,
                  built as a monorepo with Fastify API, mobile and web apps using Better-Auth and
                  Prisma ORM with PostgreSQL.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary mt-2 glow-cyan" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">FULL-STACK ARCHITECTURE</h4>
                    <p className="text-muted-foreground text-sm">
                      Monorepo structure with shared types, API, and client applications
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary mt-2 glow-cyan" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">MODERN AUTHENTICATION</h4>
                    <p className="text-muted-foreground text-sm">
                      Secure user authentication with Better-Auth integration
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary mt-2 glow-cyan" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">POWERFUL FEATURES</h4>
                    <p className="text-muted-foreground text-sm">
                      Task prioritization, calendar view, voice input, and contact integration
                    </p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 text-primary-foreground glow-cyan"
                asChild
              >
                <a href="#guide">
                  VIEW USER GUIDE <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663055527424/suLEdTKbfeaspCUi.png"
                  alt="Task Manager Welcome Screen"
                  className="rounded border-2 border-primary/50 hover:border-primary transition-all glow-cyan"
                />
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663055527424/RcVMonpUhctSVJjr.png"
                  alt="Task Manager Dashboard"
                  className="rounded border-2 border-primary/50 hover:border-primary transition-all glow-cyan mt-8"
                />
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663055527424/CsIfZSyXjwzpmZMb.png"
                  alt="Task Manager Tasks View"
                  className="rounded border-2 border-primary/50 hover:border-primary transition-all glow-cyan -mt-8"
                />
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663055527424/UZPMTcbwkuFCtvvC.png"
                  alt="Task Manager Calendar"
                  className="rounded border-2 border-primary/50 hover:border-primary transition-all glow-cyan"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Guide Link Section */}
      <section id="guide" className="py-20 border-t border-border/50">
        <div className="container">
          <Card className="p-12 bg-card border-2 border-primary glow-cyan">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-gradient-cyan-purple">COMPREHENSIVE USER GUIDE</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Learn how to use the Task Manager app with our detailed step-by-step guide covering
                all features, from basic task creation to advanced calendar integration and voice
                input.
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 text-primary-foreground glow-cyan"
                asChild
              >
                <Link href="/guide">
                  READ FULL GUIDE <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 border-t border-border/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-gradient-cyan-purple">GET IN TOUCH</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Have a project in mind or want to collaborate? Send me a message.
              </p>
            </div>

            <Card className="p-8 bg-card border-2 border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold">
                    NAME
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background border-2 border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-bold">
                    EMAIL
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background border-2 border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-bold">
                    MESSAGE
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or idea..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="bg-background border-2 border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/80 text-primary-foreground glow-cyan"
                >
                  {isSubmitting ? (
                    "SENDING..."
                  ) : (
                    <>
                      SEND MESSAGE <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 border-t border-border/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">
              <span className="text-gradient-cyan-purple">ABOUT</span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                As a full-stack developer, I specialize in building modern, scalable applications
                using cutting-edge technologies. My expertise spans across mobile development with
                React Native and Expo, backend systems with Node.js and Fastify, and robust database
                management with PostgreSQL and Prisma ORM.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                I focus on creating intuitive user experiences backed by solid architecture and
                clean code. The Task Manager project showcases my ability to design and implement
                complete solutions from concept to deployment, with attention to both functionality
                and aesthetics.
              </p>
              <p className="text-lg text-muted-foreground">
                My development philosophy centers on writing maintainable code, implementing best
                practices, and staying current with emerging technologies in the rapidly evolving
                web and mobile development landscape.
              </p>
            </div>
          </div>
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
                <Link href="/projects" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
                <a href="#guide" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  User Guide
                </a>
                <a href="#about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
                <a href="#contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
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
