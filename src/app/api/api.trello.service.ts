import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TRELLO_CONTEXT, TrelloEndpoints } from './endpoints';
import { TrelloBoard, TrelloCard, TrelloList, TrelloMember } from '@models/api';
import { lastValueFrom, Observable, of } from 'rxjs';
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

  getBoards(): Observable<TrelloBoard[]> {
    return this.httpClient.get<TrelloBoard[]>(
      TrelloEndpoints.boards.getBoards(),
      {
        context: TRELLO_CONTEXT,
        params: { key: this.apiKey, token: this.token, fields: 'name,url' },
      }
    );
  }

  getCards(boardId: string): Observable<TrelloCard[]> {
    if (!this.apiKey || !this.token) {
      return of([]) as Observable<TrelloCard[]>;
    }
    return this.httpClient.get<TrelloCard[]>(
      TrelloEndpoints.cards.getCardsOnBoard(boardId),
      {
        context: TRELLO_CONTEXT,
        params: { key: this.apiKey, token: this.token },
      }
    );
  }

  getBoard(boardId: string): Observable<TrelloBoard> {
    if (!this.apiKey || !this.token) {
      return of({}) as Observable<TrelloBoard>;
    }
    return this.httpClient.get<TrelloBoard>(
      TrelloEndpoints.boards.getBoard(boardId),
      {
        context: TRELLO_CONTEXT,
        params: { key: this.apiKey, token: this.token, fields: 'name' },
      }
    );
  }

  getCard(cardId: string): Observable<TrelloCard> {
    if (!this.apiKey || !this.token) {
      return of({}) as Observable<TrelloCard>;
    }
    return this.httpClient.get<TrelloCard>(
      TrelloEndpoints.cards.getCard(cardId),
      {
        context: TRELLO_CONTEXT,
        params: { key: this.apiKey, token: this.token, fields: 'name' },
      }
    );
  }

  getListOnCard(listId: string): Observable<TrelloList> {
    if (!this.apiKey || !this.token) {
      return of({}) as Observable<TrelloList>;
    }
    return this.httpClient.get<TrelloList>(
      TrelloEndpoints.cards.getListOnCard(listId),
      {
        context: TRELLO_CONTEXT,
        params: { key: this.apiKey, token: this.token, fields: 'name' },
      }
    );
  }
}
