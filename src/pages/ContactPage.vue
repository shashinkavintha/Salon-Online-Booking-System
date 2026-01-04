<template>
  <q-page class="bg-black text-white">
    <!-- Hero Section -->
    <div class="relative-position q-mb-xl">
      <q-img
        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        style="height: 400px"
      >
        <div class="absolute-full flex flex-center bg-black-50">
          <div class="text-center">
            <h1 class="text-h2 font-serif text-weight-bold q-mb-md text-white">Contact Us</h1>
            <p class="text-h6 text-grey-4">We'd love to hear from you</p>
          </div>
        </div>
      </q-img>
    </div>

    <div class="container q-pa-md q-mx-auto" style="max-width: 1200px">
      <div class="row q-col-gutter-xl">
        <!-- Contact Info -->
        <div class="col-12 col-md-5">
          <h2 class="text-h4 font-serif q-mt-none q-mb-lg">Get in Touch</h2>
          <p class="text-grey-4 q-mb-xl">
            Have questions about our services or need to report an issue? Please feel free to contact us. We are always ready to help you.
          </p>

          <div class="column q-gutter-lg">
            <div class="flex items-start">
              <q-icon name="location_on" color="accent" size="32px" class="q-mr-md" />
              <div>
                <div class="text-h6 text-white">Visit Us</div>
                <div class="text-grey-4">123 Luxury Lane, Colombo 07,<br/>Sri Lanka</div>
              </div>
            </div>

            <div class="flex items-start">
              <q-icon name="phone" color="accent" size="32px" class="q-mr-md" />
              <div>
                <div class="text-h6 text-white">Call Us</div>
                <div class="text-grey-4">+94 11 234 5678</div>
                <div class="text-grey-4">+94 77 123 4567</div>
              </div>
            </div>

            <div class="flex items-start">
              <q-icon name="email" color="accent" size="32px" class="q-mr-md" />
              <div>
                <div class="text-h6 text-white">Email Us</div>
                <div class="text-grey-4">hello@luxesalon.lk</div>
                <div class="text-grey-4">support@luxesalon.lk</div>
              </div>
            </div>

            <div class="flex items-start">
              <q-icon name="schedule" color="accent" size="32px" class="q-mr-md" />
              <div>
                <div class="text-h6 text-white">Opening Hours</div>
                <div class="text-grey-4">Mon - Sat: 9:00 AM - 8:00 PM</div>
                <div class="text-grey-4">Sun: 10:00 AM - 6:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="col-12 col-md-7">
          <q-card class="bg-grey-10 q-pa-lg contact-form-card">
            <h2 class="text-h4 font-serif q-mt-none q-mb-lg">Send Message</h2>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="name"
                    label="Your Name"
                    dark
                    outlined
                    color="accent"
                    :rules="[val => !!val || 'Field is required']"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="email"
                    label="Email Address"
                    dark
                    outlined
                    color="accent"
                    type="email"
                    :rules="[val => !!val || 'Field is required']"
                  />
                </div>
              </div>
              
              <q-input
                v-model="subject"
                label="Subject"
                dark
                outlined
                color="accent"
                :rules="[val => !!val || 'Field is required']"
              />

              <q-input
                v-model="message"
                label="Message"
                dark
                outlined
                color="accent"
                type="textarea"
                rows="6"
                :rules="[val => !!val || 'Field is required']"
              />

              <div class="text-right">
                <q-btn
                  label="Send Message"
                  type="submit"
                  color="accent"
                  size="lg"
                  :loading="submitting"
                />
              </div>
            </q-form>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const submitting = ref(false)

const onSubmit = () => {
  submitting.value = true
  
  // Simulate API call
  setTimeout(() => {
    submitting.value = false
    $q.notify({
      color: 'positive',
      message: 'Message sent successfully!',
      icon: 'check'
    })
    
    // Reset form
    name.value = ''
    email.value = ''
    subject.value = ''
    message.value = ''
  }, 1500)
}
</script>

<style lang="scss" scoped>
.bg-black-50 {
  background-color: rgba(0, 0, 0, 0.5);
}

.contact-form-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
