'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  const validUser = process.env.ADMIN_USERNAME || 'admin';
  const validPassword = process.env.ADMIN_PASSWORD || 'password123';

  if (username === validUser && password === validPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin-auth', 'true', {
      maxAge: 60 * 10, // 10 minutes
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    
    redirect('/admin');
  }

  return { error: 'Invalid username or password' };
}
