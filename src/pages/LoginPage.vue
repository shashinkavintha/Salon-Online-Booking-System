<template>
  <q-page class="flex flex-center bg-black">
    <div class="q-pa-md" style="width: 100%; max-width: 450px;">
      <q-card class="bg-grey-10 text-white q-pa-lg shadow-24" style="border-radius: 16px; border: 1px solid rgba(255,255,255,0.1)">
        
        <q-card-section class="text-center q-mb-md">
          <div class="text-h4 font-serif text-weight-medium q-mb-sm">Welcome Back</div>
          <div class="text-grey-5">Sign in to continue your luxury experience</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="handleLogin" class="q-gutter-md">
            
            <q-input 
              v-model="email" 
              label="Email Address" 
              dark 
              outlined 
              color="accent"
              bg-color="grey-9"
              :rules="[ val => !!val || 'Email is missing', val => /.+@.+\..+/.test(val) || 'Invalid email format' ]"
            >
              <template v-slot:prepend>
                <q-icon name="email" color="grey-5" />
              </template>
            </q-input>

            <q-input 
              v-model="password" 
              label="Password" 
              type="password" 
              dark 
              outlined 
              color="accent"
              bg-color="grey-9"
              :rules="[ val => !!val || 'Password is required' ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="grey-5" />
              </template>
            </q-input>

            <div class="row justify-between items-center q-mt-sm">
              <q-checkbox v-model="rememberMe" label="Remember me" dark color="accent" size="sm" />
              <div class="text-grey-5 cursor-pointer hover-accent" style="font-size: 0.9rem">Forgot Password?</div>
            </div>

            <q-btn 
              label="Login" 
              type="submit" 
              color="accent" 
              text-color="white" 
              unelevated 
              class="full-width text-weight-bold q-mt-lg" 
              rounded 
              size="lg"
              :loading="loading"
            />
          </q-form>
        </q-card-section>

        <q-card-section class="text-center q-mt-sm">
          <div class="text-grey-5 q-mb-md">Or continue with</div>
          
          <div class="row justify-center q-gutter-md">
             <q-btn round color="white" text-color="dark" icon="img:https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" />
             <q-btn round color="white" text-color="dark" icon="facebook" class="text-blue-9" />
          </div>

          <div class="q-mt-xl text-grey-5">
            Don't have an account? 
            <router-link to="/signup" class="text-accent text-weight-bold text-decoration-none q-ml-xs">Sign Up</router-link>
          </div>
        </q-card-section>

      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'
import { useUserStore } from 'stores/user-store'

const router = useRouter()
const $q = useQuasar()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) throw error
    
    // Explicitly update store
    if (data?.user) {
       userStore.setUser(data.user)
    }

    $q.notify({
      type: 'positive',
      message: 'Login successful! Welcome back.'
    })
    
    // Ensure session is ready before redirect explicitly
    const { data: sessionData } = await supabase.auth.getSession()
    if (sessionData.session) {
        await router.push('/dashboard')
    } else {
        // Fallback or retry
        await router.push('/dashboard')
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Login failed'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.font-serif {
  font-family: 'Playfair Display', serif; /* Ensure we use the same serif font as landing */
}
</style>
