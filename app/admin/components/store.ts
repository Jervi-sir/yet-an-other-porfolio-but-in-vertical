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
      set({ projects: newProjects });
    } catch (err) {
      alert('Error saving projects');
      console.error(err);
    }
    set({ saving: false });
  }
}));
