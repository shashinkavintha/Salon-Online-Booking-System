<template>
  <q-page class="q-pa-md q-pa-lg-xl bg-black text-white">
    <div class="row q-col-gutter-lg" style="max-width: 1400px; margin: 0 auto">
      
      <!-- Sidebar / Profile Card -->
      <div class="col-12 col-md-3">
        <q-card class="bg-grey-10 no-shadow border-white-10 text-white" style="border-radius: 20px; position: sticky; top: 100px">
          <q-card-section class="text-center q-pt-xl">
            <q-avatar size="120px" class="q-mb-md shadow-10" style="border: 3px solid #FF0000">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="User Avatar">
            </q-avatar>
            <div class="text-h5 font-serif text-weight-medium">{{ user?.user_metadata?.full_name || 'Valued Guest' }}</div>
            <div class="text-caption text-grey-5">{{ user?.email }}</div>
          </q-card-section>
          
          <q-card-section class="q-px-none q-pb-xl">
            <q-list class="q-gutter-y-sm">
              <q-item 
                clickable 
                v-ripple 
                :active="activeTab === 'dashboard'" 
                @click="activeTab = 'dashboard'"
                active-class="active-nav-item"
                class="nav-item q-py-md q-px-lg"
              >
                <q-item-section avatar>
                  <q-icon name="dashboard" size="24px" />
                </q-item-section>
                <q-item-section class="text-subtitle1">Dashboard</q-item-section>
              </q-item>
              
              <q-item 
                clickable 
                v-ripple 
                :active="activeTab === 'bookings'" 
                @click="activeTab = 'bookings'"
                active-class="active-nav-item"
                class="nav-item q-py-md q-px-lg"
              >
                <q-item-section avatar>
                  <q-icon name="event_note" size="24px" />
                </q-item-section>
                <q-item-section class="text-subtitle1">My Bookings</q-item-section>
              </q-item>

              <q-item 
                v-if="staffProfile"
                clickable 
                v-ripple 
                :active="activeTab === 'schedule'" 
                @click="activeTab = 'schedule'"
                active-class="active-nav-item"
                class="nav-item q-py-md q-px-lg"
              >
                <q-item-section avatar>
                  <q-icon name="schedule" size="24px" />
                </q-item-section>
                <q-item-section class="text-subtitle1">My Schedule</q-item-section>
              </q-item>

              <q-item 
                clickable 
                v-ripple 
                :active="activeTab === 'profile'" 
                @click="activeTab = 'profile'"
                active-class="active-nav-item"
                class="nav-item q-py-md q-px-lg"
              >
                <q-item-section avatar>
                  <q-icon name="person" size="24px" />
                </q-item-section>
                <q-item-section class="text-subtitle1">Profile Settings</q-item-section>
              </q-item>

              <q-separator class="bg-grey-9 q-my-md" />

              <q-item 
                v-if="isAdmin"
                clickable 
                v-ripple 
                to="/admin"
                class="nav-item q-py-md q-px-lg text-accent"
              >
                <q-item-section avatar>
                  <q-icon name="admin_panel_settings" size="24px" />
                </q-item-section>
                <q-item-section class="text-subtitle1">Admin Panel</q-item-section>
              </q-item>

              <q-item 
                clickable 
                v-ripple 
                @click="handleLogout"
                class="nav-item text-red-5 q-py-md q-px-lg hover:text-red-7"
              >
                <q-item-section avatar>
                  <q-icon name="logout" size="24px" />
                </q-item-section>
                <q-item-section class="text-subtitle1">Logout</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <!-- Main Content Area -->
      <div class="col-12 col-md-9">
        
        <!-- Dashboard View -->
        <div v-if="activeTab === 'dashboard'" class="fade-in">
           <div class="text-h4 font-serif q-mb-lg">Welcome Back,</div>
           
           <div class="row q-col-gutter-lg q-mb-xl">
             <div class="col-12 col-sm-4">
               <q-card class="stats-card bg-grey-10 text-white border-white-10">
                 <q-card-section class="q-pa-lg">
                   <div class="row items-center justify-between q-mb-md">
                     <div class="text-subtitle2 text-grey-5 text-uppercase tracking-wider">Upcoming</div>
                     <q-icon name="calendar_today" color="accent" size="24px" />
                   </div>
                   <div class="text-h3 text-weight-bold font-serif">{{ upcomingCount }}</div>
                   <div class="text-caption text-grey-6 q-mt-sm">Next appointment</div>
                 </q-card-section>
               </q-card>
             </div>
             <div class="col-12 col-sm-4">
               <q-card class="stats-card bg-grey-10 text-white border-white-10">
                 <q-card-section class="q-pa-lg">
                   <div class="row items-center justify-between q-mb-md">
                     <div class="text-subtitle2 text-grey-5 text-uppercase tracking-wider">Completed</div>
                     <q-icon name="check_circle" color="green-4" size="24px" />
                   </div>
                   <div class="text-h3 text-weight-bold font-serif">{{ completedCount }}</div>
                   <div class="text-caption text-grey-6 q-mt-sm">Total Services</div>
                 </q-card-section>
               </q-card>
             </div>
               <div class="col-12 col-sm-4">
               <q-card class="stats-card bg-gradient-gold text-black">
                 <q-card-section class="q-pa-lg">
                   <div class="row items-center justify-between q-mb-md">
                     <div class="text-subtitle2 text-dark text-uppercase tracking-wider text-weight-bold">Points</div>
                     <q-icon name="stars" color="black" size="24px" />
                   </div>
                   <div class="text-h3 text-weight-bold font-serif">{{ loyaltyPoints }}</div>
                   <div class="text-caption text-dark q-mt-sm text-weight-medium">Silver Tier Status</div>
                 </q-card-section>
               </q-card>
             </div>
           </div>

           <q-card class="bg-grey-10 text-white border-white-10">
             <q-card-section class="q-pa-lg">
               <div class="row items-center justify-between q-mb-lg">
                 <div class="text-h5 font-serif">Recent Activity</div>
                 <q-btn flat dense color="accent" label="View All" no-caps />
               </div>
               
               <!-- Empty State -->
               <div class="column flex-center q-py-xl text-center">
                 <q-icon name="spa" color="grey-8" size="64px" class="q-mb-md opacity-50" />
                 <div class="text-h6 text-grey-5 q-mb-sm">No recent bookings</div>
                 <p class="text-grey-7 q-mb-lg" style="max-width: 300px">Ready to transform your look? Explore our services and book your next session.</p>
                 <q-btn unelevated rounded color="accent" text-color="white" label="Book Appointment" to="/book" class="q-px-xl q-py-xs" />
               </div>
             </q-card-section>
           </q-card>
        </div>

        <!-- Bookings View -->
        <div v-if="activeTab === 'bookings'" class="fade-in">
          <q-card class="bg-grey-10 text-white border-white-10" style="min-height: 400px">
            <q-card-section class="q-pa-lg">
              <div class="text-h4 font-serif q-mb-lg">My Appointments</div>
              
              <div v-if="bookings.length === 0" class="column flex-center full-height q-py-xl">
                 <q-icon name="event_busy" color="grey-8" size="64px" class="q-mb-md opacity-50" />
                 <div class="text-h6 text-grey-5">No Appointments Found</div>
                 <q-btn unelevated rounded color="accent" label="Book Now" to="/book" class="q-mt-md" />
              </div>

              <div v-else class="row q-col-gutter-md">
                 <div class="col-12" v-for="app in bookings" :key="app.id">
                    <q-card class="bg-grey-9 border-white-10 q-pa-md booking-item">
                       <div class="row items-center justify-between">
                         <div class="row items-center">
                            <q-avatar color="accent" text-color="white" icon="spa" class="q-mr-md" font-size="24px" />
                            <div>
                               <div class="text-h6">{{ app.services?.name || 'Service' }}</div>
                               <div class="text-caption text-grey-4">
                                 {{ date.formatDate(app.start_time, 'dddd, MMMM D, YYYY') }} at {{ date.formatDate(app.start_time, 'h:mm A') }}
                               </div>
                            </div>
                         </div>
                         <div class="text-right">
                            <q-badge :color="app.status === 'confirmed' ? 'green' : app.status === 'completed' ? 'blue' : 'orange'" class="q-pa-xs text-uppercase q-mb-xs">
                               {{ app.status }}
                            </q-badge>
                             <div class="text-weight-bold text-accent q-mb-sm">LKR {{ app.services?.price }}</div>
                             
                             <div class="row justify-end q-gutter-sm">
                                <q-btn 
                                  v-if="app.status !== 'cancelled' && app.status !== 'completed'"
                                  flat round dense icon="edit" color="grey-5" 
                                  @click="openEdit(app)"
                                >
                                  <q-tooltip>Reschedule</q-tooltip>
                                </q-btn>
                                
                                <q-btn 
                                  v-if="app.status !== 'cancelled' && app.status !== 'completed'"
                                  flat round dense icon="event_busy" color="orange" 
                                  @click="cancelBooking(app.id)"
                                >
                                  <q-tooltip>Cancel Booking</q-tooltip>
                                </q-btn>

                                <q-btn 
                                  flat round dense icon="delete" color="grey-8" 
                                  @click="deleteBooking(app.id)"
                                >
                                  <q-tooltip>Delete Record</q-tooltip>
                                </q-btn>
                             </div>
                          </div>
                       </div>
                    </q-card>
                 </div>
              </div>

            </q-card-section>
          </q-card>
        </div>

        <!-- Schedule View (For Staff) -->
        <div v-if="activeTab === 'schedule'" class="fade-in">
          <q-card class="bg-grey-10 text-white border-white-10" style="min-height: 400px">
            <q-card-section class="q-pa-lg">
              <div class="row justify-between items-center q-mb-lg">
                 <div class="text-h4 font-serif">My Schedule</div>
                 <q-chip v-if="staffProfile" color="accent" text-color="white">{{ staffProfile.role }}</q-chip>
              </div>
              
              <div v-if="assignedBookings.length === 0" class="column flex-center full-height q-py-xl">
                 <q-icon name="free_breakfast" color="grey-8" size="64px" class="q-mb-md opacity-50" />
                 <div class="text-h6 text-grey-5">No jobs assigned yet</div>
              </div>

              <div v-else class="row q-col-gutter-md">
                 <div class="col-12" v-for="app in assignedBookings" :key="app.id">
                    <q-card class="bg-grey-9 border-white-10 q-pa-md booking-item">
                       <div class="row items-center justify-between">
                         <div class="row items-center">
                            <q-avatar color="blue-grey-8" text-color="white" icon="person" class="q-mr-md" font-size="24px" />
                            <div>
                               <div class="text-h6">{{ app.services?.name }}</div>
                               <div class="text-subtitle2 text-accent">Customer: {{ app.profiles?.full_name || 'Unknown' }}</div>
                               <div class="text-caption text-grey-4">
                                 {{ date.formatDate(app.start_time, 'dddd, MMMM D, YYYY') }} at {{ date.formatDate(app.start_time, 'h:mm A') }}
                               </div>
                            </div>
                         </div>
                         <div class="text-right">
                            <q-badge :color="app.status === 'confirmed' ? 'green' : 'orange'" class="q-pa-xs text-uppercase q-mb-xs">
                               {{ app.status }}
                            </q-badge>
                         </div>
                       </div>
                    </q-card>
                 </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

         <!-- Profile View -->
        <div v-if="activeTab === 'profile'" class="fade-in">
          <q-card class="bg-grey-10 text-white border-white-10">
            <q-card-section class="q-pa-lg">
              <div class="text-h4 font-serif q-mb-lg">Profile Settings</div>
              <q-form class="q-gutter-y-lg q-mt-md" style="max-width: 600px">
                 <q-input 
                    dark outlined 
                    v-model="profileForm.fullName" 
                    label="Full Name" 
                    color="accent"
                    bg-color="grey-9"
                 />
                 <q-input 
                    dark outlined 
                    v-model="profileForm.email" 
                    label="Email Address" 
                    disable 
                    color="accent"
                    bg-color="grey-9"
                 >
                   <template v-slot:append>
                     <q-icon name="lock" color="grey-6" size="xs" />
                   </template>
                 </q-input>
                 <q-input 
                    dark outlined 
                    v-model="profileForm.phone" 
                    label="Phone Number" 
                    color="accent"
                    bg-color="grey-9"
                    mask="(###) ### - ####"
                 />
                 <div class="q-pt-md">
                   <q-btn label="Save Changes" color="accent" unelevated rounded class="q-px-xl" size="lg" @click="saveProfile" />
                 </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>
    <!-- Edit Booking Dialog -->
    <q-dialog v-model="editDialog">
      <q-card class="bg-grey-9 text-white border-white-10" style="min-width: 700px; max-width: 90vw;">
        <q-card-section>
          <div class="text-h6 font-serif">Reschedule Appointment</div>
          <div class="text-caption text-grey-5">Select a new date and time</div>
        </q-card-section>

        <q-card-section class="q-pa-md">
           <div class="row q-col-gutter-lg">
              <!-- Calendar -->
              <div class="col-12 col-md-auto text-center">
                 <q-date 
                    v-model="editForm.date" 
                    dark 
                    color="accent" 
                    minimal
                    class="bg-grey-10 border-white-10 shadow-0"
                    :options="dateOptions"
                    @update:model-value="checkRescheduleAvailability"
                 />
              </div>
              
              <!-- Time Slots -->
              <div class="col-12 col-md">
                 <div class="text-subtitle2 q-mb-md">Available Slots</div>
                 
                 <div v-if="processingSlots" class="text-center q-pa-lg">
                    <q-spinner color="accent" />
                 </div>
                 
                 <div v-else-if="!editForm.date" class="text-grey-6 text-center q-pa-lg">
                    Please select a date first
                 </div>

                 <div v-else-if="rescheduleSlots.every(s => !s.available)" class="text-grey-6 text-center q-pa-lg">
                    No slots available for this date
                 </div>
                 
                 <div v-else class="row q-gutter-sm justify-start">
                    <q-btn 
                       v-for="slot in rescheduleSlots" 
                       :key="slot.time"
                       :label="slot.time"
                       :outline="editForm.time !== slot.time"
                       :unelevated="editForm.time === slot.time"
                       :color="editForm.time === slot.time ? 'accent' : (slot.available ? 'white' : 'grey-8')"
                       :text-color="editForm.time === slot.time ? 'white' : (slot.available ? 'white' : 'grey-6')"
                       rounded
                       class="q-px-md"
                       :disable="!slot.available"
                       @click="editForm.time = slot.time"
                    />
                 </div>
              </div>
           </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md bg-grey-10">
          <q-btn flat label="Cancel" color="white" v-close-popup />
          <q-btn unelevated rounded label="Update Schedule" color="accent" :loading="editLoading" @click="updateBooking" :disable="!editForm.date || !editForm.time" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user-store'
