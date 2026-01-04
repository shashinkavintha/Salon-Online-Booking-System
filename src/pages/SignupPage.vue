<template>
  <q-page class="flex flex-center bg-black">
    <div class="q-pa-md" style="width: 100%; max-width: 450px;">
      <q-card class="bg-grey-10 text-white q-pa-lg shadow-24" style="border-radius: 16px; border: 1px solid rgba(255,255,255,0.1)">
        
        <q-card-section class="text-center q-mb-md">
          <div class="text-h4 font-serif text-weight-medium q-mb-sm">Join Luxe</div>
          <div class="text-grey-5">Create your account for exclusive access</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="handleSignup" class="q-gutter-md">
            
            <q-input 
              v-model="fullName" 
              label="Full Name" 
              dark 
              outlined 
              color="accent"
              bg-color="grey-9"
              :rules="[ val => !!val || 'Name is required' ]"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="grey-5" />
              </template>
            </q-input>

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
              :rules="[ val => !!val || 'Password is required', val => val.length >= 6 || 'Password must be at least 6 characters' ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="grey-5" />
              </template>
            </q-input>

             <q-input 
              v-model="confirmPassword" 
              label="Confirm Password" 
              type="password" 
              dark 
              outlined 
              color="accent"
              bg-color="grey-9"
              :rules="[ val => !!val || 'Please confirm your password', val => val === password || 'Passwords do not match' ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock_clock" color="grey-5" />
              </template>
            </q-input>

            <q-btn 
              label="Create Account" 
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
          <div class="text-grey-5">
            Already have an account? 
            <router-link to="/login" class="text-accent text-weight-bold text-decoration-none q-ml-xs">Log In</router-link>
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

const router = useRouter()
const $q = useQuasar()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

const handleSignup = async () => {
  loading.value = true
  try {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: fullName.value
        }
      }
    })

    if (error) throw error

    $q.notify({
      type: 'positive',
      message: 'Account created! Please verify your email.'
    })
    
    // Ideally redirect to a "Verify Email" page or show a dialog
    router.push('/login')
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Signup failed'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.font-serif {
  font-family: 'Playfair Display', serif;
}
</style>
