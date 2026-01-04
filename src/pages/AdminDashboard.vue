<template>
  <q-page class="q-pa-md bg-grey-10 text-white">
    <div class="row q-col-gutter-lg">
      
      <!-- Sidebar -->
      <div class="col-12 col-md-2">
         <div class="fixed-sidebar">
            <div class="text-h5 font-serif q-mb-xl text-accent text-center">
               {{ userRole === 'admin' ? 'Admin Panel' : 'Staff Portal' }}
            </div>
            
            <q-list padding class="rounded-borders text-grey-4">
              <q-item 
                clickable v-ripple 
                :active="activeTab === 'bookings'" 
                @click="activeTab = 'bookings'"
                active-class="text-accent bg-grey-9"
                class="radius-md q-mb-sm"
              >
                <q-item-section avatar><q-icon name="calendar_month" /></q-item-section>
                <q-item-section>Bookings</q-item-section>
              </q-item>

              <q-item 
                v-if="currentStaffId"
                clickable v-ripple 
                :active="activeTab === 'myschedule'" 
                @click="activeTab = 'myschedule'"
                active-class="text-accent bg-grey-9"
                class="radius-md q-mb-sm"
              >
                <q-item-section avatar><q-icon name="perm_contact_calendar" /></q-item-section>
                <q-item-section>My Schedule</q-item-section>
              </q-item>

              <template v-if="userRole === 'admin'">
                <q-item 
                  clickable v-ripple 
                  :active="activeTab === 'services'" 
                  @click="activeTab = 'services'"
                  active-class="text-accent bg-grey-9"
                  class="radius-md q-mb-sm"
                >
                  <q-item-section avatar><q-icon name="spa" /></q-item-section>
                  <q-item-section>Services</q-item-section>
                </q-item>

                <q-item 
                  clickable v-ripple 
                  :active="activeTab === 'staff'" 
                  @click="activeTab = 'staff'"
                  active-class="text-accent bg-grey-9"
                  class="radius-md q-mb-sm"
                >
                  <q-item-section avatar><q-icon name="people" /></q-item-section>
                  <q-item-section>Staff</q-item-section>
                </q-item>
              </template>
            </q-list>
         </div>
      </div>

      <!-- Main Content -->
      <div class="col-12 col-md-10">
        
        <!-- Bookings Tab -->
        <div v-if="activeTab === 'bookings'">
           <div class="row justify-between items-center q-mb-lg">
              <div class="text-h4 font-serif">Manage Appointments</div>
              <q-btn flat icon="refresh" @click="fetchBookings" />
           </div>
           
           <q-table
              dark
              :rows="bookings"
              :columns="bookingColumns"
              row-key="id"
              class="bg-grey-9 shadow-10 text-grey-3 header-accent"
              :loading="loading"
           >
             <template v-slot:body-cell-status="props">
               <q-td :props="props">
                 <q-badge :color="getStatusColor(props.value)" class="q-pa-xs">
                    {{ props.value.toUpperCase() }}
                 </q-badge>
               </q-td>
             </template>

             <template v-slot:body-cell-actions="props">
               <q-td :props="props">
                  <div class="row items-center justify-center no-wrap q-gutter-x-sm">
                     <!-- Status Actions -->
                     <template v-if="props.row.status !== 'cancelled' && props.row.status !== 'completed'">
                       <q-btn 
                         v-if="props.row.status === 'pending'"
                         dense unelevated size="sm" color="positive" icon="check" label="Confirm" 
                         :loading="processingId === props.row.id"
                         @click="updateAppointmentStatus(props.row.id, 'confirmed')"
                       >
                          <q-tooltip>Confirm Booking</q-tooltip>
                       </q-btn>
                       <q-btn 
                         v-if="props.row.status === 'confirmed'"
                         dense unelevated size="sm" color="blue" icon="done_all" label="Complete" 
                         :loading="processingId === props.row.id"
                         @click="updateAppointmentStatus(props.row.id, 'completed')"
                       >
                          <q-tooltip>Mark Completed</q-tooltip>
                       </q-btn>
                       <q-btn 
                          dense outline size="sm" color="orange" icon="close" 
                          :loading="processingId === props.row.id"
                          @click="updateAppointmentStatus(props.row.id, 'cancelled')" 
                          label="Cancel"
                       />
                       <q-separator vertical color="grey-8" class="q-mx-sm" />
                     </template>
                     
                     <!-- CRUD Actions -->
                     <q-btn flat round dense color="grey-4" icon="edit" size="sm" @click="openBookingDialog(props.row)">
                        <q-tooltip>Edit Details</q-tooltip>
                     </q-btn>
                     <q-btn flat round dense color="negative" icon="delete" size="sm" @click="deleteBooking(props.row.id)">
                        <q-tooltip>Delete Record</q-tooltip>
                     </q-btn>
                  </div>
               </q-td>
             </template>
           </q-table>
        </div>

        <!-- My Schedule Tab -->
        <div v-if="activeTab === 'myschedule'">
           <div class="row justify-between items-center q-mb-lg">
              <div class="text-h4 font-serif">My Personal Schedule</div>
           </div>
           
           <q-table
              dark
              :rows="myBookings"
              :columns="bookingColumns"
              row-key="id"
              class="bg-grey-9 shadow-10 text-grey-3 header-accent"
              :loading="loading"
           >
             <template v-slot:body-cell-status="props">
               <q-td :props="props">
                 <q-badge :color="getStatusColor(props.value)" class="q-pa-xs">
                    {{ props.value.toUpperCase() }}
                 </q-badge>
               </q-td>
             </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <div class="row items-center justify-center no-wrap q-gutter-x-sm">
                   <!-- Status Actions -->
                   <template v-if="props.row.status !== 'cancelled' && props.row.status !== 'completed'">
                     <q-btn 
                       v-if="props.row.status === 'pending'"
                       dense unelevated size="sm" color="positive" icon="check" label="Confirm" 
                       :loading="processingId === props.row.id"
                       @click="updateAppointmentStatus(props.row.id, 'confirmed')"
                     >
                        <q-tooltip>Confirm Booking</q-tooltip>
                     </q-btn>
                     <q-btn 
                       v-if="props.row.status === 'confirmed'"
                       dense unelevated size="sm" color="blue" icon="done_all" label="Complete" 
                       :loading="processingId === props.row.id"
                       @click="updateAppointmentStatus(props.row.id, 'completed')"
                     >
                        <q-tooltip>Mark Completed</q-tooltip>
                     </q-btn>
                     <q-btn 
                        dense outline size="sm" color="orange" icon="close" 
                        :loading="processingId === props.row.id"
                        @click="updateAppointmentStatus(props.row.id, 'cancelled')" 
                        label="Cancel"
                     />
                     <q-separator vertical color="grey-8" class="q-mx-sm" />
                   </template>
                   
                   <!-- CRUD Actions -->
                   <q-btn flat round dense color="grey-4" icon="edit" size="sm" @click="openBookingDialog(props.row)">
                      <q-tooltip>Edit Details</q-tooltip>
                   </q-btn>
                   <q-btn flat round dense color="negative" icon="delete" size="sm" @click="deleteBooking(props.row.id)">
                      <q-tooltip>Delete Record</q-tooltip>
                   </q-btn>
                  </div>
                </q-td>
              </template>
           </q-table>
        </div>

        <!-- Services Tab -->
        <div v-if="activeTab === 'services'">
           <div class="row justify-between items-center q-mb-lg">
              <div class="text-h4 font-serif">Service Menu</div>
              <q-btn color="accent" icon="add" label="Add Service" @click="openServiceDialog()" />
           </div>

           <q-table
              dark
              :rows="services"
              :columns="serviceColumns"
              row-key="id"
              class="bg-grey-9 shadow-10 text-grey-3 header-accent"
              :loading="loading"
           >
             <template v-slot:body-cell-image="props">
               <q-td :props="props">
                  <q-avatar rounded size="40px">
                    <img :src="props.row.image_url || 'https://cdn.quasar.dev/img/image-src.png'">
                  </q-avatar>
               </q-td>
             </template>
             <template v-slot:body-cell-actions="props">
               <q-td :props="props">
                 <q-btn flat round color="white" icon="edit" size="sm" @click="openServiceDialog(props.row)" />
                 <q-btn flat round color="negative" icon="delete" size="sm" @click="deleteService(props.row.id)" />
               </q-td>
             </template>
           </q-table>
        </div>

        <!-- Staff Tab -->
        <div v-if="activeTab === 'staff'">
           <div class="row justify-between items-center q-mb-lg">
              <div class="text-h4 font-serif">Staff Management</div>
              <q-btn color="accent" icon="add" label="Add Staff" @click="openStaffDialog()" />
           </div>
           
           <q-table
              dark
              :rows="staff"
              :columns="staffColumns"
              row-key="id"
              class="bg-grey-9 shadow-10 text-grey-3 header-accent"
              :loading="loading"
           >
             <template v-slot:body-cell-image="props">
                <q-td :props="props">
                   <q-avatar size="40px"><img :src="props.row.image_url"></q-avatar>
                </q-td>
             </template>
             <template v-slot:body-cell-specialties="props">
                <q-td :props="props">
                   <q-chip v-for="tag in props.row.specialties" :key="tag" dense color="grey-8" text-color="white">{{ tag }}</q-chip>
                </q-td>
             </template>
             <template v-slot:body-cell-actions="props">
               <q-td :props="props">
                 <q-btn flat round color="white" icon="edit" size="sm" @click="openStaffDialog(props.row)" />
                 <q-btn flat round color="negative" icon="delete" size="sm" @click="deleteStaff(props.row.id)" />
               </q-td>
             </template>
           </q-table>
        </div>

      </div>
    </div>

    <!-- Service Dialog -->
    <q-dialog v-model="serviceDialog">
      <q-card class="bg-grey-9 text-white" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ isEdit ? 'Edit' : 'Add' }} Service</div>
        </q-card-section>
        <q-card-section class="q-gutter-md">
          <q-input dark filled v-model="serviceForm.name" label="Service Name" />
          <q-input dark filled v-model="serviceForm.category" label="Category (Hair, Skin, Spa)" />
          <q-input dark filled v-model.number="serviceForm.price" type="number" label="Price (LKR)" />
          <q-input dark filled v-model.number="serviceForm.duration_min" type="number" label="Duration (min)" />
          <q-input dark filled v-model="serviceForm.description" type="textarea" label="Description" />
          
          <div v-if="serviceForm.image_url" class="q-mb-sm text-center">
             <img :src="serviceForm.image_url" style="max-height: 100px; border-radius: 8px;">
          </div>
          <q-file dark filled v-model="serviceFile" label="Upload Image" accept="image/*">
            <template v-slot:prepend><q-icon name="cloud_upload" /></template>
          </q-file>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="white" v-close-popup />
          <q-btn flat label="Save" color="accent" :loading="uploading" @click="saveService" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Staff Dialog -->
    <q-dialog v-model="staffDialog">
      <q-card class="bg-grey-9 text-white" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ isEdit ? 'Edit' : 'Add' }} Staff Member</div>
        </q-card-section>
        <q-card-section class="q-gutter-md">
          <q-input dark filled v-model="staffForm.name" label="Full Name" />
          <q-input dark filled v-model="staffForm.email" label="Email (For Login)" hint="User must sign up with this email" />
          <q-input dark filled v-model="staffForm.role" label="Role Title (e.g. Senior Stylist)" />
          <q-select dark filled v-model="staffForm.specialties" multiple :options="['Hair', 'Skin', 'Spa', 'Beard']" label="Specialties" />
          
          <div v-if="staffForm.image_url" class="q-mb-sm text-center">
             <img :src="staffForm.image_url" style="max-height: 100px; border-radius: 50%;">
          </div>
          <q-file dark filled v-model="staffFile" label="Upload Photo" accept="image/*">
             <template v-slot:prepend><q-icon name="cloud_upload" /></template>
          </q-file>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="white" v-close-popup />
          <q-btn flat label="Save" color="accent" :loading="uploading" @click="saveStaff" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Booking Edit Dialog -->
    <q-dialog v-model="editBookingDialog">
      <q-card class="bg-grey-9 text-white" style="min-width: 400px">
        <q-card-section><div class="text-h6">Edit Appointment</div></q-card-section>
        <q-card-section class="q-gutter-md">
           <q-input dark filled v-model="bookingForm.date" type="date" label="Date" />
           <q-input dark filled v-model="bookingForm.time" type="time" label="Time" />
           <q-select dark filled v-model="bookingForm.status" :options="['pending', 'confirmed', 'completed', 'cancelled']" label="Status" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="white" v-close-popup />
          <q-btn flat label="Update" color="accent" :loading="uploading" @click="saveBooking" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { supabase } from 'boot/supabase'
