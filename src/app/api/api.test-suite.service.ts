import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'environments/environment';
import { Database, TestSuite } from '@models/database';

@Injectable({
  providedIn: 'root',
})
export class ApiTestSuiteService {
  private supabase = createClient<Database>(
    environment['SUPABASE_URL'],
    environment['SUPABASE_KEY']
  );

  async getTestSuites(projectId: number): Promise<TestSuite[]> {
    const { data, error } = await this.supabase
      .from('test_suites')
      .select('*')
      .eq('project_id', projectId);

    if (!data || error) throw Error();

    return data;
  }

  async getAllTestSuites(): Promise<TestSuite[]> {
    const { data, error } = await this.supabase.from('test_suites').select('*');

    if (!data || error) throw Error();

    return data;
  }

  async createTestSuite(
    projectId: number,
    name: string,
    description: string
  ): Promise<number> {
    const { data, error } = await this.supabase
      .from('test_suites')
      .insert({
        name: name,
        description: description,
        project_id: projectId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (!data || error) throw Error();

    return data.id;
  }
}
