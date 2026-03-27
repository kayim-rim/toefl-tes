export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          name: string
          email: string | null
          password: string | null
          role: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          username: string
          name: string
          email?: string | null
          password?: string | null
          role?: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          name?: string
          email?: string | null
          password?: string | null
          role?: string
          status?: string
          created_at?: string
        }
      }
      test_results: {
        Row: {
          id: string
          user_id: string | null
          name: string
          institution: string | null
          package_id: string
          listening_raw: number
          structure_raw: number
          reading_raw: number
          listening_score: number
          structure_score: number
          reading_score: number
          total_score: number
          answers: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          institution?: string | null
          package_id: string
          listening_raw?: number
          structure_raw?: number
          reading_raw?: number
          listening_score?: number
          structure_score?: number
          reading_score?: number
          total_score?: number
          answers?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          institution?: string | null
          package_id?: string
          listening_raw?: number
          structure_raw?: number
          reading_raw?: number
          listening_score?: number
          structure_score?: number
          reading_score?: number
          total_score?: number
          answers?: Json | null
          created_at?: string
        }
      }
      learning_progress: {
        Row: {
          id: string
          user_id: string | null
          skill_id: string
          answered: number
          correct: number
          completed: boolean
          score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          skill_id: string
          answered?: number
          correct?: number
          completed?: boolean
          score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          skill_id?: string
          answered?: number
          correct?: number
          completed?: boolean
          score?: number | null
          created_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string | null
          question_type: string
          question_id: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          question_type: string
          question_id: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          question_type?: string
          question_id?: number
          created_at?: string
        }
      }
      rate_limits: {
        Row: {
          id: string
          key: string
          count: number
          reset_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          count?: number
          reset_at: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          count?: number
          reset_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type User = Database['public']['Tables']['users']['Row']
export type TestResult = Database['public']['Tables']['test_results']['Row']
export type LearningProgress = Database['public']['Tables']['learning_progress']['Row']
export type Bookmark = Database['public']['Tables']['bookmarks']['Row']

export type NewTestResult = Database['public']['Tables']['test_results']['Insert']
