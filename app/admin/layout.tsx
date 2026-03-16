"use client"

import React from 'react';
import { useAdminStore } from '@/app/admin/components/store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const saving = useAdminStore((s) => s.saving);
  const fetchProjects = useAdminStore((s) => s.fetchProjects);

  React.useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="min-h-[100dvh] bg-neutral-950 flex flex-col text-neutral-200 relative w-full">
      <header className="h-16 border-b border-neutral-800/80 flex items-center px-4 md:px-8 justify-between bg-neutral-950/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-300 bg-clip-text text-transparent flex justify-center items-center gap-2">
              <div className="w-5 h-5 rounded-md border border-amber-500/30 bg-amber-500/10 flex items-center justify-center pointer-events-none">
                <div className="w-2.5 h-2.5 bg-amber-500 rounded-sm" />
              </div>
              Admin Panel
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-500 hidden sm:flex items-center gap-2">
            {saving ? (
              <><span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> Syncing</>
            ) : (
              <><span className="w-2 h-2 rounded-full bg-green-500" /> Synced with server</>
            )}
          </span>
          <Button variant="ghost" size="sm" asChild className="text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors font-medium">
            <Link href="/">View Live Site</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 px-4 md:px-8 py-8 w-full max-w-7xl mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
