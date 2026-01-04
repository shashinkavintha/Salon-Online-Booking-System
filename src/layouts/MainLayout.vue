<template>
  <q-layout view="lHh Lpr lff">
    <q-header class="text-white GLASS_HEADER" height-hint="80">
      <q-toolbar style="height: 80px">
        <div class="row items-center justify-between no-wrap full-height relative-position q-mx-auto" style="max-width: 1400px; width: 100%">
           <!-- Logo Section -->
           <q-btn flat no-caps no-wrap class="q-mr-md" to="/">
            <q-icon name="spa" color="accent" size="32px" />
            <q-toolbar-title shrink class="text-weight-bold font-serif q-ml-sm text-h6" style="letter-spacing: 1px">
              LUXE
            </q-toolbar-title>
          </q-btn>

          <!-- Desktop Navigation (Centered) -->
          <div class="gt-sm row q-gutter-lg items-center absolute" style="left: 50%; top: 50%; transform: translate(-50%, -50%); padding-top: 16px">
            <q-btn flat label="Home" to="/" class="text-white text-weight-bold hover-underline-anim" style="letter-spacing: 0.5px" />
            <q-btn flat label="Services" to="/services" class="text-white text-weight-bold hover-underline-anim" style="letter-spacing: 0.5px" />
            <q-btn flat label="About" to="/about" class="text-white text-weight-bold hover-underline-anim" style="letter-spacing: 0.5px" />
            <q-btn flat label="Contact" to="/contact" class="text-white text-weight-bold hover-underline-anim" style="letter-spacing: 0.5px" />
          </div>

          <!-- Right Side Actions -->
          <div class="row items-center q-gutter-sm justify-end">
             <!-- Desktop Auth -->
             <div class="gt-sm row q-gutter-md" v-if="!user">
               <q-btn outline rounded color="white" label="Login" to="/login" class="q-px-lg text-weight-bold" />
               <q-btn unelevated rounded color="accent" text-color="white" label="Sign Up" to="/signup" class="q-px-lg shadow-2 text-weight-bold" />
             </div>
             
             <div class="gt-sm row items-center q-gutter-sm" v-else>
               <div class="text-subtitle1 text-weight-bold q-mr-sm">{{ user.user_metadata?.full_name || user.email?.split('@')[0] }}</div>
               <q-btn round flat>
                 <q-avatar size="32px" color="accent" text-color="white" icon="person" />
                 <q-menu auto-close dark :offset="[0, 10]" class="bg-grey-10">
                    <q-list style="min-width: 150px">
                      <q-item clickable v-close-popup to="/dashboard" class="text-white">
                        <q-item-section>Profile</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup to="/dashboard" class="text-white">
                        <q-item-section>My Bookings</q-item-section>
                      </q-item>
                      <q-separator dark />
                      <q-item clickable v-close-popup @click="handleLogout" class="text-red-4">
                        <q-item-section>Logout</q-item-section>
                      </q-item>
                    </q-list>
                 </q-menu>
               </q-btn>
               <q-btn round flat icon="logout" color="white" @click="handleLogout">
                 <q-tooltip>Logout</q-tooltip>
               </q-btn>
             </div>
             <!-- Mobile Menu Toggle -->
             <q-btn flat round icon="menu" class="lt-md" @click="toggleRightDrawer" />
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Mobile Navigation Drawer -->
    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered class="bg-black text-white">
      <div class="column full-height q-pa-md">
        <div class="row justify-end">
          <q-btn flat round icon="close" @click="toggleRightDrawer" />
        </div>
        
        <div class="col column justify-center items-center q-gutter-y-xl">
           <q-btn flat no-caps label="Home" to="/" class="text-h5" />
           <q-btn flat no-caps label="Services" to="/services" class="text-h5" />
           <q-btn flat no-caps label="About" to="/about" class="text-h5" />
           <q-btn flat no-caps label="Contact" to="/contact" class="text-h5" />
        </div>

        <div class="column q-gutter-md q-mb-xl" v-if="!user">
           <q-btn outline rounded color="white" label="Login" size="lg" to="/login" />
           <q-btn unelevated rounded color="accent" text-color="white" label="Sign Up" size="lg" to="/signup" />
        </div>

        <div class="column q-gutter-md q-mb-xl" v-else>
           <div class="text-h6 text-center text-weight-bold q-mb-sm">Hi, {{ user.user_metadata?.full_name || user.email?.split('@')[0] }}</div>
           <q-btn outline rounded color="white" label="My Bookings" size="lg" to="/dashboard" />
           <q-btn flat color="red-4" label="Logout" size="lg" @click="handleLogout" />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-primary text-white">
      <div class="q-pa-md-xl q-pa-lg-xl q-pa-sm">
        <div class="row q-col-gutter-xl">
          <!-- Brand Column -->
          <div class="col-12 col-md-4">
            <div class="text-h5 text-weight-bold q-mb-md flex items-center">
              <q-icon name="spa" color="accent" size="32px" class="q-mr-sm" />
              Luxe Salon
            </div>
            <p class="text-grey-4">
              Experience the art of beauty in a luxurious setting. We are dedicated to providing premium hair, skin, and body treatments tailored just for you.
            </p>
            <div class="q-mt-lg">
              <q-btn flat round icon="facebook" color="accent" />
              <q-btn flat round icon="camera_alt" color="accent" />
              <q-btn flat round icon="chat" color="accent" />
            </div>
          </div>

          <!-- Quick Links -->
          <div class="col-12 col-md-4">
            <div class="text-h6 text-weight-bold q-mb-md">Quick Links</div>
            <div class="column q-gutter-sm">
              <router-link to="/" class="text-grey-4 text-decoration-none hover-accent">Home</router-link>
              <router-link to="/services" class="text-grey-4 text-decoration-none hover-accent">Our Services</router-link>
              <router-link to="/about" class="text-grey-4 text-decoration-none hover-accent">About Us</router-link>
              <a href="#" class="text-grey-4 text-decoration-none hover-accent">Gallery</a>
              <router-link to="/book" class="text-grey-4 text-decoration-none hover-accent">Book Appointment</router-link>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="col-12 col-md-4">
            <div class="text-h6 text-weight-bold q-mb-md">Contact Us</div>
            <div class="column q-gutter-md">
              <div class="flex items-center">
                <q-icon name="location_on" color="accent" size="20px" class="q-mr-md" />
                <div class="text-grey-4">123 Luxury Lane, Colombo 07, Sri Lanka</div>
              </div>
              <div class="flex items-center">
                <q-icon name="phone" color="accent" size="20px" class="q-mr-md" />
                <div class="text-grey-4">+94 11 234 5678</div>
              </div>
              <div class="flex items-center">
                <q-icon name="email" color="accent" size="20px" class="q-mr-md" />
                <div class="text-grey-4">hello@luxesalon.lk</div>
              </div>
              <div class="flex items-center">
                <q-icon name="schedule" color="accent" size="20px" class="q-mr-md" />
                <div class="text-grey-4">
                  Mon - Sat: 9:00 AM - 8:00 PM<br />
                  Sun: 10:00 AM - 6:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright Bar -->
      <div class="bg-black text-grey-6 q-py-sm text-center text-caption">
        © 2024 Luxe Salon. All rights reserved.
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user-store'
import { storeToRefs } from 'pinia'
import { supabase } from 'boot/supabase'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const rightDrawerOpen = ref(false)

function toggleRightDrawer () {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    $q.notify({ type: 'negative', message: error.message })
  } else {
    $q.notify({ type: 'positive', message: 'Logged out successfully' })
    router.push('/')
  }
}
</script>

<style lang="scss">
.text-decoration-none {
  text-decoration: none;
}

.hover-accent {
  transition: color 0.3s;
  &:hover {
    color: $accent !important;
  }
}

.GLASS_HEADER {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.hover-underline-anim {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 5px;
    left: 50%;
    background-color: $accent;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  &:hover::after {
    width: 80%;
  }
}

.font-serif {
  font-family: 'Playfair Display', serif; /* Or any serif font available or imported */
}
</style>
