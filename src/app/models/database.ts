export interface Database {
  public: {
    Tables: {
      project_invites: {
        Row: {
          id: number;
          invite_token: string;
          invite_token_expiration: string;
          project_id: number;
        };
        Insert: {
          id?: number;
          invite_token: string;
          invite_token_expiration: string;
          project_id: number;
        };
        Update: {
          id?: number;
          invite_token?: string;
          invite_token_expiration?: string;
          project_id?: number;
        };
      };
      project_users: {
        Row: {
          project_id: number;
          user_id: string;
        };
        Insert: {
          project_id: number;
          user_id: string;
        };
        Update: {
          project_id?: number;
          user_id?: string;
        };
      };
      projects: {
        Row: {
          api_token: string | null;
          created_at: string;
          description: string | null;
          id: number;
          name: string;
          owner_id: string | null;
          updated_at: string;
        };
        Insert: {
          api_token?: string | null;
          created_at: string;
          description?: string | null;
          id?: number;
          name: string;
          owner_id?: string | null;
          updated_at: string;
        };
        Update: {
          api_token?: string | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string;
          owner_id?: string | null;
          updated_at?: string;
        };
      };
      test_cases: {
        Row: {
          created_at: string;
          description: string | null;
          expected_result: string | null;
          id: number;
          status: string;
          steps: string | null;
          test_suite_id: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at: string;
          description?: string | null;
          expected_result?: string | null;
          id?: number;
          status?: string;
          steps?: string | null;
          test_suite_id: number;
          title: string;
          updated_at: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          expected_result?: string | null;
          id?: number;
          status?: string;
          steps?: string | null;
          test_suite_id?: number;
          title?: string;
          updated_at?: string;
        };
      };
      test_suites: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          name: string;
          project_id: number;
          updated_at: string;
        };
        Insert: {
          created_at: string;
          description?: string | null;
          id?: number;
          name: string;
          project_id: number;
          updated_at: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string;
          project_id?: number;
          updated_at?: string;
        };
      };
      trello_users: {
        Row: {
          api_key: string;
          id: number;
          token: string;
          user_id: string | null;
        };
        Insert: {
          api_key: string;
          id?: number;
          token: string;
          user_id?: string | null;
        };
        Update: {
          api_key?: string;
          id?: number;
          token?: string;
          user_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectInvite =
  Database['public']['Tables']['project_invites']['Row'];
export type TestSuite = Database['public']['Tables']['test_suites']['Row'];
