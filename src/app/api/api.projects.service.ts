import { Injectable } from '@angular/core';
import { createClient, PostgrestSingleResponse } from '@supabase/supabase-js';
import { environment } from 'environments/environment';
import { Database, Project, ProjectInvite } from '@models/database';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ApiProjectsService {
  private supabase = createClient<Database>(
    environment['SUPABASE_URL'],
    environment['SUPABASE_KEY']
  );

  async getProjects(): Promise<Project[]> {
    const { data: userData } = await this.supabase.auth.getUser();

    if (!userData || !userData.user) {
      throw new Error('User not authenticated');
    }

    const { data: projectIdsData, error: projectIdsError } = await this.supabase
      .from('project_users')
      .select('project_id')
      .eq('user_id', userData.user.id);

    if (projectIdsError) {
      throw projectIdsError;
    }

    const projectIds = projectIdsData.map((entry) => entry.project_id);

    const { data: projectsData, error: projectsError } = await this.supabase
      .from('projects')
      .select('*')
      .in('id', projectIds);

    if (projectsError) {
      throw projectsError;
    }

    return projectsData;
  }

  async createProject(
    name: string,
    description?: string
  ): Promise<PostgrestSingleResponse<null>> {
    const { data: ownerData, error: ownerError } =
      await this.supabase.auth.getUser();

    if (!ownerData || !ownerData.user || ownerError) throw ownerError;

    return this.supabase.from('projects').insert({
      name,
      description,
      api_token: uuidv4(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      owner_id: ownerData.user.id,
    });
  }

  async updateInviteToken(projectId: number) {
    const currentTime = new Date();

    const { data, error } = await this.supabase
      .from('project_invites')
      .update({
        invite_token: uuidv4(),
        invite_token_expiration: new Date(
          currentTime.getTime() + 10 * 1000
        ).toISOString(),
      })
      .match({ project_id: projectId })
      .select()
      .single();

    if (!data || error) throw error;

    return data;
  }

  async getProjectInvite(projectId: number): Promise<ProjectInvite> {
    const { data, error } = await this.supabase
      .from('project_invites')
      .select('*')
      .eq('project_id', projectId)
      .single();
    if (!data || error) throw Error;

    return data;
  }

  async joinProject(inviteToken: string): Promise<number> {
    const { data: projectInvitesData, error: projectInvitesError } =
      await this.supabase
        .from('project_invites')
        .select('*')
        .eq('invite_token', inviteToken)
        .single();

    const { data: userData } = await this.supabase.auth.getUser();

    if (
      !projectInvitesData ||
      !userData ||
      !userData.user ||
      projectInvitesError
    )
      throw Error();

    const { data: projectUsersData, error: projectUserError } =
      await this.supabase
        .from('project_users')
        .insert({
          project_id: projectInvitesData.project_id,
          user_id: userData.user.id,
        })
        .select()
        .single();

    if (!projectUsersData || projectUserError) throw projectUserError;

    return projectUsersData.project_id;
  }
}
