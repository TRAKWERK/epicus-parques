import { createClient } from '@supabase/supabase-js'

let supabaseInstance: any = null

export const getSupabase = () => {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

export const supabase = new Proxy(
  {},
  {
    get: (target, prop) => {
      return (getSupabase() as any)[prop]
    },
  }
) as any

export const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey || !supabaseUrl) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not set, using anon key')
    return getSupabase()
  }
  return createClient(supabaseUrl, serviceRoleKey)
}
