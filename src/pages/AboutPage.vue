<template>
  <q-page class="bg-black text-white">
    <!-- Hero Section -->
    <div class="relative-position q-mb-xl">
      <q-img
        src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        style="height: 400px"
      >
        <div class="absolute-full flex flex-center bg-black-50">
          <div class="text-center">
            <h1 class="text-h2 font-serif text-weight-bold q-mb-md text-white gt-sm">About Luxe</h1>
            <h1 class="text-h3 font-serif text-weight-bold q-mb-md text-white lt-md">About Luxe</h1>
            <p class="text-h6 text-grey-4 gt-sm">Redefining beauty since 2015</p>
            <p class="text-subtitle1 text-grey-4 lt-md">Redefining beauty since 2015</p>
          </div>
        </div>
      </q-img>
    </div>

    <div class="container q-pa-md q-mx-auto" style="max-width: 1200px">
      <!-- Our Story -->
      <div class="row q-col-gutter-xl items-center q-mb-xl">
        <div class="col-12 col-md-6">
          <q-img 
            src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            class="rounded-borders shadow-10"
            style="height: 400px"
          />
        </div>
        <div class="col-12 col-md-6">
          <div class="text-overline text-accent q-mb-sm">OUR STORY</div>
          <h2 class="text-h3 font-serif q-mt-none q-mb-md gt-sm">Excellence in Beauty</h2>
          <h2 class="text-h4 font-serif q-mt-none q-mb-md lt-md">Excellence in Beauty</h2>
          <p class="text-grey-4 text-body1 q-mb-md">
            Founded with a vision to create a sanctuary where beauty meets relaxation, Luxe Salon has grown into one of Colombo's premier beauty destinations. We believe that everyone deserves to feel confident and beautiful.
          </p>
          <p class="text-grey-4 text-body1 q-mb-lg">
            Our team of expert stylists and therapists are passionate about their craft, using only the finest products to ensure you get the best results. Whether you're here for a quick trim or a complete makeover, we're dedicated to making you look and feel your absolute best.
          </p>
          <div class="row q-gutter-md">
            <div>
              <div class="text-h4 text-accent text-weight-bold">10+</div>
              <div class="text-grey-5">Years Experience</div>
            </div>
            <div>
              <div class="text-h4 text-accent text-weight-bold">50+</div>
              <div class="text-grey-5">Expert Staff</div>
            </div>
            <div>
              <div class="text-h4 text-accent text-weight-bold">5k+</div>
              <div class="text-grey-5">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="q-py-xl">
        <div class="text-center q-mb-xl">
          <div class="text-overline text-accent">THE EXPERTS</div>
          <h2 class="text-h3 font-serif q-mt-none gt-sm">Meet Our Team</h2>
          <h2 class="text-h4 font-serif q-mt-none lt-md">Meet Our Team</h2>
        </div>

        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-3" v-for="member in team" :key="member.name">
            <q-card class="bg-transparent no-shadow text-center">
              <q-avatar size="200px" class="q-mb-md shadow-5">
                <q-img :src="member.image" />
              </q-avatar>
              <div class="text-h6 font-serif">{{ member.name }}</div>
              <div class="text-accent q-mb-sm">{{ member.role }}</div>
              <p class="text-grey-5 text-caption">{{ member.bio }}</p>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const team = [
  {
    name: 'Sarah James',
    role: 'Senior Stylist',
    bio: 'Specialist in creative coloring and modern cuts with 8 years of experience.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60'
  },
  {
    name: 'Michael Chen',
    role: 'Art Director',
    bio: 'Award-winning hair artist known for avant-garde styling.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60'
  },
  {
    name: 'Emma Watson',
    role: 'Beauty Therapist',
    bio: 'Expert in holistic skincare and rejuvenation therapies.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60'
  },
  {
    name: 'David Wilson',
    role: 'Colorist',
    bio: 'Master of balayage and color correction techniques.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60'
  }
]
</script>

<style lang="scss" scoped>
.bg-black-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
