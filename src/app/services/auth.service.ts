import { Injectable } from '@angular/core';

import { createClient, User } from '@supabase/supabase-js';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase = createClient(
    environment['SUPABASE_URL'],
    environment['SUPABASE_KEY']
  );

  async register(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    return { user: data.user, error };
  }

  async signIn(
    email: string,
    password: string
  ): Promise<{ user: User | null; error: Error | null }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { user: data.user, error };
  }
}
