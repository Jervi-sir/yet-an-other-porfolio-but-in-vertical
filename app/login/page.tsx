'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="w-full max-w-md space-y-8 p-8 border rounded-lg shadow-sm bg-card">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">Admin Login</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in to access the admin dashboard. Session expires in 10 minutes.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="username">
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                className="mt-2"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="mt-2"
              />
            </div>
          </div>

          {state?.error && (
            <div className="text-sm font-medium text-destructive">
              {state.error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
