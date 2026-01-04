<template>
  <q-page class="bg-white">
    <!-- Hero Section -->
    <div
      class="hero-section relative-position flex flex-center text-center text-white"
      style="height: 95vh; background: url('/hero.png') center/cover no-repeat fixed"
    >
      <div class="absolute-full bg-black" style="opacity: 0.4"></div>
      <!-- Gradient Overlay for depth -->
      <div class="absolute-full" style="background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));"></div>

      <div class="relative-position q-pa-md container-limit fade-in-up" style="z-index: 1;">
        <div class="text-overline text-accent q-mb-sm tracking-widest text-subtitle2-sm">WELCOME TO LUXE</div>
        <h1 class="text-h1 text-weight-bolder q-mt-none q-mb-md heading-font gt-sm" style="line-height: 1.1">
          Experience <span class="text-italic text-accent">True</span> Luxury
        </h1>
        <h1 class="text-h3 text-weight-bolder q-mt-none q-mb-md heading-font lt-md" style="line-height: 1.1">
          Experience <span class="text-italic text-accent">True</span> Luxury
        </h1>
        <p class="text-h5 q-mb-xl text-grey-3 text-weight-light gt-sm">
          Premium Hair, Skin & Body Treatments for the Elegant You
        </p>
         <p class="text-subtitle1 q-mb-xl text-grey-3 text-weight-light lt-md">
          Premium Hair, Skin & Body Treatments for the Elegant You
        </p>
        <q-btn
          unelevated
          rounded
          color="accent"
          size="lg"
          label="Book Appointment"
          to="/book"
          class="q-px-xl q-py-md text-weight-bold shadow-10 btn-hover-effect"
        />
      </div>

      <!-- Scroll Down Indicator -->
      <div class="absolute-bottom text-center q-pb-lg animate-bounce" style="z-index: 1">
        <q-icon name="keyboard_arrow_down" size="40px" color="white" />
      </div>
    </div>

    <!-- Introduction Section -->
    <div class="row q-pa-md-xl q-pa-lg-xl q-pa-sm justify-center bg-grey-1 section-spacing">
      <div class="col-12 col-md-8 text-center">
        <div class="section-title">
          <span class="text-accent text-uppercase text-weight-bold tracking-widest">Our Story</span>
          <h2 class="text-h3 text-black text-weight-medium q-mt-sm q-mb-md gt-sm">Redefining Beauty</h2>
          <h2 class="text-h4 text-black text-weight-medium q-mt-sm q-mb-md lt-md">Redefining Beauty</h2>
          <div class="separator-line bg-accent q-mx-auto q-mb-lg"></div>
        </div>
        <p class="text-grey-8 text-body1 leading-relaxed">
          At Luxe Salon, we believe that beauty is an art form. Established in 2024, our sanctuary offers a world-class escape from the ordinary. Our expert stylists and therapists are dedicated to bringing out your inner glow with personalized treatments using only the finest premium products.
        </p>
      </div>
    </div>

    <!-- Services Section -->
    <div class="q-pa-md-xl q-pa-lg-xl q-pa-sm bg-white section-spacing">
      <div class="text-center q-mb-xl">
        <div class="text-accent text-uppercase text-weight-bold tracking-widest">What We Offer</div>
        <h3 class="text-h2 text-weight-bold q-mt-sm q-mb-none gt-sm">Our Services</h3>
        <h3 class="text-h4 text-weight-bold q-mt-sm q-mb-none lt-md">Our Services</h3>
      </div>

      <div class="row q-col-gutter-xl">
        <div class="col-12 col-md-4" v-for="(service, index) in services" :key="index">
          <q-card class="service-card no-shadow">
            <div class="img-wrapper overflow-hidden radius-lg">
              <q-img :src="service.img" :ratio="4/3" class="service-img" />
            </div>
            <q-card-section class="q-pt-lg text-center">
              <div class="text-h5 q-mb-sm font-serif">{{ service.title }}</div>
              <p class="text-grey-6">{{ service.desc }}</p>
              <q-btn flat dense no-caps color="accent" label="View Menu" icon-right="arrow_forward" class="hover-underline" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Features / Stats Section -->
    <div class="bg-black text-white q-pa-md-xl q-pa-lg-xl q-pa-sm section-spacing">
      <div class="row q-col-gutter-lg text-center justify-center">
        <div class="col-6 col-md-3">
          <div class="text-h2 text-accent text-weight-bold">50+</div>
          <div class="text-uppercase tracking-wide text-grey-4 q-mt-sm">Expert Stylists</div>
        </div>
        <div class="col-6 col-md-3">
          <div class="text-h2 text-accent text-weight-bold">2k+</div>
          <div class="text-uppercase tracking-wide text-grey-4 q-mt-sm">Happy Clients</div>
        </div>
        <div class="col-6 col-md-3">
          <div class="text-h2 text-accent text-weight-bold">10+</div>
          <div class="text-uppercase tracking-wide text-grey-4 q-mt-sm">Years Experience</div>
        </div>
        <div class="col-6 col-md-3">
          <div class="text-h2 text-accent text-weight-bold">100%</div>
          <div class="text-uppercase tracking-wide text-grey-4 q-mt-sm">Premium Products</div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="q-pa-md-xl q-pa-lg-xl q-pa-sm bg-grey-1 section-spacing">
       <div class="text-center q-mb-xl">
        <h3 class="text-h3 text-weight-bold q-mt-none gt-sm">Client Love</h3>
        <h3 class="text-h4 text-weight-bold q-mt-none lt-md">Client Love</h3>
        <div class="separator-line bg-accent q-mx-auto"></div>
      </div>
      <div class="row q-col-gutter-lg justify-center">
        <div class="col-12 col-md-4" v-for="n in 3" :key="n">
           <q-card class="q-pa-lg no-shadow bordered-card radius-lg">
             <div class="row q-mb-md">
               <q-icon name="star" color="warning" v-for="s in 5" :key="s"/>
             </div>
             <p class="text-grey-8 text-italic line-clamp-3">
               "Absolutely stunning experience! The staff was incredibly professional and the ambiance was just what I needed to relax. Highly recommended!"
             </p>
             <div class="row items-center q-mt-md">
               <q-avatar size="40px" class="bg-grey-4 text-grey-8">U{{n}}</q-avatar>
               <div class="q-ml-md">
                 <div class="text-weight-bold">Happy Customer</div>
                 <div class="text-caption text-grey">Regular Member</div>
               </div>
             </div>
           </q-card>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-black text-white q-pa-md-xl q-pa-lg-xl q-pa-md text-center section-spacing relative-position overflow-hidden">
      <div class="absolute-full" style="background: rgba(0,0,0,0.1)"></div> <!-- texture overlay -->
      <div class="relative-position">
        <h2 class="text-h3 text-weight-bold q-mt-none q-mb-md gt-sm">Ready to Transform?</h2>
        <h2 class="text-h4 text-weight-bold q-mt-none q-mb-md lt-md">Ready to Transform?</h2>
        <p class="text-h6 text-white text-weight-light q-mb-xl" style="opacity: 0.9">
          Book your exclusive appointment today and experience the difference.
        </p>
        <q-btn outline rounded color="white" text-color="white" label="Book Now" size="xl" to="/book" class="q-px-xl border-2" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
