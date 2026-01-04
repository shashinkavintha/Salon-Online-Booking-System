<template>
  <q-page class="q-pa-md q-pa-lg-xl bg-black text-white flex flex-center">
    <div style="width: 100%; max-width: 1000px">
      
      <div class="text-center q-mb-xl">
        <div class="text-h3 font-serif q-mb-sm">Book Your Appointment</div>
        <div class="text-grey-5 text-subtitle1">Experience our premium services</div>
      </div>

      <q-stepper
        v-model="step"
        ref="stepper"
        alternative-labels
        dark
        color="accent"
        animated
        class="bg-grey-10 no-shadow border-white-10"
        style="border-radius: 20px"
      >
        <!-- Step 1: Select Service -->
        <q-step
          :name="1"
          title="Select Service"
          icon="spa"
          :done="step > 1"
        >
          <div class="row q-col-gutter-lg q-py-md justify-center">
            <template v-if="loadingServices">
               <div class="col-12 text-center q-pa-xl">
                  <q-spinner-dots size="40px" color="accent" />
               </div>
            </template>
            <template v-else>
               <div v-for="service in services" :key="service.id" class="col-12 col-md-4">
                  <q-card 
                    class="service-card cursor-pointer full-height bg-grey-9 border-white-10"
                    :class="{ 'selected-card': selectedService?.id === service.id }"
                    @click="selectService(service)"
                  >
                    <q-img :src="service.image_url" :ratio="4/3" class="rounded-borders-top">
                       <template v-slot:error>
                          <div class="absolute-full flex flex-center bg-grey-8 text-grey-5">
                            <q-icon name="image_not_supported" size="32px" />
                          </div>
                       </template>
                    </q-img>
                    <q-card-section>
                       <div class="text-h6 q-mb-xs font-serif">{{ service.name }}</div>
                       <div class="text-accent text-weight-bold">{{ service.duration_min }} min • LKR {{ service.price }}</div>
                       <div class="text-caption text-grey-5 q-mt-sm">{{ service.description }}</div>
                    </q-card-section>
                    
                    <div class="absolute-top-right q-pa-sm" v-if="selectedService?.id === service.id">
                       <q-avatar color="accent" text-color="white" icon="check" size="sm" />
                    </div>
                  </q-card>
               </div>
            </template>
          </div>
        </q-step>

        <!-- Step 2: Select Specialist -->
        <q-step
          :name="2"
          title="Choose Specialist"
          icon="person"
          :done="step > 2"
        >
          <div class="row q-col-gutter-lg justify-center q-py-md">
             <div v-if="filteredStaff.length === 0" class="col-12 text-center text-grey-5">
                No specialists available for this service.
             </div>
             <div v-for="member in filteredStaff" :key="member.id" class="col-6 col-sm-4 col-md-3">
                 <div 
                   class="column flex-center cursor-pointer q-pa-md transition-all rounded-borders"
                   :class="selectedStaff?.id === member.id ? 'bg-grey-9 border-accent' : 'hover-bg-grey-9'"
                   @click="selectStaff(member)"
                   style="border: 2px solid transparent; border-radius: 16px;"
                 >
                    <q-avatar size="100px" class="q-mb-md shadow-5">
                       <img :src="member.image_url">
                    </q-avatar>
                    <div class="text-h6 font-serif text-center">{{ member.name }}</div>
                    <div class="text-caption text-accent text-uppercase">{{ member.role }}</div>
                 </div>
             </div>
          </div>
        </q-step>

        <!-- Step 3: Date & Time -->
        <q-step
          :name="3"
          title="Date & Time"
          icon="event"
          :done="step > 3"
        >
          <div class="row q-col-gutter-xl justify-center q-py-md">
            <div class="col-12 col-md-auto">
               <div class="text-h6 q-mb-md text-center">Select Date</div>
               <q-date 
                 v-model="selectedDate" 
                 dark 
                 color="accent" 
                 :options="dateOptions"
                 flat 
                 bordered 
                 class="bg-grey-9 border-white-10"
               />
            </div>
            <div class="col-12 col-md-auto" v-if="selectedDate">
               <div class="text-h6 q-mb-md text-center">Available Time Slots</div>
               
               <template v-if="loadingSlots">
                 <div class="text-center q-pa-md"><q-spinner color="accent" /></div>
               </template>
               
               <template v-else-if="displayedTimeSlots.every(s => !s.available)">
                 <div class="text-center text-grey-5 q-pa-md">No slots available for this date.</div>
               </template>

               <div v-else class="row q-gutter-sm justify-center" style="max-width: 320px">
                  <q-btn 
                    v-for="slot in displayedTimeSlots" 
                    :key="slot.time"
                    :label="slot.time"
                    :outline="selectedTime !== slot.time"
                    :unelevated="selectedTime === slot.time"
                    :color="selectedTime === slot.time ? 'accent' : (slot.available ? 'white' : 'grey-8')"
                    :text-color="selectedTime === slot.time ? 'white' : (slot.available ? 'white' : 'grey-6')"
                    rounded
                    class="q-px-md"
                    :disable="!slot.available"
                    @click="selectedTime = slot.time"
                  />
               </div>
            </div>
          </div>
        </q-step>

        <!-- Step 4: Confirmation -->
        <q-step
          :name="4"
          title="Confirm"
          icon="verified"
          :done="step > 4"
        >
          <div class="column flex-center q-py-lg">
             <div class="text-h5 font-serif text-accent q-mb-md">Booking Summary</div>
             
             <q-card class="bg-grey-9 border-white-10 q-pa-lg" style="width: 100%; max-width: 400px; border-radius: 16px">
                <div class="row items-center q-mb-md">
                   <q-icon name="spa" color="accent" size="24px" class="q-mr-md" />
                   <div>
                      <div class="text-caption text-grey-5">Service</div>
                      <div class="text-h6">{{ selectedService?.name }}</div>
                   </div>
                </div>

                <div class="row items-center q-mb-md">
                   <q-icon name="person" color="accent" size="24px" class="q-mr-md" />
                   <div>
                      <div class="text-caption text-grey-5">Specialist</div>
                      <div class="text-h6">{{ selectedStaff?.name }}</div>
                   </div>
                </div>

                <div class="row items-center q-mb-md">
                   <q-icon name="event" color="accent" size="24px" class="q-mr-md" />
                   <div>
                      <div class="text-caption text-grey-5">Date & Time</div>
                      <div class="text-h6">{{ selectedDate }} at {{ selectedTime }}</div>
                   </div>
                </div>

                <div class="row items-center q-mb-xl">
                   <q-icon name="payments" color="accent" size="24px" class="q-mr-md" />
                   <div>
                      <div class="text-caption text-grey-5">Total Price</div>
                      <div class="text-h6 text-accent">LKR {{ selectedService?.price }}</div>
                   </div>
                </div>
                
                <q-btn 
                  label="Confirm Booking" 
                  color="accent" 
                  class="full-width text-weight-bold" 
                  rounded 
                  size="lg"
                  :loading="submitting"
                  @click="confirmBooking"
                />
             </q-card>
          </div>
        </q-step>

        <template v-slot:navigation>
          <div class="row justify-between q-pa-md">
            <q-btn
              v-if="step > 1"
              flat
              color="white"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
              rounded
            />
            <div v-else></div> <!-- Spacer -->
            
            <q-btn
              v-if="step < 4"
              @click="$refs.stepper.next()"
              color="accent"
              :label="step === 4 ? 'Finish' : 'Next'"
              rounded
              class="q-px-xl"
              :disable="!canProceed"
            />
          </div>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { supabase } from 'boot/supabase'
