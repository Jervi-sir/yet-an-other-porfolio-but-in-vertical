"use client"

import React, { useState, useEffect } from "react";
import { useAdminStore } from "./store";
import { Button } from "@/components/ui/button";
import { ListOrdered, Plus, Edit2, Trash2, GripVertical, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project } from "@/src/types";

export function ProjectList() {
  const storeProjects = useAdminStore((s) => s.projects);
  const saveProjects = useAdminStore((s) => s.saveProjects);
  const saving = useAdminStore((s) => s.saving);
  const router = useRouter();

  // Local state for reordering
  const [items, setItems] = useState<Project[]>([]);
  const [hasChanged, setHasChanged] = useState(false);

  // Drag State
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<'before' | 'after' | null>(null);

  useEffect(() => {
    setItems(storeProjects);
  }, [storeProjects]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      saveProjects(storeProjects.filter((p) => p.id !== id));
    }
  };

  const handleDragStart = (id: string, e: React.DragEvent) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (id: string, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (draggingId === null || draggingId === id) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const position = e.clientY < midY ? 'before' : 'after';

    setDropTargetId(id);
    setDropPosition(position);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDropTargetId(null);
    setDropPosition(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    if (draggingId === null || dropTargetId === null || dropPosition === null || draggingId === dropTargetId) {
      handleDragEnd();
      return;
    }

    const currentItems = [...items];
    const draggedIndex = currentItems.findIndex(item => item.id === draggingId);
    const targetIndex = currentItems.findIndex(item => item.id === dropTargetId);

    if (draggedIndex === -1 || targetIndex === -1) {
      handleDragEnd();
      return;
    }

    const [draggedItem] = currentItems.splice(draggedIndex, 1);
    
    const newTargetIndex = currentItems.findIndex(item => item.id === dropTargetId);
    
    const insertIndex = dropPosition === 'after' ? newTargetIndex + 1 : newTargetIndex;
    currentItems.splice(insertIndex, 0, draggedItem);

    setItems(currentItems);
    setHasChanged(true);
    handleDragEnd();
  };

  const handleSaveOrder = async () => {
    const updatedProjects = items.map((item, index) => ({
      ...item,
      order: index
    }));
    await saveProjects(updatedProjects);
    setHasChanged(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ListOrdered className="h-5 w-5 text-amber-500" /> Manage Projects
          {saving && <Loader2 className="h-4 w-4 animate-spin text-amber-500 ml-2" />}
        </h2>
        <div className="flex items-center gap-2">
          {hasChanged && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleSaveOrder} 
              disabled={saving}
              className="border-amber-600/50 text-amber-500 hover:bg-amber-950/20 rounded-lg cursor-pointer"
            >
              <Save className="h-4 w-4 mr-1" /> {saving ? 'Saving...' : 'Save Order'}
            </Button>
          )}
          <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg cursor-pointer disabled:opacity-50" disabled={saving}>
            <Link href="/admin/new">
              <Plus className="h-4 w-4 mr-1" /> Add Project
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((p) => {
          const isDragging = draggingId === p.id;
          const isDropTarget = dropTargetId === p.id;

          return (
            <ProjectItem
              key={p.id}
              project={p}
              onDelete={handleDelete}
              onEdit={() => router.push(`/admin/edit/${p.id}`)}
              isDragging={isDragging}
              isDropTarget={isDropTarget}
              dropPosition={dropPosition}
              onDragStart={(e) => handleDragStart(p.id, e)}
              onDragOver={(e) => handleDragOver(p.id, e)}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
            />
          );
        })}
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-12 bg-neutral-900/30 rounded-2xl border border-dashed border-neutral-800">
          <p className="text-neutral-500">No projects found. Add your first project!</p>
        </div>
      )}
    </div>
  );
}

function ProjectItem({
  project: p,
  onDelete,
  onEdit,
  isDragging,
  isDropTarget,
  dropPosition,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd
}: {
  project: Project;
  onDelete: (id: string) => void;
  onEdit: () => void;
  isDragging: boolean;
  isDropTarget: boolean;
  dropPosition: 'before' | 'after' | null;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}) {
  return (
    <div 
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`
        bg-neutral-900/70 border rounded-xl p-4 flex items-center gap-4 transition-all hover:bg-neutral-900 group relative
        ${isDragging ? 'opacity-40 scale-[0.98] border-amber-500/50' : 'border-neutral-800/80'}
        ${isDropTarget && dropPosition === 'before' ? 'border-t-2 border-t-amber-500 rounded-t-none ring-1 ring-amber-500/20' : ''}
        ${isDropTarget && dropPosition === 'after'  ? 'border-b-2 border-b-amber-500 rounded-b-none ring-1 ring-amber-500/20' : ''}
      `}
    >
      {/* Visual line indicator for "before" */}
      {isDropTarget && dropPosition === 'before' && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-500 -mt-0.5 z-10" />
      )}

      <div 
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className="text-neutral-600 hover:text-neutral-300 transition-colors cursor-grab active:cursor-grabbing p-1 rounded"
      >
        <GripVertical className="h-5 w-5" />
      </div>

      <div className="min-w-[200px] max-w-xs shrink-0 flex flex-col">
        <h3 className="font-semibold text-neutral-100 truncate text-base">{p.title}</h3>
        <div className="text-xs text-neutral-500 truncate mt-0.5">{p.subtitle || 'No subtitle'}</div>
        <div className="hidden md:flex flex-wrap gap-1.5 mt-2">
          {p.skills.slice(0, 4).map((s) => (
            <span key={s} className="text-[10px] bg-neutral-800/80 border border-neutral-700/60 px-2 py-0.5 rounded-md text-neutral-400 truncate max-w-[100px]">{s}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-6 shrink-0 ml-auto pointer-events-auto">
        <div className="text-xs font-mono text-neutral-500 bg-neutral-800/50 px-2 py-1 rounded-md hidden sm:block">{p.year}</div>
        <div className="flex gap-2 shrink-0">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-neutral-400 bg-neutral-800/50 hover:bg-neutral-800 hover:text-white transition-all cursor-pointer rounded-lg" 
            onClick={onEdit} 
            title="Edit Project"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-red-500 bg-red-950/20 hover:bg-red-900/40 hover:text-red-300 transition-all cursor-pointer rounded-lg" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(p.id);
            }} 
            title="Delete Project"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Visual line indicator for "after" */}
      {isDropTarget && dropPosition === 'after' && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 -mb-0.5 z-10" />
      )}
    </div>
  );
}
