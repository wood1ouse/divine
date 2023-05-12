import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TRELLO_CONTEXT, TrelloEndpoints } from './endpoints';
import { TrelloCard, TrelloMember } from '@models/api';
import { lastValueFrom, Observable } from 'rxjs';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@models/database';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiTrelloService {
  apiKey: string;
  token: string;

  constructor(private httpClient: HttpClient) {}

  private supabase = createClient<Database>(
    environment['SUPABASE_URL'],
    environment['SUPABASE_KEY']
  );

  async checkLinkWithTrello(): Promise<{
    apiKey: string;
    token: string;
  } | null> {
    const { data: userData } = await this.supabase.auth.getUser();

    if (!userData || !userData.user) throw Error();

    const { data: trelloUserData } = await this.supabase
      .from('trello_users')
      .select('*')
      .eq('user_id', userData.user.id)
      .select()
      .single();

    if (trelloUserData) {
      return {
        apiKey: trelloUserData.api_key,
        token: trelloUserData.token,
      };
    } else {
      return null;
    }
  }

  async syncWithTrello(apiKey: string, token: string): Promise<TrelloMember> {
    const trelloMember = await lastValueFrom(
      this.httpClient.get<TrelloMember>(TrelloEndpoints.account.link(), {
        context: TRELLO_CONTEXT,
        params: { key: apiKey, token: token },
      })
    );

    if (trelloMember) {
      this.apiKey = apiKey;
      this.token = token;
    }

    return trelloMember;
  }

  async addUserToTrelloUsers(apiKey: string, token: string): Promise<void> {
    const { data: userData } = await this.supabase.auth.getUser();

    if (!userData || !userData.user) throw Error();

    await this.supabase
      .from('trello_users')
      .insert({ user_id: userData.user.id, token, api_key: apiKey });
  }

  getCards(boardId: string): Observable<TrelloCard[]> {
    return this.httpClient.get<TrelloCard[]>(
      TrelloEndpoints.cards.getCardsOnBoard(boardId),
      {
        context: TRELLO_CONTEXT,
        params: { key: this.apiKey, token: this.token },
      }
    );
  }
}
