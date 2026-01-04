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
            <h1 class="text-h2 font-serif text-weight-bold q-mb-md text-white gt-sm">Our Services</h1>
            <h1 class="text-h3 font-serif text-weight-bold q-mb-md text-white lt-md">Our Services</h1>
            <p class="text-h6 text-grey-4 gt-sm">Premium treatments for your hair, skin, and body</p>
            <p class="text-subtitle1 text-grey-4 lt-md">Premium treatments for your hair, skin, and body</p>
          </div>
        </div>
      </q-img>
    </div>

    <!-- Services Grid -->
    <div class="container q-pa-md q-mx-auto" style="max-width: 1200px">
      <!-- Hair Services -->
      <div class="q-mb-xl">
        <div class="row items-center q-mb-lg">
          <q-icon name="content_cut" color="accent" size="32px" class="q-mr-sm" />
          <h2 class="text-h4 font-serif q-my-none gt-sm">Hair Care</h2>
          <h2 class="text-h5 font-serif q-my-none lt-md">Hair Care</h2>
        </div>
        
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-4" v-for="service in hairServices" :key="service.name">
            <q-card class="bg-grey-10 text-white full-height service-card">
              <q-img :src="service.image" style="height: 200px" />
              <q-card-section>
                <div class="row items-center justify-between q-mb-sm">
                  <div class="text-h6">{{ service.name }}</div>
                  <div class="text-accent text-h6">{{ service.price }}</div>
                </div>
                <div class="text-grey-4">{{ service.description }}</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat color="accent" label="Book Now" to="/book" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Skin & Beauty -->
      <div class="q-mb-xl">
        <div class="row items-center q-mb-lg">
          <q-icon name="face" color="accent" size="32px" class="q-mr-sm" />
          <h2 class="text-h4 font-serif q-my-none gt-sm">Skin & Beauty</h2>
          <h2 class="text-h5 font-serif q-my-none lt-md">Skin & Beauty</h2>
        </div>
        
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-4" v-for="service in skinServices" :key="service.name">
            <q-card class="bg-grey-10 text-white full-height service-card">
              <q-img :src="service.image" style="height: 200px" />
              <q-card-section>
                <div class="row items-center justify-between q-mb-sm">
                  <div class="text-h6">{{ service.name }}</div>
                  <div class="text-accent text-h6">{{ service.price }}</div>
                </div>
                <div class="text-grey-4">{{ service.description }}</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat color="accent" label="Book Now" to="/book" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const hairServices = [
  {
    name: 'Premium Cut & Style',
    price: '$50+',
    description: 'Expert consultation followed by a precision cut and professional styling.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Color & Highlights',
    price: '$120+',
    description: 'Full range of coloring services using premium products for vibrant results.',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Keratin Treatment',
    price: '$200+',
    description: 'Smoothing treatment to eliminate frizz and improved hair texture.',
    image: 'https://images.unsplash.com/photo-1522337360477-36358785ee0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  }
]

const skinServices = [
  {
    name: 'Luxury Facial',
    price: '$85',
    description: 'Deep cleansing and rejuvenating facial treatment for glowing skin.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Manicure & Pedicure',
    price: '$60',
    description: 'Complete nail care service including massage and polish.',
    image: 'https://images.unsplash.com/photo-1610992015732-2449b0c26670?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Bridal Makeup',
    price: '$150+',
    description: 'Professional makeup application for your special day.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  }
]
</script>

<style lang="scss" scoped>
.bg-black-50 {
  background-color: rgba(0, 0, 0, 0.5);
}

.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
    border-color: $accent;
  }
}
</style>
