// src/App.tsx
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Mail, Link as LinkIcon, MapPin, Briefcase, Layers, Phone, } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from "@/components/ui/dialog"

// keep your pathing for Badge like you wrote it:
import { Badge } from "./components/ui/badge"

import { ABOUT_ME, PROJECTS, skillColor } from "./db"
import type { Project } from "./types";

// --- Types ---

// ===== Components =====
export function PortfolioHeader() {
  return (
    <div className="flex items-center gap-3 py-3">
      <Avatar className="h-12 w-12">
        <AvatarFallback className="bg-neutral-800 text-neutral-200">B</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h1 className="text-xl font-semibold leading-none text-neutral-100">Bekhira Gacem</h1>
        <p className="text-xs text-neutral-400 flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> Algeria · Platform Developer
        </p>
      </div>
      <div className="flex items-center gap-2">
        <a href={ABOUT_ME.socials.github} target="_blank">
          <Button size="icon" variant="outline" className="rounded-2xl border-neutral-700 cursor-pointer">
            <Github className="h-4 w-4" />
          </Button>
        </a>
        <a href={`tel:${ABOUT_ME.socials.phoneNumber}`} >
          <Button size="icon" variant="outline" className="rounded-2xl border-neutral-700 cursor-pointer">
            <Phone className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
  )
}

export function SearchBar({
  value,
  onChange,
}: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="px-1 pb-3">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects, stacks, features…"
        className="rounded-2xl h-10 bg-neutral-900 border-neutral-800 placeholder:text-neutral-500"
      />
    </div>
  )
}

export function AboutCard() {
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <>
      <Card className="rounded-2xl shadow-sm border-neutral-800 bg-neutral-900/60">
        <CardHeader>
          <CardTitle className="text-base text-neutral-100">About</CardTitle>
          <CardDescription className="text-neutral-400">
            {ABOUT_ME.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {ABOUT_ME.skills.map((s) => (
              <Badge
                key={s}
                variant="outline"
                className="rounded-xl border-neutral-700 text-neutral-200"
              >
                {s}
              </Badge>
            ))}
          </div>
          <Separator className="bg-neutral-800" />
          <div className="grid grid-cols-3 gap-3 text-center">
            {ABOUT_ME.stats.map((item, index) => (
              <div key={index}>
                <div className="text-xl font-semibold text-neutral-100">{item.value}</div>
                <div className="text-xs text-neutral-400">{item.label}</div>
              </div>
            ))}
          </div>
          <Separator className="bg-neutral-800" />
          <div className="flex justify-center pointer-events-none">
            <div className="w-full pointer-events-auto">
              <Card className="rounded-none border-none shadow-none bg-transparent">
                <CardContent className="py-3 px-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-neutral-100">
                      Let’s build something great
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Open to freelance & collaborations
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${ABOUT_ME.socials.email}`}>
                      <Button className="rounded-xl h-9 cursor-pointer">
                        <Mail className="h-4 w-4 mr-1" /> Contact
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      className="rounded-xl h-9 border-neutral-700 cursor-pointer"
                      onClick={() => setPdfOpen(true)}
                    >
                      <Layers className="h-4 w-4 mr-1" /> CV
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={pdfOpen} onOpenChange={setPdfOpen}>
        <DialogContent className="sm:max-w-[900px] border-neutral-800 bg-neutral-950 text-neutral-200">
          <DialogHeader>
            <DialogTitle className="text-neutral-100">Portfolio (PDF Preview)</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Preview your CV. Use the actions below to open in a new tab or download.
            </DialogDescription>
          </DialogHeader>

          {/* Viewer */}
          <div className="w-full">
            <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
              <iframe
                src={`${ABOUT_ME.pdf_portfolio}#view=FitH&toolbar=0`}
                className="w-full h-[75dvh] bg-neutral-900"
                title="CV PDF Preview"
              />
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between gap-2">
            <div className="text-[11px] text-neutral-500">
              Tip: If the PDF doesn’t render, click “Open in new tab”.
            </div>
            <div className="flex gap-2">
              <a href={ABOUT_ME.pdf_portfolio} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-xl border-neutral-700">
                  Open in new tab
                </Button>
              </a>
              <a href={ABOUT_ME.pdf_portfolio} download>
                <Button className="rounded-xl">Download</Button>
              </a>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>

  )
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="rounded-2xl hover:shadow-md transition border-neutral-800 bg-neutral-900/60 gap-2">
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base leading-tight text-neutral-100">
              {project.title}
            </CardTitle>
            {project.subtitle && (
              <CardDescription className="mt-0.5 text-neutral-400">
                {project.subtitle}
              </CardDescription>
            )}
          </div>
          <Badge
            variant="outline"
            className="rounded-xl text-[10px] border-neutral-700 text-neutral-300"
          >
            {project.year}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-neutral-300 mb-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.skills.map((s) => (
            <span
              key={s}
              className={`text-[10px] border px-2 py-0.5 rounded-lg ${
                // fall back to a generic dark pill if skill missing from map
                skillColor[s] ??
                "bg-neutral-800/70 text-neutral-300 border-neutral-700"
                }`}
            >
              {s}
            </span>
          ))}
        </div>

        {(project.link || project.repo) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.link && (
              <Button asChild size="sm" className="rounded-xl h-8">
                <a href={project.link} target="_blank" rel="noreferrer">
                  <LinkIcon className="h-4 w-4 mr-1" /> Live
                </a>
              </Button>
            )}
            {project.repo && (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-xl h-8 border-neutral-700"
              >
                <a href={project.repo} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4 mr-1" /> Code
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-3">
      {projects.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
        >
          <ProjectCard project={p} />
        </motion.div>
      ))}
    </div>
  )
}

// ===== Main Page =====
export default function App() {
  const [query, setQuery] = useState("")
  const [activeSkills] = useState<string[]>([]) // filters hidden in this version
  const [tab, setTab] = useState("projects")

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesQuery = `${p.title} ${p.subtitle ?? ""} ${p.description}`
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesSkills =
        activeSkills.length === 0 || activeSkills.every((s) => p.skills.includes(s as any))
      return matchesQuery && matchesSkills
    })
  }, [query, activeSkills])

  return (
    <div className="h-[calc(100dvh)]  w-full bg-gradient-to-b from-neutral-950 to-black flex flex-col items-center text-neutral-200">
      <div className="w-full max-w-[440px] md:max-w-[520px] lg:max-w-[560px] px-3 sm:px-4">
        <div className="sticky top-0 z-40 backdrop-blur bg-neutral-950/70 border-neutral-800">
          <PortfolioHeader />
          <SearchBar value={query} onChange={setQuery} />
          <Tabs value={tab} onValueChange={setTab} className="px-1">
            <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-neutral-900 border border-neutral-800">
              <TabsTrigger value="about" className="data-[state=active]:bg-neutral-800">
                About
              </TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-neutral-800">
                Projects
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="mt-3">
          <TabsContent value="about" className="m-0">
            <AboutCard />
          </TabsContent>

          <TabsContent value="projects" className="m-0">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="text-sm text-neutral-400 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {filtered.length} / {PROJECTS.length} projects
              </div>
            </div>
            <ScrollArea className="h-[calc(100dvh-202px)] pr-3">
              <ProjectsList projects={filtered} />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
