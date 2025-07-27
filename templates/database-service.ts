import { supabase } from './supabase-client';

// Generic database service for any table
export class DatabaseService {
  // Insert data into any table
  static async insert<T>(table: string, data: T) {
    const { data: result, error } = await supabase
      .from(table)
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error(`Error inserting into ${table}:`, error);
      throw error;
    }

    return result;
  }

  // Get all data from a table
  static async getAll<T>(table: string): Promise<T[]> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching from ${table}:`, error);
      throw error;
    }

    return data || [];
  }

  // Get data by ID
  static async getById<T>(table: string, id: string): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching from ${table} by ID:`, error);
      throw error;
    }

    return data;
  }

  // Update data
  static async update<T>(table: string, id: string, updates: Partial<T>): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating ${table}:`, error);
      throw error;
    }

    return data;
  }

  // Delete data
  static async delete(table: string, id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting from ${table}:`, error);
      throw error;
    }
  }

  // Get data with filters
  static async getWithFilters<T>(table: string, filters: Record<string, any>): Promise<T[]> {
    let query = supabase.from(table).select('*');

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching from ${table} with filters:`, error);
      throw error;
    }

    return data || [];
  }

  // Count records
  static async count(table: string): Promise<number> {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error(`Error counting ${table}:`, error);
      throw error;
    }

    return count || 0;
  }
}
