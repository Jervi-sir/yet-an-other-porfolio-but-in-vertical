import React, { useMemo, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Github,
  Mail,
  Link as LinkIcon,
  MapPin,
  Briefcase,
  Layers,
  Phone,
  Search,
  Linkedin,
  Instagram,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  PenTool,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from "@/components/ui/dialog"
import { Badge } from "./components/ui/badge"
import { ABOUT_ME, PROJECTS, skillColor } from "./db"
import type { Project } from "./types";
import "./App.css"


// ——————————————————————————————————————————
// MARK: Particles background
// ——————————————————————————————————————————
function Particles() {
  return (
    <>
      <div className="aurora-bg" />
      <div className="grid-overlay" />
      {[...Array(6)].map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </>
  )
}


// ——————————————————————————————————————————
// MARK: Header
// ——————————————————————————————————————————
function PortfolioHeader() {
  return (
    <motion.div
      className="flex items-center gap-4 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="avatar-ring">
        <Avatar className="h-14 w-14">
          <AvatarImage src="/1.png" alt="Bekhira Gacem" className="object-cover" />
          <AvatarFallback className="bg-neutral-800 text-neutral-200 text-lg font-semibold">B</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-bold leading-none gradient-text">Bekhira Gacem</h1>
        <div className="flex items-center gap-2 mt-1.5">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <MapPin className="h-3 w-3" />
            <span>Algeria</span>
          </div>
          <span className="text-neutral-700">·</span>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <Sparkles className="h-3 w-3 text-amber-600/70" />
            <span>Platform Developer</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <div className="status-dot" />
          <span className="text-[10px] text-neutral-400">Available for work</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a href={ABOUT_ME.socials.github} target="_blank" rel="noreferrer">
          <div className="social-icon cursor-pointer">
            <Github className="h-4 w-4" />
          </div>
        </a>
        <a href={`tel:${ABOUT_ME.socials.phoneNumber}`}>
          <div className="social-icon cursor-pointer">
            <Phone className="h-4 w-4" />
          </div>
        </a>
      </div>
    </motion.div>
  )
}


// ——————————————————————————————————————————
// MARK: SearchBar
// ——————————————————————————————————————————
function SearchBar({
  value,
  onChange,
}: { value: string; onChange: (v: string) => void }) {
  return (
    <motion.div
      className="px-1 pb-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search projects, stacks, features…"
          className="rounded-2xl h-11 pl-10 bg-neutral-900/80 border-neutral-800/60 placeholder:text-neutral-600 focus:border-amber-700/25 focus:ring-amber-700/10 transition-all duration-300"
        />
      </div>
    </motion.div>
  )
}


// ——————————————————————————————————————————
// MARK: About Section
// ——————————————————————————————————————————
function AboutCard() {
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="glow-card rounded-2xl bg-neutral-900/50 backdrop-blur-sm">
          <div className="accent-line" />
          <CardHeader>
            <CardTitle className="text-base font-semibold text-neutral-100 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-amber-600/60 to-stone-500/40" />
              About
            </CardTitle>
            <CardDescription className="text-neutral-400 leading-relaxed">
              {ABOUT_ME.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {ABOUT_ME.skills.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <Badge
                    variant="outline"
                    className="badge-premium rounded-xl text-xs py-1 px-3 cursor-default"
                  >
                    {s}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <Separator className="bg-neutral-800/60" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {ABOUT_ME.stats.map((item, index) => (
                <motion.div
                  key={index}
                  className="stat-item text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-2xl font-bold bg-gradient-to-br from-neutral-100 to-stone-400 bg-clip-text text-transparent">
                    {item.value}
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1">{item.label}</div>
                </motion.div>
              ))}
            </div>

            <Separator className="bg-neutral-800/60" />

            {/* CTA Block */}
            <motion.div
              className="rounded-xl bg-gradient-to-r from-stone-900/30 to-neutral-900/20 border border-amber-800/10 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="text-sm font-medium text-neutral-100 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-600/60" />
                    Let's build something great
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    Open to freelance & collaborations
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a href={`mailto:${ABOUT_ME.socials.email}`}>
                    <Button className="cta-button rounded-xl h-9 text-white cursor-pointer text-xs font-medium">
                      <Mail className="h-3.5 w-3.5 mr-1.5" /> Contact
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    className="rounded-xl h-9 border-neutral-700/60 cursor-pointer text-xs hover:border-amber-700/20 hover:bg-amber-900/5 transition-all duration-300"
                    onClick={() => setPdfOpen(true)}
                  >
                    <Layers className="h-3.5 w-3.5 mr-1.5" /> CV
                  </Button>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </div>
      </motion.div>

      {/* Blog Link */}
      <motion.div
        className="my-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <a href="https://jervi-writes.netlify.app" target="_blank" rel="noreferrer">
          <div className="blog-card-gradient rounded-2xl p-4 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-900/10 border border-amber-800/15 flex items-center justify-center">
                  <PenTool className="h-4 w-4 text-amber-600/70" />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-200">Dev Blog</div>
                  <div className="text-[11px] text-neutral-500">I write about dev stuff too</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-neutral-600 group-hover:text-amber-600/70 transition-colors duration-300" />
            </div>
          </div>
        </a>
      </motion.div>

      {/* Social bar */}
      <motion.div
        className="social-bar mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <a href={ABOUT_ME.socials.github} target="_blank" rel="noreferrer">
          <div className="social-icon cursor-pointer">
            <Github className="h-4 w-4" />
          </div>
        </a>
        <a href={ABOUT_ME.socials.linkedIn} target="_blank" rel="noreferrer">
          <div className="social-icon cursor-pointer">
            <Linkedin className="h-4 w-4" />
          </div>
        </a>
        <a href={ABOUT_ME.socials.instagram} target="_blank" rel="noreferrer">
          <div className="social-icon cursor-pointer">
            <Instagram className="h-4 w-4" />
          </div>
        </a>
        <a href={`mailto:${ABOUT_ME.socials.email}`}>
          <div className="social-icon cursor-pointer">
            <Mail className="h-4 w-4" />
          </div>
        </a>
        <a
          href="https://github.com/Jervi-sir/yet-an-other-porfolio-but-in-vertical"
          target="_blank"
          rel="noreferrer"
        >
          <div className="social-icon cursor-pointer" title="Site's repo">
            <ExternalLink className="h-4 w-4" />
          </div>
        </a>
      </motion.div>

      {/* PDF Dialog */}
      <Dialog open={pdfOpen} onOpenChange={setPdfOpen}>
        <DialogContent className="sm:max-w-[900px] border-neutral-800 bg-neutral-950 text-neutral-200">
          <DialogHeader>
            <DialogTitle className="text-neutral-100">Portfolio (PDF Preview)</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Preview your CV. Use the actions below to open in a new tab or download.
            </DialogDescription>
          </DialogHeader>

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
              Tip: If the PDF doesn't render, click "Open in new tab".
            </div>
            <div className="flex gap-2">
              <a href={ABOUT_ME.pdf_portfolio} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-xl border-neutral-700">
                  Open in new tab
                </Button>
              </a>
              <a href={ABOUT_ME.pdf_portfolio} download>
                <Button className="rounded-xl cta-button text-white">Download</Button>
              </a>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>

  )
}


// ——————————————————————————————————————————
// MARK: Project Section
// ——————————————————————————————————————————
function ProjectsTab({ filtered, PROJECTS }: { filtered: Project[]; PROJECTS: Project[] }) {
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([])
  itemRefs.current = Array(filtered.length).fill(null)

  const { idx, onScroll } = useTopVisibleIndex(itemRefs, viewportRef as any)

  const [hovered, setHovered] = React.useState<number | null>(null)
  const [current, setCurrent] = React.useState(1)

  const lastInteractionRef = React.useRef<"scroll" | "hover" | null>(null)

  const display = hovered ?? current

  React.useEffect(() => {
    if (hovered === null && lastInteractionRef.current === "scroll") {
      setCurrent(idx)
    }
  }, [idx, hovered])

  const handleScroll = React.useCallback(() => {
    lastInteractionRef.current = "scroll"
    onScroll()
  }, [onScroll])

  return (
    <TabsContent value="projects" className="m-0 px-1">
      <motion.div
        className="flex items-center justify-between mb-3 px-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-sm text-neutral-500 flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-amber-600/50" />
          <span>
            <span className="text-neutral-300 font-medium">{display}</span>
            <span className="text-neutral-600"> / </span>
            <span>{PROJECTS.length} projects</span>
          </span>
        </div>
      </motion.div>

      <ScrollArea
        className="h-[calc(100dvh-210px)] pr-4"
        viewportRef={viewportRef as any}
        onViewportScroll={handleScroll}
      >
        <ProjectsList
          projects={filtered}
          itemRefs={itemRefs}
          onHover={(i) => {
            lastInteractionRef.current = "hover"
            setHovered(i)
          }}
          onLeave={(i) => {
            lastInteractionRef.current = "hover"
            setCurrent(i)
            setHovered(null)
          }}
        />
      </ScrollArea>
    </TabsContent>
  )
}


function ProjectsList({
  projects,
  itemRefs,
  onHover,
  onLeave,
}: {
  projects: Project[]
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  onHover: (index1Based: number) => void
  onLeave: (index1Based: number) => void
}) {
  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            ref={(el) => (itemRefs.current[i] = el) as any}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            onMouseEnter={() => onHover(i + 1)}
            onMouseLeave={() => onLeave(i + 1)}
            onFocus={() => onHover(i + 1)}
            onBlur={() => onLeave(i + 1)}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Track mouse position for radial glow
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="glow-card rounded-2xl bg-neutral-900/50 backdrop-blur-sm p-0"
    >
      <div className="accent-line" />
      <CardHeader className="pb-1 pt-4 px-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-[15px] font-semibold leading-tight text-neutral-100">
              {project.title}
            </CardTitle>
            {project.subtitle && (
              <CardDescription className="mt-0.5 text-neutral-500 text-[13px]">
                {project.subtitle}
              </CardDescription>
            )}
          </div>
          <Badge
            variant="outline"
            className="rounded-lg text-[10px] px-2 py-0.5 border-neutral-700/60 text-neutral-500 bg-neutral-800/40 shrink-0"
          >
            {project.year}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 px-5 pb-4">
        <p className="text-[13px] text-neutral-400 mb-3 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.skills.map((s) => (
            <span
              key={s}
              className={`skill-pill text-[10px] border px-2 py-0.5 rounded-lg cursor-default transition-all duration-200 ${skillColor[s] ??
                "bg-neutral-800/70 text-neutral-400 border-neutral-700/60"
                }`}
            >
              {s}
            </span>
          ))}
        </div>

        {(project.link || project.repo) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer">
                <Button
                  size="sm"
                  className="cta-button rounded-xl h-8 text-white text-xs cursor-pointer"
                >
                  <LinkIcon className="h-3.5 w-3.5 mr-1" /> Live
                </Button>
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl h-8 border-neutral-700/60 text-xs cursor-pointer hover:border-amber-700/20 hover:bg-amber-900/5 transition-all duration-300"
                >
                  <Github className="h-3.5 w-3.5 mr-1" /> Code
                </Button>
              </a>
            )}
          </div>
        )}
      </CardContent>
    </div>
  )
}


