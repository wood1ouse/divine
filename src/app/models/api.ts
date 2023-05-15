export interface TrelloMember {
  id: string;
  aaId: string;
  activityBlocked: boolean;
  avatarHash: string;
  avatarUrl: string;
  bio: string;
  bioData: null;
  confirmed: boolean;
  fullName: string;
  idEnterprise: null;
  idEnterprisesDeactivated: string[];
  idMemberReferrer: null;
  idPremOrgsAdmin: string[];
  initials: string;
  memberType: string;
  nonPublic: {};
  nonPublicAvailable: boolean;
  products: any[];
  url: string;
  username: string;
  status: string;
  aaBlockSyncUntil: null;
  aaEmail: null;
  aaEnrolledDate: null;
  avatarSource: string;
  credentialsRemovedCount: number;
  domainClaimed: null;
  email: string;
  gravatarHash: string;
  idBoards: string[];
  idOrganizations: string[];
  idEnterprisesAdmin: string[];
  limits: {
    boards: {
      totalPerMember: {
        status: string;
        disableAt: number;
        warnAt: number;
      };
    };
    orgs: {
      totalPerMember: {
        status: string;
        disableAt: number;
        warnAt: number;
      };
    };
  };
  loginTypes: string[];
  marketingOptIn: {
    optedIn: boolean;
    date: string;
  };
  messagesDismissed: any[];
  oneTimeMessagesDismissed: string[];
  prefs: {
    privacy: {
      fullName: string;
      avatar: string;
    };
    sendSummaries: boolean;
    minutesBetweenSummaries: number;
    minutesBeforeDeadlineToNotify: number;
    colorBlind: boolean;
    locale: string;
  };
  trophies: any[];
  uploadedAvatarHash: null;
  uploadedAvatarUrl: null;
  premiumFeatures: string[];
  isAaMastered: boolean;
  ixUpdate: string;
}

export interface TrelloCard {
  id: string;
  badges: {
    attachmentsByType: {
      trello: {
        board: number;
        card: number;
      };
    };
    location: boolean;
    votes: number;
    viewingMemberVoted: boolean;
    subscribed: boolean;
    fogbugz: string;
    checkItems: number;
    checkItemsChecked: number;
    checkItemsEarliestDue: null;
    comments: number;
    attachments: number;
    description: boolean;
    due: null;
    dueComplete: boolean;
    start: null;
  };
  checkItemStates: null;
  closed: boolean;
  dueComplete: boolean;
  dateLastActivity: string;
  desc: string;
  descData: {
    emoji: {};
  };
  due: null;
  dueReminder: null;
  email: null;
  idBoard: string;
  idChecklists: string[];
  idList: string;
  idMembers: string[];
  idMembersVoted: string[];
  idShort: number;
  idAttachmentCover: null;
  labels: any[];
  idLabels: string[];
  manualCoverAttachment: boolean;
  name: string;
  pos: number;
  shortLink: string;
  shortUrl: string;
  start: null;
  subscribed: boolean;
  url: string;
  cover: {
    idAttachment: null;
    color: null;
    idUploadedBackground: null;
    size: string;
    brightness: string;
    idPlugin: null;
  };
  isTemplate: boolean;
  cardRole: null;
}

export interface TrelloBoard {
  id: string;
  name: string;
  url: string;
}

export interface TrelloList {
  id: string;
  name: CardListsNames;
  closed: boolean;
  idBoard: string;
  pos: number;
  status: any;
}

export enum CardListsNames {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  CODE_REVIEW = 'Code Review',
  DONE = 'Done',
}
