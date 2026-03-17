"use client"

import React, { useState, useEffect } from "react";
import type { Project, Skill } from "@/src/types";
import { useAdminStore } from "./store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Lexical Imports
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND } from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { ListNode, ListItemNode, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";

import {
  Save, X, ArrowLeft, Bold, Italic, List,
  Sparkles, Loader2,
  Plus
} from "lucide-react";
import { useRouter } from "next/navigation";

// Lexical Theme
const lexicalTheme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "mb-2",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    underlineStrikethrough: "underline line-through",
  },
  list: {
    ul: "list-disc ml-4 mb-2",
    ol: "list-decimal ml-4 mb-2",
    listitem: "list-none",
  }
};

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat('bold'));
          setIsItalic(selection.hasFormat('italic'));
        }
        return false;
      },
      1
    );
  }, [editor]);

  return (
    <div className="bg-neutral-900 flex-shrink-0 border-b border-neutral-800 p-2 flex gap-2 overflow-x-auto no-scrollbar">
      <Button
        type="button"
        size="icon"
        variant={isBold ? 'secondary' : 'ghost'}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className="h-8 w-8"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={isItalic ? 'secondary' : 'ghost'}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className="h-8 w-8"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        className="h-8 w-8"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};

const LexicalEditor = ({ content, onChange }: { content: string, onChange: (html: string) => void }) => {
  const initialConfig = {
    namespace: 'ProjectEditor',
    theme: lexicalTheme,
    onError: (error: Error) => console.error(error),
    nodes: [ListNode, ListItemNode],
  };

  return (
    <div className="border border-neutral-800 rounded-md overflow-hidden bg-neutral-900/50 flex flex-col">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={<ContentEditable className="p-4 prose prose-invert max-w-none prose-sm min-h-[300px] flex-1 focus:outline-none min-w-full" />}
            placeholder={<div className="absolute top-4 left-4 text-neutral-500 pointer-events-none text-sm">Description...</div>}
            ErrorBoundary={({ children }) => <>{children}</>}
          />
          <HistoryPlugin />
          <ListPlugin />
          <HtmlSyncPlugin content={content} onChange={onChange} />
        </div>
      </LexicalComposer>
    </div>
  );
};

// Helper plugin to sync Lexical with HTML
const HtmlSyncPlugin = ({ content, onChange }: { content: string, onChange: (html: string) => void }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Only update if the content from outside is different from internal state
    editor.getEditorState().read(() => {
      const currentHtml = $generateHtmlFromNodes(editor);
      if (content !== currentHtml) {
        editor.update(() => {
          const parser = new DOMParser();
          const dom = parser.parseFromString(content || '', 'text/html');
          const nodes = $generateNodesFromDOM(editor, dom);
          const root = $getRoot();
          root.clear();
          root.append(...nodes);
        });
      }
    });
  }, [content, editor]);

  return (
    <OnChangePlugin onChange={(editorState) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor);
        if (html !== content) {
          onChange(html);
        }
      });
    }} />
  );
};