import { storeToRefs } from 'pinia'
import { supabase } from 'boot/supabase'
import { useQuasar, date } from 'quasar'

import { useNotifications } from 'src/composables/useNotifications'

const $q = useQuasar()
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { sendNotification } = useNotifications()

const activeTab = ref('dashboard')
const upcomingCount = ref(0)
const completedCount = ref(0)
const loyaltyPoints = ref(0)
const bookings = ref([])
const assignedBookings = ref([])
const staffProfile = ref(null)
const isAdmin = ref(false)

const profileForm = ref({
  fullName: '',
  email: '',
  phone: ''
})

// Edit / Reschedule Logic
const editDialog = ref(false)
const editForm = ref({ id: null, date: '', time: '', staffId: null })
const editLoading = ref(false)
const processingSlots = ref(false)
const occupiedSlots = ref([])
const baseTimeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

onMounted(async () => {
  if (user.value) {
    // 1. Initialize form with Auth Metadata (fallback)
    profileForm.value.email = user.value.email
    profileForm.value.fullName = user.value.user_metadata?.full_name || ''

    // 2. Fetch Real Profile Data from DB
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .single()
      
      if (profile) {
        profileForm.value.fullName = profile.full_name || user.value.user_metadata?.full_name
        profileForm.value.phone = profile.phone || ''
        // Allow access to Admin Panel for both Admin and Staff roles
        if (['admin', 'staff'].includes(profile.role)) isAdmin.value = true
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
    }

    // 3. Fetch Staff Profile & Assigned Bookings (if exists)
    const { data: staff } = await supabase.from('staff').select('*').eq('user_id', user.value.id).maybeSingle()
    if (staff) {
       staffProfile.value = staff
       const { data: schedule } = await supabase
           .from('appointments')
           .select('*, services(*), profiles(full_name, phone, email)') 
           .eq('staff_id', staff.id)
           .neq('status', 'cancelled')
           .order('start_time', { ascending: true })
           
       assignedBookings.value = schedule || []
    }

    // 4. Fetch bookings list with Service details
    refreshBookings()
  }
})

