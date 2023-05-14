import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'environments/environment';
import { Database, TestCase } from '@models/database';

@Injectable({
  providedIn: 'root',
})
export class ApiTestCaseService {
  private supabase = createClient<Database>(
    environment['SUPABASE_URL'],
    environment['SUPABASE_KEY']
  );

  async getTestCases(testSuiteId: number): Promise<TestCase[]> {
    const { data, error } = await this.supabase
      .from('test_cases')
      .select('*')
      .eq('test_suite_id', testSuiteId);

    if (!data || error) throw Error();

    return data;
  }

  async createTestCase(
    title: string,
    description: string,
    status: string,
    testSuiteId: number
  ): Promise<number> {
    const { data, error } = await this.supabase
      .from('test_cases')
      .insert({
        title,
        description,
        status,
        test_suite_id: testSuiteId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (!data || error) throw Error();

    return data.id;
  }
}