export function ProjectUpsertForm({ id }: { id?: string }) {
  const projects = useAdminStore((s) => s.projects);
  const saveProjects = useAdminStore((s) => s.saveProjects);
  const isNew = !id;
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<Project>>({
    id: `p-${Date.now()}`,
    title: '',
    description: '',
    year: new Date().getFullYear(),
    skills: [],
    keyPoints: []
  });

  const [skillInput, setSkillInput] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiGenerator, setShowAiGenerator] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      const existing = projects.find((p) => p.id === id);
      if (existing) setFormData({ ...existing });
    }
  }, [id, isNew, projects]);

  const handleSaveForm = () => {
    if (!formData.title || !formData.id) return alert('Title is required');
    let projectToSave: Project;
    if (projects.some((p) => p.id === formData.id)) {
      projectToSave = formData as Project;
    } else {
      const maxOrder = projects.reduce((max, p) => Math.max(max, p.orderIndex || 0), 0);
      projectToSave = { ...formData, orderIndex: maxOrder + 10 } as Project;
    }
    
    saveProjects([projectToSave]).then(() => {
      router.push('/admin');
    });
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate project');
      }

      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        ...data
      }));
      setAiPrompt('');
      setShowAiGenerator(false); // Auto-hide after generation
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      alert("Failed to generate: " + errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const val = skillInput.trim();
      if (val && !formData.skills?.includes(val as Skill)) {
        setFormData({ ...formData, skills: [...(formData.skills || []), val as Skill] });
      }
      setSkillInput('');
    } else if (e.key === 'Backspace' && !skillInput && formData.skills?.length) {
      e.preventDefault();
      const newSkills = [...formData.skills];
      newSkills.pop();
      setFormData({ ...formData, skills: newSkills });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({ ...formData, skills: formData.skills?.filter((s) => s !== skillToRemove) });
  };

  const toggleKeyPoint = (index: number) => {
    const kp = [...(formData.keyPoints || [])];
    kp.splice(index, 1);
    setFormData({ ...formData, keyPoints: kp });
  };

  const addKeyPoint = () => {
    setFormData({ ...formData, keyPoints: [...(formData.keyPoints || []), ''] });
  };

  const updateKeyPoint = (index: number, val: string) => {
    const kp = [...(formData.keyPoints || [])];
    kp[index] = val;
    setFormData({ ...formData, keyPoints: kp });
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in slide-in-from-bottom-4 duration-500 ease-out fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push('/admin')} className="text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer rounded-full h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-100">
            {isNew ? 'Create New Project' : `Edit ${formData.title}`}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {isNew && (
            <Button
              variant="outline"
              onClick={() => setShowAiGenerator(!showAiGenerator)}
              className={`rounded-xl h-10 px-4 transition-all border-neutral-800 hover:bg-neutral-800 ${showAiGenerator ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' : 'text-neutral-400'}`}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {showAiGenerator ? 'Hide AI' : 'Generate with AI'}
            </Button>
          )}
          <Button onClick={handleSaveForm} className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-lg shadow-amber-900/20 cursor-pointer h-10 px-5 transition-transform active:scale-95">
            <Save className="h-4 w-4 mr-2" /> Save Draft
          </Button>
        </div>
      </div>

      <div className="space-y-8 bg-neutral-920 border border-neutral-800/60 p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-64 h-64 rounded-full bg-amber-900/10 blur-3xl pointer-events-none" />

        {isNew && showAiGenerator && (
          <div className="relative z-10 bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 mb-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 mb-3 text-amber-500 font-semibold text-sm">
              <Sparkles className="h-4 w-4" /> AI Project Generator
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe your project..."
                className="flex-1 bg-neutral-950/50 border border-neutral-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500/50 min-h-[60px] resize-y text-neutral-300"
                disabled={isGenerating}
              />
              <Button
                onClick={handleAIGenerate}
                disabled={isGenerating || !aiPrompt.trim()}
                className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 h-auto self-stretch shrink-0 md:w-32"
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Generate'}
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider ml-1">Title</label>
            <Input value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="bg-neutral-900/50 border-neutral-800 focus-visible:ring-amber-500/30 text-base h-11 rounded-xl" placeholder="Supernova App..." />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider ml-1">Year</label>
            <Input value={formData.year || ''} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="bg-neutral-900/50 border-neutral-800 focus-visible:ring-amber-500/30 text-base h-11 rounded-xl" placeholder="2026" />
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider ml-1">Subtitle</label>
          <Input value={formData.subtitle || ''} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className="bg-neutral-900/50 border-neutral-800 focus-visible:ring-amber-500/30 h-11 rounded-xl text-neutral-300" placeholder="A brief catchphrase..." />
        </div>

        <div className="space-y-2 relative z-10">
          <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider ml-1 flex justify-between">
            Short Description
          </label>
          <textarea
            className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 resize-y text-neutral-300 placeholder:text-neutral-600"
            rows={3}
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="A short punchy description..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider ml-1">Live Link</label>
            <Input value={formData.link || ''} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="bg-neutral-900/50 border-neutral-800 focus-visible:ring-amber-500/30 rounded-xl h-11 font-mono text-xs text-neutral-300" placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider ml-1">Source Code Repo</label>
            <Input value={formData.repo || ''} onChange={(e) => setFormData({ ...formData, repo: e.target.value })} className="bg-neutral-900/50 border-neutral-800 focus-visible:ring-amber-500/30 rounded-xl h-11 font-mono text-xs text-neutral-300" placeholder="https://github.com/..." />
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider ml-1 flex justify-between">
            Walkthrough Details
          </label>
          <LexicalEditor
            content={formData.details || ''}
            onChange={(html) => setFormData({ ...formData, details: html })}
          />
        </div>

        <div className="space-y-3 relative z-10">
          <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider ml-1">Key Highlights List</label>
          {(formData.keyPoints || []).map((kp, idx) => (
            <div key={idx} className="flex items-start gap-3 group">
              <textarea
                className="flex-1 bg-neutral-900/50 border border-neutral-800 rounded-xl p-3.5 text-sm min-h-[60px] focus:outline-none focus:border-amber-500/50 resize-y text-neutral-300 transition-all shadow-sm"
                value={kp}
                onChange={(e) => updateKeyPoint(idx, e.target.value)}
                placeholder="Highlight point..."
              />
              <Button variant="ghost" size="icon" className="text-red-400 shrink-0 mt-1 opacity-50 group-hover:opacity-100 hover:bg-red-950/40 transition-all rounded-lg cursor-pointer" onClick={() => toggleKeyPoint(idx)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addKeyPoint} className="border-neutral-800 hover:bg-neutral-900 border-dashed rounded-xl h-9 text-neutral-400 hover:text-neutral-200 transition-all cursor-pointer">
            <Plus className="h-3.5 w-3.5 mr-2" /> Add bullet point
          </Button>
        </div>

        <div className="space-y-4 pt-2 relative z-10">
          <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider ml-1">Tech Stack Tags</label>
          <div className="flex flex-wrap gap-2 p-3 bg-neutral-900/50 border border-neutral-800 rounded-xl focus-within:ring-2 focus-within:ring-amber-500/30 transition-all cursor-text" onClick={() => document.getElementById('skill-input')?.focus()}>
            {(formData.skills || []).map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-500 font-medium"
              >
                {skill}
                <button type="button" onClick={(e) => { e.stopPropagation(); removeSkill(skill); }} className="hover:text-amber-300">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <input
              id="skill-input"
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              className="flex-1 min-w-[150px] bg-transparent outline-none text-sm text-neutral-300 h-7"
              placeholder="Type a skill..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
