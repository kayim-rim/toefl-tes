export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// User tier enum
export type UserTier = 'free' | 'tes' | 'student'

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
          tier: UserTier
          tier_expires_at: string | null
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
          tier?: UserTier
          tier_expires_at?: string | null
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
          tier?: UserTier
          tier_expires_at?: string | null
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
      subscription_packages: {
        Row: {
          id: string
          name: string
          tier: UserTier
          price: number
          duration_days: number
          description: string | null
          features: Json
          is_active: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          tier: UserTier
          price: number
          duration_days: number
          description?: string | null
          features?: Json
          is_active?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          tier?: UserTier
          price?: number
          duration_days?: number
          description?: string | null
          features?: Json
          is_active?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string | null
          package_id: string | null
          amount: number
          status: string
          payment_method: string | null
          payment_gateway: string | null
          gateway_transaction_id: string | null
          gateway_response: Json | null
          voucher_id: string | null
          notes: string | null
          paid_at: string | null
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          package_id?: string | null
          amount: number
          status?: string
          payment_method?: string | null
          payment_gateway?: string | null
          gateway_transaction_id?: string | null
          gateway_response?: Json | null
          voucher_id?: string | null
          notes?: string | null
          paid_at?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          package_id?: string | null
          amount?: number
          status?: string
          payment_method?: string | null
          payment_gateway?: string | null
          gateway_transaction_id?: string | null
          gateway_response?: Json | null
          voucher_id?: string | null
          notes?: string | null
          paid_at?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      vouchers: {
        Row: {
          id: string
          code: string
          tier: UserTier
          duration_days: number
          price: number
          max_uses: number
          used_count: number
          created_by: string | null
          notes: string | null
          is_active: boolean
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          tier: UserTier
          duration_days: number
          price?: number
          max_uses?: number
          used_count?: number
          created_by?: string | null
          notes?: string | null
          is_active?: boolean
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          tier?: UserTier
          duration_days?: number
          price?: number
          max_uses?: number
          used_count?: number
          created_by?: string | null
          notes?: string | null
          is_active?: boolean
          expires_at?: string | null
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          payment_id: string | null
          tier: UserTier
          started_at: string
          expires_at: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          payment_id?: string | null
          tier: UserTier
          started_at: string
          expires_at?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          payment_id?: string | null
          tier?: UserTier
          started_at?: string
          expires_at?: string | null
          status?: string
          created_at?: string
        }
      }
    }
    Views: {
      active_subscriptions: {
        Row: {
          id: string
          user_id: string
          username: string
          name: string
          email: string | null
          tier: UserTier
          started_at: string
          expires_at: string | null
          status: string
          is_active: boolean
        }
      }
      user_tier_summary: {
        Row: {
          id: string
          username: string
          name: string
          email: string | null
          tier: UserTier
          tier_expires_at: string | null
          expiry_text: string
          is_active: boolean
        }
      }
    }
    Functions: {
      check_tier_expiry: {
        Args: Record<string, never>
        Returns: void
      }
    }
    Enums: {
      user_tier: UserTier
    }
  }
}

// Convenience types
export type User = Database['public']['Tables']['users']['Row']
export type TestResult = Database['public']['Tables']['test_results']['Row']
export type LearningProgress = Database['public']['Tables']['learning_progress']['Row']
export type Bookmark = Database['public']['Tables']['bookmarks']['Row']
export type SubscriptionPackage = Database['public']['Tables']['subscription_packages']['Row']
export type Payment = Database['public']['Tables']['payments']['Row']
export type Voucher = Database['public']['Tables']['vouchers']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']

export type NewTestResult = Database['public']['Tables']['test_results']['Insert']
export type NewPayment = Database['public']['Tables']['payments']['Insert']
export type NewVoucher = Database['public']['Tables']['vouchers']['Insert']
export type NewSubscription = Database['public']['Tables']['subscriptions']['Insert']

// Tier access levels (for comparison)
export const TIER_LEVELS: Record<UserTier, number> = {
  free: 0,
  tes: 1,
  student: 2
}

// Package access by tier
export const TIER_PACKAGE_ACCESS: Record<UserTier, string[]> = {
  free: ['package_A', 'package_B'],
  tes: ['package_A', 'package_B', 'package_C', 'package_D'],
  student: ['package_A', 'package_B', 'package_C', 'package_D']
}

// Feature access by tier
export const TIER_FEATURES = {
  free: {
    testPackages: ['package_A', 'package_B'],
    learningAccess: false,
    detailedExplanation: false,
    historyAnalytics: false,
    certificate: false
  },
  tes: {
    testPackages: ['package_A', 'package_B', 'package_C', 'package_D'],
    learningAccess: false,
    detailedExplanation: true,
    historyAnalytics: true,
    certificate: true
  },
  student: {
    testPackages: ['package_A', 'package_B', 'package_C', 'package_D'],
    learningAccess: true,
    detailedExplanation: true,
    historyAnalytics: true,
    certificate: true
  }
} as const
