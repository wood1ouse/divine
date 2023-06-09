import { HttpContext, HttpContextToken } from '@angular/common/http';

export enum Services {
  TRELLO = 'trello',
  DEFAULT = 'default',
}

export const trelloServiceUrl = 'https://api.trello.com';
export const trelloPrefix = '/1/';

export const SERVICE_TOKEN: HttpContextToken<Services> =
  new HttpContextToken<Services>(() => Services.DEFAULT);

export const TRELLO_CONTEXT: HttpContext = new HttpContext().set(
  SERVICE_TOKEN,
  Services.TRELLO
);

export const TrelloEndpoints = {
  account: {
    link: () => `members/me`,
  },
  boards: {
    getBoards: () => `members/me/boards`,
    getBoard: (boardId: string) => `boards/${boardId}`,
  },
  cards: {
    getCardsOnBoard: (boardId: string) => `boards/${boardId}/cards`,
    getListOnCard: (cardId: string) => `cards/${cardId}/list`,
    getCard: (cardId: string) => `cards/${cardId}`,
  },
  lists: {
    getList: (listId: string) => `lists/${listId}`,
  },
};
