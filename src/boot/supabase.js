import { createClient } from '@supabase/supabase-js'
import { useUserStore } from 'stores/user-store'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async ({ app, store }) => {
    app.config.globalProperties.$supabase = supabase

    const userStore = useUserStore(store)

    // Initial Session Check
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
        userStore.setUser(session.user)
    }

    // Auth State Listener
    supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth Event:', event)
        if (session) {
            userStore.setUser(session.user)
        } else {
            userStore.clearUser()
        }
    })
}

export { supabase }