import { date, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user-store'
import { storeToRefs } from 'pinia'

import { useNotifications } from 'src/composables/useNotifications'

const $q = useQuasar()
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { sendNotification } = useNotifications()

const step = ref(1)
const loadingServices = ref(true)
const services = ref([])
const staffList = ref([])
const selectedService = ref(null)
const selectedStaff = ref(null)
const selectedDate = ref(null)
const selectedTime = ref(null)
const submitting = ref(false)
const loadingSlots = ref(false)
const occupiedSlots = ref([])

// Base Time Slots
const baseTimeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

onMounted(async () => {
   try {
     // Fetch Services
     const { data: sData, error: sError } = await supabase.from('services').select('*')
     if (sError) throw sError
     services.value = sData

     // Fetch Staff
     const { data: stData, error: stError } = await supabase.from('staff').select('*')
     if (stError) throw stError
     staffList.value = stData

   } catch (err) {
      console.error(err)
      $q.notify({ type: 'negative', message: 'Failed to load configuration' })
   } finally {
      loadingServices.value = false
   }
})

const selectService = (service) => {
   selectedService.value = service
   selectedStaff.value = null // Reset subsequent steps
   selectedDate.value = null
   selectedTime.value = null
}

const selectStaff = (member) => {
   selectedStaff.value = member
   selectedDate.value = null
   selectedTime.value = null
}

// 1. Filter Staff based on Service Category
const filteredStaff = computed(() => {
   if (!selectedService.value) return []
   return staffList.value.filter(member => {
      // Check if member specialties includes the service category
      return member.specialties && member.specialties.includes(selectedService.value.category)
   })
})

// 2. Fetch occupied slots when Date is picked
watch(selectedDate, async (newDate) => {
   if (!newDate || !selectedStaff.value) return
   selectedTime.value = null
   loadingSlots.value = true
   
   try {
     const formattedDate = newDate.replaceAll('/', '-')
     
     // Use RPC to bypass RLS and get availability securely
     const { data: apps, error } = await supabase.rpc('get_active_appointments_for_date', {
        p_staff_id: selectedStaff.value.id,
        p_date: formattedDate
     })
     
     if (error) throw error

     console.log('Availability (RPC):', apps)

     // Extract times: "HH:mm"
     occupiedSlots.value = apps.map(a => {
        const d = new Date(a.start_time)
        return date.formatDate(d, 'HH:mm')
     })
     console.log('Occupied Slots (Local):', occupiedSlots.value)

   } catch (error) {
     console.error(error)
     $q.notify({ type: 'warning', message: 'Could not check availability. Please try again.' })
   } finally {
     loadingSlots.value = false
   }
})

// 3. Compute Displayed Slots (Mark occupied/past as disabled)
const displayedTimeSlots = computed(() => {
   if (!selectedDate.value) return []
   
   const now = new Date()
   const todayStr = date.formatDate(now, 'YYYY/MM/DD')
   const isToday = selectedDate.value === todayStr
   
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

// Validation for stepping forward
const canProceed = computed(() => {
   if (step.value === 1) return !!selectedService.value
   if (step.value === 2) return !!selectedStaff.value
   if (step.value === 3) return !!selectedDate.value && !!selectedTime.value
   return true
})

// Enable only future dates
const dateOptions = (d) => {
  return d >= date.formatDate(Date.now(), 'YYYY/MM/DD')
}

const confirmBooking = async () => {
   submitting.value = true
   try {
     if (!user.value) throw new Error('You must be logged in')

     const [year, month, day] = selectedDate.value.split('/').map(Number)
     const [hours, minutes] = selectedTime.value.split(':').map(Number)
     const localDate = new Date(year, month - 1, day, hours, minutes)
     const startTime = localDate.toISOString()

     const { data, error } = await supabase.from('appointments').insert({
        user_id: user.value.id,
        service_id: selectedService.value.id,
        staff_id: selectedStaff.value.id,
        start_time: startTime,
        status: 'pending'
     }).select()

     if (error) {
       // Check for Unique Violation (Double Booking)
       if (error.code === '23505') {
          throw new Error('This time slot has just been booked. Please select another time.')
       }
       throw error
     }
     
     // Send Email Notification
     if (data && data[0]) {
        sendNotification('created', data[0])
     }

     $q.notify({
        type: 'positive',
        message: 'Booking confirmed! We will contact you shortly.',
        timeout: 2000
     })
     
     setTimeout(() => {
        router.push('/dashboard?tab=bookings')
     }, 1500)

   } catch (err) {
// ...
      $q.notify({ type: 'negative', message: err.message || 'Booking failed' })
      // Refresh slots if failed due to booking
      if (err.message.includes('time slot')) {
          // Trigger refresh logic if needed, simplify: user has to re-pick
      }
   } finally {
      submitting.value = false
   }
}
</script>

<style scoped>
.font-serif {
  font-family: 'Playfair Display', serif;
}

.border-white-10 {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.service-card {
   transition: all 0.3s ease;
   border-radius: 12px;
}

.service-card:hover {
   transform: translateY(-5px);
   border-color: rgba(255, 255, 255, 0.3);
}

.selected-card {
   border: 2px solid #FF0000 !important;
   background: rgba(255, 0, 0, 0.05);
}

.rounded-borders-top {
   border-top-left-radius: 12px;
   border-top-right-radius: 12px;
}

.border-accent {
   border-color: #FF0000 !important;
}

.hover-bg-grey-9:hover {
   background: rgba(255,255,255,0.05);
}

.transition-all {
   transition: all 0.3s ease;
}
</style>
