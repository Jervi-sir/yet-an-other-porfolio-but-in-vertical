"use client"

import { create } from 'zustand';
import type { Project } from '@/src/types';

interface AdminState {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  fetchProjects: () => Promise<void>;
  saveProjects: (newProjects: Project[]) => Promise<void>;
  saving: boolean;
}

export const useAdminStore = create<AdminState>((set) => ({
  projects: [],
  saving: false,
  setProjects: (projects) => set({ projects }),
  fetchProjects: async () => {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      set({ projects: data });
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  },
  saveProjects: async (newProjects) => {
    set({ saving: true });
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProjects),
      });
      if (!res.ok) throw new Error('Failed to save');
      
      // Update local store by merging the saved projects
      set((state) => {
        const merged = [...state.projects];
        newProjects.forEach(np => {
          const idx = merged.findIndex(p => p.id === np.id);
          if (idx !== -1) merged[idx] = np;
          else merged.push(np);
        });
        // Important: Re-sort the merged list by orderIndex to keep UI consistent
        return { 
          projects: merged.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0)),
          saving: false 
        };
      });
    } catch (err) {
      alert('Error saving projects');
      console.error(err);
    }
    set({ saving: false });
  }
}));