import { date, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useNotifications } from 'src/composables/useNotifications'

const $q = useQuasar()
const router = useRouter()
const { sendNotification } = useNotifications()

// State
const activeTab = ref('bookings')
const loading = ref(false)
const userRole = ref(null)
const bookings = ref([])
const services = ref([])
const staff = ref([])

// Dialogs
const serviceDialog = ref(false)
const staffDialog = ref(false)
const editBookingDialog = ref(false)
const isEdit = ref(false)
const processingId = ref(null)
const currentStaffId = ref(null)

// Computed
const myBookings = computed(() => {
  if (!currentStaffId.value) return []
  return bookings.value.filter(b => b.staff_id === currentStaffId.value)
})

// Forms
const serviceForm = ref({ id: null, name: '', category: '', price: 0, duration_min: 60, description: '', image_url: '' })
const staffForm = ref({ id: null, name: '', email: '', role: '', specialties: [], image_url: '' })
const bookingForm = ref({ id: null, date: '', time: '', status: '' })

// File Models
const serviceFile = ref(null)
const staffFile = ref(null)
const uploading = ref(false)

// Columns
const bookingColumns = [
  { name: 'date', label: 'Date', field: row => date.formatDate(row.start_time, 'YYYY-MM-DD'), sortable: true, align: 'left' },
  { name: 'time', label: 'Time', field: row => date.formatDate(row.start_time, 'h:mm A'), sortable: true, align: 'left' },
  { name: 'service', label: 'Service', field: row => row.services?.name || 'N/A', align: 'left' },
  { name: 'staff', label: 'Provider', field: row => row.staff?.name || 'Any', align: 'left' },
  { name: 'customer', label: 'Customer', field: row => row.profiles?.full_name || row.profiles?.email || 'Unknown', align: 'left' },
  { name: 'status', label: 'Status', field: 'status', align: 'center', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
]

const serviceColumns = [
  { name: 'image', label: '', field: 'image_url', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'category', label: 'Category', field: 'category', align: 'left', sortable: true },
  { name: 'price', label: 'Price', field: 'price', format: val => `LKR ${val}`, align: 'right' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' }
]

const staffColumns = [
  { name: 'image', label: '', field: 'image_url', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'role', label: 'Title', field: 'role', align: 'left' },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'specialties', label: 'Specialties', field: 'specialties', align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' }
]

// Initialization
onMounted(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    
    // Check Role
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    userRole.value = profile?.role

    if (!['admin', 'staff'].includes(userRole.value)) {
       $q.notify({ type: 'negative', message: 'Unauthorized Access' })
       router.push('/dashboard')
       return
    }

    fetchBookings()
    if (userRole.value === 'admin') {
       fetchServices()
       fetchStaff()
       // Fetch linked staff ID for Admin
       const { data: s } = await supabase.from('staff').select('id').eq('user_id', user.id).maybeSingle()
       if (s) currentStaffId.value = s.id
    }
})

// --- DATA FETCHING ---
const fetchBookings = async () => {
  loading.value = true
  // RLS filters this automatically for Staff vs Admin
  const { data, error } = await supabase
     .from('appointments')
     .select('*, services(name, price), profiles(full_name, email), staff(name)')
     .order('start_time', { ascending: false })
  
  if (!error) bookings.value = data
  loading.value = false
}

const fetchServices = async () => {
  const { data } = await supabase.from('services').select('*').order('name')
  services.value = data || []
}

const fetchStaff = async () => {
  const { data } = await supabase.from('staff').select('*').order('name')
  staff.value = data || []
}

// --- HELPERS ---
const uploadImage = async (file) => {
   if (!file) return null
   const fileExt = file.name.split('.').pop()
   const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`
   const filePath = `${fileName}`
   
   const { error: uploadError } = await supabase.storage
      .from('salon-images')
      .upload(filePath, file)
      
   if (uploadError) throw uploadError
   
   const { data } = supabase.storage
      .from('salon-images')
      .getPublicUrl(filePath)
      
   return data.publicUrl
}

// --- ACTIONS: BOOKINGS ---
const getStatusColor = (status) => {
  if (status === 'confirmed') return 'positive'
  if (status === 'completed') return 'blue'
  if (status === 'cancelled') return 'red'
  return 'orange'
}

const updateAppointmentStatus = async (id, status) => {
   processingId.value = id
   try {
      const { error } = await supabase.from('appointments').update({ status }).eq('id', id)
      if (error) throw error
      
      // Send Email Notification
      await sendNotification(status, { id })

      // Update Local State (Bookings & My Schedule)
      const bIndex = bookings.value.findIndex(b => b.id === id)
      if (bIndex > -1) bookings.value[bIndex].status = status

      const mIndex = myBookings.value.findIndex(b => b.id === id)
      if (mIndex > -1) myBookings.value[mIndex].status = status
      
      $q.notify({ type: 'positive', message: `Booking ${status}` })
   } catch (err) {
      console.error(err)
      $q.notify({ type: 'negative', message: 'Update failed' })
   } finally {
      processingId.value = null
   }
}

const openBookingDialog = (row) => {
   const d = new Date(row.start_time)
   bookingForm.value = {
      id: row.id,
      date: date.formatDate(d, 'YYYY-MM-DD'),
      time: date.formatDate(d, 'HH:mm'),
      status: row.status
   }
   editBookingDialog.value = true
}

const saveBooking = async () => {
   uploading.value = true
   const { id, date: d, time, status } = bookingForm.value
   
   const [year, month, day] = d.split('-').map(Number)
   const [hours, minutes] = time.split(':').map(Number)
   const localDate = new Date(year, month - 1, day, hours, minutes)
   const newStart = localDate.toISOString() 
   
   const { error } = await supabase.from('appointments').update({ start_time: newStart, status }).eq('id', id)
   uploading.value = false
   
   if (!error) {
      editBookingDialog.value = false
      $q.notify({ type: 'positive', message: 'Booking updated' })
      fetchBookings()
      
      // Notify (Assume rescheduled if time changed, or just generic update)
      // I'll send 'rescheduled' as it's the main edit action here
      sendNotification('rescheduled', { id })
   } else {
      $q.notify({ type: 'negative', message: 'Failed to update' })
   }
}

const deleteBooking = async (id) => {
   $q.dialog({
     title: 'Confirm',
     message: 'Delete this appointment permanently?',
     cancel: true,
     persistent: true,
     dark: true
   }).onOk(async () => {
     const { error } = await supabase.from('appointments').delete().eq('id', id)
     if(error) $q.notify({ type: 'negative', message: 'Failed to delete' })
     else {
        $q.notify({ type: 'positive', message: 'Appointment deleted' })
        fetchBookings()
     }
   })
}

// --- ACTIONS: SERVICES ---
const openServiceDialog = (item = null) => {
  isEdit.value = !!item
  serviceForm.value = item ? { ...item } : { name: '', category: '', price: 0, duration_min: 60, description: '', image_url: '' }
  serviceFile.value = null // Reset file
  serviceDialog.value = true
}

const saveService = async () => {
  uploading.value = true
  try {
      let imageUrl = serviceForm.value.image_url
      if (serviceFile.value) {
          imageUrl = await uploadImage(serviceFile.value)
      }

      const payload = { ...serviceForm.value, image_url: imageUrl }
      delete payload.id 
      
      let error
      if (isEdit.value) {
         ({ error } = await supabase.from('services').update(payload).eq('id', serviceForm.value.id))
      } else {
         ({ error } = await supabase.from('services').insert(payload))
      }

      if (error) throw error
      
      $q.notify({ type: 'positive', message: 'Service saved' })
      serviceDialog.value = false
      fetchServices()

  } catch (err) {
      $q.notify({ type: 'negative', message: 'Error saving service: ' + err.message })
  } finally {
      uploading.value = false
  }
}

const deleteService = async (id) => {
  if (!confirm('Are you sure?')) return
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (!error) fetchServices()
}

// --- ACTIONS: STAFF ---
const openStaffDialog = (item = null) => {
  isEdit.value = !!item
  staffForm.value = item ? { ...item } : { name: '', email: '', role: '', specialties: [], image_url: '' }
  staffFile.value = null // Reset file
  staffDialog.value = true
}

const saveStaff = async () => {
  uploading.value = true
  try {
      let imageUrl = staffForm.value.image_url
      if (staffFile.value) {
          imageUrl = await uploadImage(staffFile.value)
      }

      const payload = { ...staffForm.value, image_url: imageUrl }
      delete payload.id 

      let error
      if (isEdit.value) {
         ({ error } = await supabase.from('staff').update(payload).eq('id', staffForm.value.id))
      } else {
         ({ error } = await supabase.from('staff').insert(payload))
      }

      if (error) throw error

      $q.notify({ type: 'positive', message: 'Staff saved. Note: User must sign up with this email.' })
      staffDialog.value = false
      fetchStaff()

  } catch (err) {
       $q.notify({ type: 'negative', message: 'Error saving staff: ' + err.message })
  } finally {
       uploading.value = false
  }
}

const deleteStaff = async (id) => {
  if (!confirm('Are you sure?')) return
  const { error } = await supabase.from('staff').delete().eq('id', id)
  if (!error) fetchStaff()
}

</script>

<style scoped>
.font-serif { font-family: 'Playfair Display', serif; }
.radius-md { border-radius: 8px; }
:deep(.header-accent th) { color: #FF0000 !important; font-weight: bold; font-size: 1.1em; }
</style>
