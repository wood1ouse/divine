import { Injectable } from '@angular/core';
import {
  createClient,
  PostgrestResponse,
  PostgrestSingleResponse,
} from '@supabase/supabase-js';
import { environment } from 'environments/environment';
import { Database, Project } from '@models/database';

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
    return this.supabase.from('projects').insert({
      name,
      description,
      api_token: uuidv4(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
}