export function useTopVisibleIndex(
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  rootRef: React.RefObject<HTMLDivElement>,
) {
  const [idx, setIdx] = React.useState(1)

  const recompute = React.useCallback(() => {
    const root = rootRef.current
    if (!root) return

    const rootTop = root.getBoundingClientRect().top
    const arr = itemRefs.current

    let i = 0
    for (; i < arr.length; i++) {
      const node = arr[i]
      if (!node) continue
      const rect = node.getBoundingClientRect()
      if (rect.bottom > rootTop + 1) break
    }
    setIdx(Math.min(i + 1, arr.length || 1))
  }, [rootRef, itemRefs])

  React.useEffect(() => {
    recompute()
    window.addEventListener("resize", recompute)
    return () => window.removeEventListener("resize", recompute)
  }, [recompute])

  return { idx, onScroll: recompute }
}


// ——————————————————————————————————————————
// MARK: App()
// ——————————————————————————————————————————
export default function App() {
  const [query, setQuery] = useState("")
  const [activeSkills] = useState<string[]>([])
  const [tab, setTab] = useState("about")

  const filtered = useMemo(() => {
    if (query.length > 0) setTab("projects");
    return PROJECTS.filter((p) => {
      const matchesQuery = `${p.title} ${p.subtitle ?? ""} ${p.description} ${p.skills.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesSkills =
        activeSkills.length === 0 || activeSkills.every((s) => p.skills.includes(s as any))
      return matchesQuery && matchesSkills
    })
  }, [query, activeSkills])

  return (
    <div className="min-h-[100dvh] w-full bg-neutral-950 flex flex-col items-center text-neutral-200 relative overflow-hidden">
      <Particles />

      <div className="w-full max-w-[460px] md:max-w-[520px] lg:max-w-[560px] px-3 sm:px-4 relative z-10">
        {/* Sticky header */}
        <div className="sticky top-0 z-40 glass-header rounded-b-2xl px-1">
          <PortfolioHeader />
          <SearchBar value={query} onChange={setQuery} />
          <Tabs value={tab} onValueChange={setTab} className="px-1 pb-3">
            <TabsList className="grid w-full grid-cols-2 rounded-xl bg-neutral-900/80 border border-neutral-800/50 h-10">
              <TabsTrigger
                value="about"
                className="data-[state=active]:bg-neutral-800/60 data-[state=active]:text-neutral-200 data-[state=active]:border-amber-800/15 rounded-lg transition-all duration-300 text-neutral-500 text-sm"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="data-[state=active]:bg-neutral-800/60 data-[state=active]:text-neutral-200 data-[state=active]:border-amber-800/15 rounded-lg transition-all duration-300 text-neutral-500 text-sm"
              >
                Projects
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <Tabs value={tab} onValueChange={setTab} className="mt-3">
          <TabsContent value="about" className="m-0 px-1">
            <ScrollArea className="h-[calc(100dvh-195px)] pr-4">
              <AboutCard />
            </ScrollArea>
          </TabsContent>

          <TabsContent value="projects" className="m-0 px-1">
            <ProjectsTab filtered={filtered} PROJECTS={PROJECTS} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