const services = [
  { img: '/hair_styling.png', title: 'Hair Artistry', desc: 'Expert cuts, coloring, and styling tailored to your unique personality and lifestyle.' },
  { img: '/skin_care.png', title: 'Radiant Skin', desc: 'Rejuvenating facials and advanced skin treatments for that perfect, healthy glow.' },
  { img: '/spa_massage.png', title: 'Holistic Spa', desc: 'Relax, unwind and de-stress with our therapeutic massage and body sessions.' }
]
</script>

<style scoped>
/* Utility Classes */
.tracking-widest { letter-spacing: 0.2em; }
.tracking-wide { letter-spacing: 0.1em; }
.leading-relaxed { line-height: 1.8; }
.radius-lg { border-radius: 16px; }
.section-spacing { padding-top: 100px; padding-bottom: 100px; }
.container-limit { max-width: 900px; margin: 0 auto; }
.separator-line { height: 3px; width: 60px; }
.border-2 { border-width: 2px; }

/* Hero Animation */
.fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Service Cards */
.service-card {
  transition: all 0.3s ease;
  .img-wrapper {
    overflow: hidden;
    border-radius: 8px; /* Matching radius-lg */
  }
}

.service-img {
  transition: transform 0.5s ease;
}

.service-card:hover .service-img {
  transform: scale(1.1);
}

.hover-underline {
  position: relative;
}
.hover-underline::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: currentColor;
  transition: width 0.3s ease;
}
.hover-underline:hover::after {
  width: 100%;
}

/* Button Effects */
.btn-hover-effect {
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-hover-effect:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2) !important;
}
</style>