const saveProfile = async () => {
  try {
    const updates = {
      id: user.value.id,
      full_name: profileForm.value.fullName,
      phone: profileForm.value.phone,
      updated_at: new Date()
    }

    const { error } = await supabase.from('profiles').upsert(updates)
    if (error) throw error
    $q.notify({ type: 'positive', message: 'Profile updated successfully' })
  } catch (error) {
    $q.notify({ type: 'negative', message: error.message || 'Error updating profile' })
  }
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

// Computed Slots for Rescheduling
const rescheduleSlots = computed(() => {
   if (!editForm.value.date) return []
   
   const now = new Date()
   const todayStr = date.formatDate(now, 'YYYY/MM/DD')
   const isToday = editForm.value.date === todayStr
   
   return baseTimeSlots.map(time => {
      let available = true
      // 1. Check Occupied
      if (occupiedSlots.value.includes(time)) available = false

      // 2. Buffer Constraint (If today, must be > 1 hour from now)
      if (available && isToday) {
         const [hours, minutes] = time.split(':').map(Number)
         const slotDate = new Date(now)
         slotDate.setHours(hours, minutes, 0, 0)
         const diffInMinutes = date.getDateDiff(slotDate, now, 'minutes')
         if (diffInMinutes < 60) available = false
      }
      
      return { time, available }
   })
})

const checkRescheduleAvailability = async (val) => {
    if (!val || !editForm.value.staffId) return
    editForm.value.time = null // Reset time when date changes
    processingSlots.value = true
    
    try {
         const formattedDate = val.replaceAll('/', '-')
         const { data: apps, error } = await supabase.rpc('get_active_appointments_for_date', {
            p_staff_id: editForm.value.staffId,
            p_date: formattedDate
         })
         
         if (error) throw error
         
         // Extract occupied times, exclude CURRENT booking if it's on the same day (optional, but good UX)
         occupiedSlots.value = apps
            .filter(a => a.id !== editForm.value.id) // Don't count the current booking as blocking itself
            .map(a => {
                const d = new Date(a.start_time)
                return date.formatDate(d, 'HH:mm')
            })

    } catch (err) {
        console.error(err)
    } finally {
        processingSlots.value = false
    }
}

// Open Dialog
const openEdit = (app) => {
  const d = new Date(app.start_time)
  const dStr = date.formatDate(d, 'YYYY/MM/DD')
  
  editForm.value = {
    id: app.id,
    date: dStr,
    time: date.formatDate(d, 'HH:mm'),
    staffId: app.staff_id
  }
  
  // Fetch slots for the current date immediately
  checkRescheduleAvailability(dStr)
  editDialog.value = true
}

// Update (Reschedule)
const updateBooking = async () => {
    if (!editForm.value.date || !editForm.value.time) {
        $q.notify({ type: 'warning', message: 'Please select a date and time' })
        return
    }

    editLoading.value = true
    try {
        const { id, date: d, time } = editForm.value
        // Fix Timezone
        const [year, month, day] = d.split('/').map(Number)
        const [hours, minutes] = time.split(':').map(Number)
        const localDate = new Date(year, month - 1, day, hours, minutes)
        const newStart = localDate.toISOString()
        
        const { error } = await supabase.from('appointments').update({ 
            start_time: newStart,
            status: 'pending' 
        }).eq('id', id)
        
        if(error) {
             if (error.code === '23505') throw new Error('Time slot unavailable')
             throw error
        }
        
        // Notify
        sendNotification('rescheduled', { id })
        
        $q.notify({ type: 'positive', message: 'Rescheduled successfully' })
        editDialog.value = false
        refreshBookings()

    } catch(e) {
        $q.notify({ type: 'negative', message: 'Error: ' + e.message })
    } finally {
        editLoading.value = false
    }
}

// Cancel
const cancelBooking = async (id) => {
    $q.dialog({
        title: 'Cancel Booking',
        message: 'Are you sure you want to cancel?',
        cancel: true, dark: true, persistent: true
    }).onOk(async () => {
        const { error } = await supabase.from('appointments').update({ status: 'cancelled' }).eq('id', id)
        if (!error) {
             // Notify
             sendNotification('cancelled', { id })
             
             refreshBookings()
             $q.notify({ type: 'positive', message: 'Booking Cancelled'})
        } else {
             $q.notify({ type: 'negative', message: 'Failed to cancel' })
        }
    })
}

// Delete
const deleteBooking = async (id) => {
    $q.dialog({
        title: 'Delete History',
        message: 'Remove this record permanently?',
        cancel: true, dark: true, persistent: true
    }).onOk(async () => {
        const { error } = await supabase.from('appointments').delete().eq('id', id)
        if (!error) {
             bookings.value = bookings.value.filter(b => b.id !== id)
             $q.notify({ type: 'positive', message: 'Deleted'})
             // Also update stats
             refreshBookings()
        } else {
             $q.notify({ type: 'negative', message: 'Failed to delete' })
        }
    })
}

const refreshBookings = async () => {
    const { data } = await supabase.from('appointments').select('*, services(*)')
       .eq('user_id', user.value.id).order('start_time', { ascending: false })
    if (data) {
         bookings.value = data
         // Update stats
         upcomingCount.value = data.filter(a => ['pending', 'confirmed'].includes(a.status)).length
         completedCount.value = data.filter(a => a.status === 'completed').length
         loyaltyPoints.value = completedCount.value * 50
    }
}
const dateOptions = (d) => {
  return d >= date.formatDate(Date.now(), 'YYYY/MM/DD')
}
</script>

<style scoped>
.font-serif {
  font-family: 'Playfair Display', serif;
}

.border-white-10 {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Sidebar Navigation */
.nav-item {
  border-radius: 12px;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  padding-left: 28px; /* subtle shift */
}

.active-nav-item {
  background: linear-gradient(90deg, rgba(255, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0) 100%);
  border-left-color: #FF0000;
  color: white;
}

/* Stats Cards */
.stats-card {
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.bg-gradient-gold {
  background: linear-gradient(135deg, #F0DB9D 0%, #D4AF37 100%);
}

/* Animations */
.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
