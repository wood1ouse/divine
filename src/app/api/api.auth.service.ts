import { Injectable } from '@angular/core';
import { ClientTokens } from '@models/auth';
import { createClient, User } from '@supabase/supabase-js';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
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

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  async getUserFromLocalStorage(): Promise<User | null> {
    const persistedToken = localStorage.getItem(ClientTokens.SUPABASE_USER);

    if (persistedToken) {
      const parsedToken = JSON.parse(persistedToken);
      const { data } = await this.supabase.auth.getUser(
        parsedToken.access_token
      );

      if (data.user) {
        return data.user;
      }
    }

    return null;
  }
}
