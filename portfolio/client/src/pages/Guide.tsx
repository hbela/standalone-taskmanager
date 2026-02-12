/* Cyberpunk Brutalism Design:
 * - Documentation layout with clear hierarchy
 * - Code-style monospace typography for technical content
 * - Neon accents for section headers and important elements
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Mic,
  Plus,
  Settings,
  Terminal,
  Users,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Link } from "wouter";

export default function Guide() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-gradient-cyan-purple">PORTFOLIO</span>
          </div>
          <Button variant="outline" className="border-primary text-primary" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              BACK TO HOME
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-border/50">
        <div className="container">
          <div className="max-w-4xl">
            <div className="mb-6 inline-block border-2 border-primary px-4 py-2 glow-cyan">
              <span className="text-sm text-primary font-bold">DOCUMENTATION</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              TASK MANAGER
              <br />
              <span className="text-gradient-cyan-purple">USER GUIDE</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your complete guide to mastering the Task Manager app. Learn all features, from basic
              task creation to advanced productivity workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 border-b border-border/50">
        <div className="container">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-gradient-cyan-purple">
              TABLE OF CONTENTS
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Getting Started", href: "#getting-started" },
                { title: "Dashboard Overview", href: "#dashboard" },
                { title: "Managing Tasks", href: "#tasks" },
                { title: "Creating Tasks", href: "#create" },
                { title: "Calendar View", href: "#calendar" },
                { title: "Voice Input", href: "#voice" },
                { title: "Contact Integration", href: "#contacts" },
                { title: "Settings", href: "#settings" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="p-4 border-2 border-border hover:border-primary bg-card transition-all text-sm font-bold hover:glow-cyan"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl space-y-16">
            {/* Getting Started */}
            <div id="getting-started">
              <h2 className="text-3xl font-bold mb-6 text-gradient-cyan-purple">
                GETTING STARTED
              </h2>
              <Card className="p-8 bg-card border-2 border-border mb-6">
                <p className="text-lg text-muted-foreground mb-6">
                  Welcome to Task Manager, your personal productivity companion. The app is designed
                  to help you organize your tasks efficiently with an intuitive interface and
                  powerful features. When you first open the app, you'll be greeted with a welcome
                  screen that highlights the key capabilities.
                </p>
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663055527424/suLEdTKbfeaspCUi.png"
                  alt="Welcome Screen"
                  className="w-full max-w-sm mx-auto rounded border-2 border-primary/50 glow-cyan"
                />
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">NAVIGATION BAR</h3>
                <p className="text-muted-foreground mb-4">
                  The bottom navigation bar provides quick access to all major sections of the app:
                </p>
                <div className="grid gap-4">
                  {[
                    {
                      icon: CheckCircle2,
                      title: "MY TASKS",
                      desc: "View and manage all your tasks with filtering options",
                    },
                    {
                      icon: Calendar,
                      title: "CALENDAR",
                      desc: "Visualize your tasks in a calendar interface",
                    },
                    {
                      icon: Plus,
                      title: "ADD NEW TASK",
                      desc: "Quickly create a new task with all details",
                    },
                    {
                      icon: Terminal,
                      title: "DASHBOARD",
                      desc: "Get an overview of your task statistics and progress",
                    },
                    {
                      icon: Settings,
                      title: "SETTINGS",
                      desc: "Customize the app to your preferences",
                    },
                  ].map((item, i) => (
                    <Card key={i} className="p-4 bg-card border border-border">
                      <div className="flex items-start gap-4">
                        <item.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Dashboard */}
            <div id="dashboard">
              <h2 className="text-3xl font-bold mb-6 text-gradient-cyan-purple">
                DASHBOARD OVERVIEW
              </h2>
              <Card className="p-8 bg-card border-2 border-border mb-6">
                <p className="text-lg text-muted-foreground mb-6">
                  The Dashboard provides a comprehensive overview of your productivity. It displays
                  key metrics including total tasks, completed tasks, pending tasks, and your
                  overall completion rate. The dashboard also highlights overdue tasks with a
                  prominent alert banner, ensuring you never miss important deadlines.
                </p>
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663055527424/RcVMonpUhctSVJjr.png"
                  alt="Dashboard"
                  className="w-full max-w-sm mx-auto rounded border-2 border-primary/50 glow-cyan"
                />
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">KEY METRICS</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-6 bg-card border-2 border-border">
                    <h4 className="text-2xl font-bold text-primary mb-2">TOTAL TASKS</h4>
                    <p className="text-muted-foreground">
                      View the total number of tasks in your system, giving you a quick sense of
                      your workload.
                    </p>
                  </Card>
                  <Card className="p-6 bg-card border-2 border-border">
                    <h4 className="text-2xl font-bold text-primary mb-2">COMPLETED</h4>
                    <p className="text-muted-foreground">
                      Track how many tasks you've successfully completed, displayed in green to
                      celebrate your progress.
                    </p>
                  </Card>
                  <Card className="p-6 bg-card border-2 border-border">
                    <h4 className="text-2xl font-bold text-primary mb-2">PENDING</h4>
                    <p className="text-muted-foreground">
                      See how many tasks are still awaiting completion, shown in orange to indicate
                      action needed.
                    </p>
                  </Card>
                  <Card className="p-6 bg-card border-2 border-border">
                    <h4 className="text-2xl font-bold text-primary mb-2">COMPLETION RATE</h4>
                    <p className="text-muted-foreground">
                      Your productivity percentage, calculated from completed vs. total tasks.
                    </p>
                  </Card>
                </div>

                <h3 className="text-xl font-bold mb-4 mt-8">PRIORITY BREAKDOWN</h3>
                <p className="text-muted-foreground mb-4">
                  The dashboard shows a breakdown of tasks by priority level, helping you focus on
                  what matters most. High-priority tasks are marked in orange, while low-priority
                  tasks are shown in green.
                </p>
              </div>
            </div>

            {/* Managing Tasks */}
            <div id="tasks">
              <h2 className="text-3xl font-bold mb-6 text-gradient-cyan-purple">MANAGING TASKS</h2>
              <Card className="p-8 bg-card border-2 border-border mb-6">
                <p className="text-lg text-muted-foreground mb-6">
                  The "My Tasks" screen is your central hub for task management. Here you can view
                  all your tasks, filter them by status, search for specific items, and mark tasks
                  as complete. Each task card displays the title, description, creation date, due
                  date, and priority level.
                </p>
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663055527424/CsIfZSyXjwzpmZMb.png"
                  alt="My Tasks"
                  className="w-full max-w-sm mx-auto rounded border-2 border-primary/50 glow-cyan"
                />
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">FILTER OPTIONS</h3>
                <p className="text-muted-foreground mb-4">
                  Use the filter tabs at the top of the screen to quickly view tasks by status:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">ALL</h4>
                    <p className="text-sm text-muted-foreground">
                      Display all tasks regardless of status
                    </p>
                  </Card>
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">PENDING</h4>
                    <p className="text-sm text-muted-foreground">
                      Show only tasks that are not yet completed
                    </p>
                  </Card>
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">OVERDUE</h4>
                    <p className="text-sm text-muted-foreground">
                      View tasks that have passed their due date
                    </p>
                  </Card>
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">DONE</h4>
                    <p className="text-sm text-muted-foreground">
                      See all completed tasks
                    </p>
                  </Card>
                </div>

                <h3 className="text-xl font-bold mb-4 mt-8">PRIORITY LEVELS</h3>
                <p className="text-muted-foreground mb-4">
                  Tasks are marked with priority badges to help you focus on what's most important:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-destructive/20 border border-destructive text-destructive text-xs font-bold">
                      URGENT
                    </div>
                    <span className="text-muted-foreground">
                      Critical tasks requiring immediate attention
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-orange-500/20 border border-orange-500 text-orange-500 text-xs font-bold">
                      HIGH
                    </div>
                    <span className="text-muted-foreground">Important tasks to complete soon</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-primary/20 border border-primary text-primary text-xs font-bold">
                      MEDIUM
                    </div>
                    <span className="text-muted-foreground">Standard priority tasks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-green-500/20 border border-green-500 text-green-500 text-xs font-bold">
                      LOW
                    </div>
                    <span className="text-muted-foreground">Tasks that can wait</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Creating Tasks */}
            <div id="create">
              <h2 className="text-3xl font-bold mb-6 text-gradient-cyan-purple">CREATING TASKS</h2>
              <Card className="p-8 bg-card border-2 border-border mb-6">
                <p className="text-lg text-muted-foreground mb-6">
                  Creating a new task is simple and intuitive. Tap the "Add New Task" button in the
                  bottom navigation to open the task creation form. You can enter a title,
                  description, set a due date, assign a priority level, and even link the task to a
                  contact.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <img
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663055527424/NwmlPuqZSPFFSWuo.png"
                    alt="Create Task Step 1"
                    className="w-full rounded border-2 border-primary/50 glow-cyan"
                  />
                  <img
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663055527424/rxIzPSlOHkUAOjuM.png"
                    alt="Create Task Step 2"
                    className="w-full rounded border-2 border-primary/50 glow-cyan"
                  />
                </div>
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">TASK FIELDS</h3>
                <div className="space-y-4">
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">TITLE</h4>
                    <p className="text-sm text-muted-foreground">
                      A short, descriptive name for your task (required)
                    </p>
                  </Card>
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">DESCRIPTION</h4>
                    <p className="text-sm text-muted-foreground">
                      Detailed information about what needs to be done (optional)
                    </p>
                  </Card>
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">DUE DATE</h4>
                    <p className="text-sm text-muted-foreground">
                      When the task should be completed (optional)
                    </p>
                  </Card>
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">PRIORITY</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose from Urgent, High, Medium, or Low priority
                    </p>
                  </Card>
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">CONTACT</h4>
                    <p className="text-sm text-muted-foreground">
                      Link the task to a contact from your phone (optional)
                    </p>
                  </Card>
                </div>
              </div>
            </div>

            {/* Calendar View */}
            <div id="calendar">
              <h2 className="text-3xl font-bold mb-6 text-gradient-cyan-purple">CALENDAR VIEW</h2>
              <Card className="p-8 bg-card border-2 border-border mb-6">
                <p className="text-lg text-muted-foreground mb-6">
                  The Calendar view provides a visual representation of your tasks over time. This
                  helps you plan your schedule more effectively and identify potential conflicts or
                  busy periods. Tasks are displayed on their due dates, making it easy to see what's
                  coming up.
                </p>
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663055527424/UZPMTcbwkuFCtvvC.png"
                  alt="Calendar View"
                  className="w-full max-w-sm mx-auto rounded border-2 border-primary/50 glow-cyan"
                />
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">CALENDAR FEATURES</h3>
                <div className="space-y-4">
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">MONTHLY VIEW</h4>
                    <p className="text-sm text-muted-foreground">
                      See all your tasks for the entire month at a glance
                    </p>
                  </Card>
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">TASK INDICATORS</h4>
                    <p className="text-sm text-muted-foreground">
                      Dots or badges on dates indicate tasks scheduled for that day
                    </p>
                  </Card>
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">QUICK NAVIGATION</h4>
                    <p className="text-sm text-muted-foreground">
                      Swipe or use arrows to move between months
                    </p>
                  </Card>
                </div>
              </div>
            </div>

            {/* Voice Input */}
            <div id="voice">
              <h2 className="text-3xl font-bold mb-6 text-gradient-cyan-purple">VOICE INPUT</h2>
              <Card className="p-8 bg-card border-2 border-border">
                <div className="flex items-start gap-6">
                  <Mic className="h-12 w-12 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-lg text-muted-foreground mb-4">
                      For hands-free task creation, use the voice input feature. Simply tap the
                      microphone icon when creating a task, speak your task details, and the app
                      will automatically convert your speech to text using advanced speech
                      recognition technology.
                    </p>
                    <p className="text-muted-foreground">
                      This feature is particularly useful when you're on the go or when typing is
                      inconvenient. The voice recognition is accurate and supports natural language,
                      so you can speak naturally without worrying about specific commands.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Integration */}
            <div id="contacts">
              <h2 className="text-3xl font-bold mb-6 text-gradient-cyan-purple">
                CONTACT INTEGRATION
              </h2>
              <Card className="p-8 bg-card border-2 border-border">
                <div className="flex items-start gap-6">
                  <Users className="h-12 w-12 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-lg text-muted-foreground mb-4">
                      Link tasks to contacts from your phone's contact list. This feature is perfect
                      for tasks that involve other people, such as meetings, follow-ups, or
                      collaborative projects. When you link a contact, you can quickly access their
                      information directly from the task.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      To link a contact, tap the contact field when creating or editing a task, then
                      select from your contact list. The contact's name and basic information will
                      be associated with the task.
                    </p>
                    <p className="text-muted-foreground">
                      This integration makes it easy to remember who you need to coordinate with for
                      each task, and provides quick access to call or message them if needed.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Settings */}
            <div id="settings">
              <h2 className="text-3xl font-bold mb-6 text-gradient-cyan-purple">SETTINGS</h2>
              <Card className="p-8 bg-card border-2 border-border mb-6">
                <p className="text-lg text-muted-foreground mb-6">
                  The Settings screen allows you to customize the app to your preferences. You can
                  adjust notification settings, change the app theme, manage your account, and
                  configure various other options to optimize your experience.
                </p>
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663055527424/VrqjDVXMcoKPtTzD.png"
                  alt="Settings"
                  className="w-full max-w-sm mx-auto rounded border-2 border-primary/50 glow-cyan"
                />
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">AVAILABLE SETTINGS</h3>
                <div className="space-y-4">
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">NOTIFICATIONS</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure when and how you receive reminders for upcoming and overdue tasks
                    </p>
                  </Card>
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">THEME</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose between dark and light themes (dark theme is default)
                    </p>
                  </Card>
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">ACCOUNT</h4>
                    <p className="text-sm text-muted-foreground">
                      Manage your account details, authentication, and data sync preferences
                    </p>
                  </Card>
                  <Card className="p-4 bg-card border border-border">
                    <h4 className="font-bold mb-2">DATA & PRIVACY</h4>
                    <p className="text-sm text-muted-foreground">
                      Control how your data is stored and shared, with options to export or delete
                      your data
                    </p>
                  </Card>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <Card className="p-8 bg-card border-2 border-primary glow-cyan">
              <h2 className="text-3xl font-bold mb-4 text-gradient-cyan-purple">
                READY TO GET STARTED?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                You now have all the knowledge you need to make the most of the Task Manager app.
                Start organizing your tasks, boost your productivity, and take control of your time.
                If you have any questions or feedback, don't hesitate to reach out.
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 text-primary-foreground glow-cyan"
                asChild
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  BACK TO HOME
                </Link>
              </Button>
            </Card>
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
                <Link href="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/projects" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
                <a href="/#about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
                <a href="/#contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-4">CONNECT</h3>
              <div className="flex gap-4 mb-4">
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
              <Button variant="outline" className="border-primary text-primary w-full" asChild>
                <Link href="/">BACK TO HOME</Link>
              </Button>
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
