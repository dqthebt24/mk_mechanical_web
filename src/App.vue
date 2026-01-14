<template>
  <div class="app">
    <header :class="{ 'floating': isScrolled }">
      <div class="header-content">
        <div class="logo-section">
          <img :src="logo" alt="Logo" class="logo">
        </div>
        
        <button class="hamburger" @click="mobileMenuOpen = !mobileMenuOpen" :class="{ 'active': mobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav class="navigation" :class="{ 'mobile-open': mobileMenuOpen }">
          <a @click.prevent="scrollToSection('home'); mobileMenuOpen = false" href="#home" class="nav-link">{{ t('nav.home') }}</a>
          <a @click.prevent="scrollToSection('products'); mobileMenuOpen = false" href="#products" class="nav-link">{{ t('nav.products') }}</a>
          <a @click.prevent="scrollToSection('about'); mobileMenuOpen = false" href="#about" class="nav-link">{{ t('nav.about') }}</a>
          
          <div class="theme-controls mobile-in-menu" :class="{ 'mobile-open': mobileMenuOpen }">
            <div class="theme-dropdown">
              <select v-model="locale" @change="changeLanguage(locale)" class="theme-select">
                <option value="en">{{ t('languages.english') }}</option>
                <option value="vi">{{ t('languages.vietnamese') }}</option>
              </select>
            </div>
            <div class="theme-dropdown">
              <select v-model="selectedTheme" @change="changeTheme" class="theme-select">
                <option v-for="theme in themes" :key="theme.value" :value="theme.value">
                  {{ t(theme.label) }}
                </option>
              </select>
            </div>
          </div>
        </nav>
        
        <div class="theme-controls desktop-only">
          <div class="theme-dropdown">
            <select v-model="locale" @change="changeLanguage(locale)" class="theme-select">
              <option value="en">{{ t('languages.english') }}</option>
              <option value="vi">{{ t('languages.vietnamese') }}</option>
            </select>
          </div>
          <div class="theme-dropdown">
            <select v-model="selectedTheme" @change="changeTheme" class="theme-select">
              <option v-for="theme in themes" :key="theme.value" :value="theme.value">
                {{ t(theme.label) }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <section id="home" class="products-intro">
      <div class="image-container image1" :class="{ active: currentImage === 0 }">
        <img :src="intro1" alt="Intro Image 1" class="intro-image">
      </div>
      <div class="image-container image2" :class="{ active: currentImage === 1 }">
        <img :src="intro2" alt="Intro Image 2" class="intro-image">
      </div>
      <div class="site-intro">
        <h2>{{t('intro.title')}}</h2>
        <p>{{t('intro.description')}}</p>
      </div>
      <div class="navigation-dots">
        <button 
          v-for="(dot, index) in 2" 
          :key="index"
          @click="setCurrentImage(index)"
          :class="{ active: currentImage === index }"
          class="nav-dot"
        ></button>
      </div>
    </section>

    <main>
      <section id="products" class="products-section">
        <h2>{{ t('sections.products') }}</h2>
        <div class="products-carousel">
          <button @click="prevProduct" class="carousel-arrow arrow-left" :aria-label="'Previous product'">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div class="products-slider">
            <div 
              class="product-card"
              v-for="(product, index) in products"
              :key="product.id"
              :class="{ 
                active: index === currentProductIndex,
                prev: index === (currentProductIndex - 1 + products.length) % products.length,
                next: index === (currentProductIndex + 1) % products.length
              }"
            >
              <div class="product-image-wrapper">
                <img :src="product.image" :alt="t(product.titleKey)" class="product-image">
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ t(product.titleKey) }}</h3>
                <p class="product-description">{{ t(product.descriptionKey) }}</p>
                <a :href="product.detailLink" class="view-detail-btn">{{ t('products.viewDetail') }}</a>
              </div>
            </div>
          </div>
          
          <button @click="nextProduct" class="carousel-arrow arrow-right" :aria-label="'Next product'">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        
        <div class="product-indicators">
          <button 
            v-for="(product, index) in products"
            :key="index"
            @click="setProductIndex(index)"
            :class="{ active: index === currentProductIndex }"
            class="product-indicator"
          ></button>
        </div>
      </section>

      <section id="about" class="about-section">
        <h2>{{ t('sections.about') }}</h2>
        <p>{{ t('about.description') }}</p>
        
        <div class="contact-us">
          <div class="contact-info">
            <p class="contact-item">
              <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{{ t('about.address') }}</span>
            </p>
            <p class="contact-item">
              <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a :href="'mailto:' + t('about.email')" class="contact-link">{{ t('about.email') }}</a>
            </p>
            <p class="contact-item">
              <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <a :href="'tel:' + t('about.phone').replace(/\\s/g, '')" class="contact-link">{{ t('about.phone') }}</a>
            </p>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>{{ t('messages.builtWith') }}</p>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { version } from 'vue'
import { useI18n } from 'vue-i18n'
import { applyTheme, colorThemes } from './utils/themes.js'
import intro1 from './assets/images/intro_1.jpg'
import intro2 from './assets/images/intro_2.jpg'
import logo from './assets/images/LOGO-2.png'
import product1 from './assets/products/dea84daa22.jpg'
import product2 from './assets/products/2-4170.jpg'
import product3 from './assets/products/ip1.jpg'
import product4 from './assets/products/afa20505a8.jpg'

export default {
  name: 'App',
  setup() {
    const { t, locale } = useI18n()
    const selectedTheme = ref('light')
    const currentImage = ref(0)
    const isScrolled = ref(false)
    const currentProductIndex = ref(0)
    const mobileMenuOpen = ref(false)
    const isTransitioning = ref(false)

    const products = ref([
      {
        id: 1,
        image: product1,
        titleKey: 'products.items.0.title',
        descriptionKey: 'products.items.0.description',
        detailLink: '#product-1'
      },
      {
        id: 2,
        image: product2,
        titleKey: 'products.items.1.title',
        descriptionKey: 'products.items.1.description',
        detailLink: '#product-2'
      },
      {
        id: 3,
        image: product3,
        titleKey: 'products.items.2.title',
        descriptionKey: 'products.items.2.description',
        detailLink: '#product-3'
      },
      {
        id: 4,
        image: product4,
        titleKey: 'products.items.3.title',
        descriptionKey: 'products.items.3.description',
        detailLink: '#product-4'
      }
    ])

    const themes = ref([
      { value: 'light', label: 'themes.light' },
      { value: 'dark', label: 'themes.dark' },
      { value: 'material', label: 'themes.material' },
      { value: 'dracula', label: 'themes.dracula' },
      { value: 'nord', label: 'themes.nord' },
      { value: 'monokai', label: 'themes.monokai' },
      { value: 'github', label: 'themes.github' },
      { value: 'sunset', label: 'themes.sunset' },
      { value: 'ocean', label: 'themes.ocean' }
    ])

    const changeTheme = () => {
      applyTheme(selectedTheme.value)
      localStorage.setItem('theme', selectedTheme.value)
    }

    const setCurrentImage = (index) => {
      currentImage.value = index
    }

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = document.querySelector('header').offsetHeight
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight - 10
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }

    const changeLanguage = (lang) => {
      locale.value = lang
      localStorage.setItem('language', lang)
    }

    const nextProduct = () => {
      if (isTransitioning.value) return
      isTransitioning.value = true
      currentProductIndex.value = (currentProductIndex.value + 1) % products.value.length
      setTimeout(() => { isTransitioning.value = false }, 350)
    }

    const prevProduct = () => {
      if (isTransitioning.value) return
      isTransitioning.value = true
      currentProductIndex.value = (currentProductIndex.value - 1 + products.value.length) % products.value.length
      setTimeout(() => { isTransitioning.value = false }, 350)
    }

    const setProductIndex = (index) => {
      if (isTransitioning.value || index === currentProductIndex.value) return
      isTransitioning.value = true
      currentProductIndex.value = index
      setTimeout(() => { isTransitioning.value = false }, 350)
    }

    const themeTextStyle = computed(() => {
      const currentTheme = colorThemes[selectedTheme.value] || colorThemes.light
      
      return {
        title: currentTheme.primary,
        description: currentTheme.textPrimary,
        shadow: `2px 2px 8px ${currentTheme.primary}40`
      }
    })

    onMounted(() => {
      const savedLanguage = localStorage.getItem('language') || 'en'
      locale.value = savedLanguage
      
      const savedTheme = localStorage.getItem('theme') || 'light'
      selectedTheme.value = savedTheme
      applyTheme(savedTheme)
      
      setInterval(() => {
        currentImage.value = (currentImage.value + 1) % 2
      }, 5000)
      
      // Add scroll event listener for floating header
      const handleScroll = () => {
        isScrolled.value = window.scrollY > 100
      }
      
      window.addEventListener('scroll', handleScroll)
      
      // Cleanup on unmount
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    })

    watch(mobileMenuOpen, (isOpen) => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    })

    return {
      t,
      locale,
      selectedTheme,
      themes,
      intro1,
      intro2,
      logo,
      currentImage,
      isScrolled,
      changeTheme,
      changeLanguage,
      setCurrentImage,
      scrollToSection,
      products,
      currentProductIndex,
      mobileMenuOpen,
      nextProduct,
      prevProduct,
      setProductIndex,
      themeTextStyle
    }
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background: transparent;
  color: var(--text-white);
  padding: 2rem;
  transition: all 0.3s ease-in-out;
  transform: translateY(0);
}

header.floating {
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  padding: 1rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
  width: auto;
  object-fit: contain;
  transition: all 0.3s ease;
}

header.floating .logo {
  height: 40px;
}

.navigation {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

.hamburger {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 4px;
  z-index: 1001;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: var(--text-white);
  transition: transform 0.2s ease, opacity 0.2s ease, background 0.2s ease;
  border-radius: 3px;
  will-change: transform;
}

.hamburger.active span {
  background: var(--primary-color);
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.nav-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

.nav-link:hover {
  color: var(--primary-light);
  background: transparent;
  transform: translateY(-2px);
}

.nav-link:active {
  color: var(--primary-light);
  transform: translateY(0);
}

@media (hover: none) and (pointer: coarse) {
  .nav-link:hover {
    backdrop-filter: none;
    transform: none;
  }
  
  .nav-link:active {
    background: transparent;
  }
}

header.floating .nav-link {
  font-size: 1rem;
  padding: 0.4rem 0.8rem;
}

header.floating .nav-link:hover {
  color: var(--primary-light);
  background: transparent;
  transform: translateY(-2px);
}

header.floating .nav-link:active {
  color: var(--primary-light);
}

.theme-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.theme-controls.mobile-in-menu {
  display: none;
}

.theme-controls.desktop-only {
  display: flex;
}

.theme-dropdown {
  position: relative;
}

.theme-select {
  appearance: none;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--border-light);
  border-radius: 8px;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  min-width: 160px;
}

header.floating .theme-select {
  padding: 0.5rem 2rem 0.5rem 0.8rem;
  font-size: 0.9rem;
  min-width: 140px;
}

.theme-select:hover {
  border-color: var(--border-focus);
  box-shadow: var(--shadow-hover);
}

.theme-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}

main {
  flex: 1;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  position: relative;
  z-index: 5;
}

section {
  background: var(--bg-card);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.about-section {
  background: var(--bg-primary);
  padding: 4rem 2rem;
  margin-bottom: 0;
  border-radius: 0;
  box-shadow: none;
}

.about-section h2 {
  text-align: left;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-primary);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 5rem;
}

.about-section p {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 5rem;
  padding-right: 5rem;
  text-align: left;
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

h2 {
  margin-top: 0;
  color: var(--text-primary);
}

/* Products Section */
.products-section {
  background: var(--bg-primary);
  padding: 4rem 2rem;
  margin-bottom: 0;
  border-radius: 0;
  box-shadow: none;
}

.products-section h2 {
  text-align: left;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-primary);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 5rem;
}

.products-carousel {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.products-slider {
  position: relative;
  width: 100%;
  overflow: visible;
  height: 500px;
}

.product-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateX(100%) scale(0.85);
  transition: transform 0.4s ease-out, opacity 0.4s ease-out;
  display: flex;
  gap: 2rem;
  background: var(--bg-card);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  pointer-events: none;
  z-index: 1;
  will-change: transform, opacity;
}

.product-card.active {
  opacity: 1;
  transform: translateX(0) scale(1);
  pointer-events: auto;
  z-index: 3;
}

.product-card:not(.active) {
  opacity: 0;
  pointer-events: none;
}

/* Show previous card on the left */
.product-card.prev {
  opacity: 0.3;
  transform: translateX(-110%) scale(0.85);
  z-index: 2;
}

/* Show next card on the right */
.product-card.next {
  opacity: 0.3;
  transform: translateX(110%) scale(0.85);
  z-index: 2;
}

.product-image-wrapper {
  flex: 1;
  min-width: 50%;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-info {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-title {
  font-size: 2rem;
  margin: 0 0 1rem 0;
  color: var(--primary-color);
}

.product-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.view-detail-btn {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: var(--primary-color);
  color: var(--text-white);
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-align: center;
  align-self: flex-start;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.view-detail-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.carousel-arrow {
  background: var(--bg-card);
  border: 2px solid var(--border-light);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  flex-shrink: 0;
  color: var(--text-primary);
  box-shadow: var(--shadow);
  z-index: 10;
  position: relative;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.carousel-arrow:active {
  transform: scale(0.95);
}

.carousel-arrow svg {
  width: 24px;
  height: 24px;
  pointer-events: none;
}

.product-indicators {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.product-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid var(--border-light);
  background: transparent;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.product-indicator.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  transform: scale(1.3);
}

.contact-us {
  max-width: 1200px;
  margin: 3rem auto 0;
  padding-left: 0rem;
  padding-right: 0rem;
}

.contact-info {
  /* display: flex; */
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.contact-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-top: 0.2rem;
  color: var(--text-primary);
}

.contact-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: var(--text-primary);
  text-decoration: underline;
}

footer {
  background: var(--bg-primary);
  color: var(--text-primary);
  text-align: center;
  padding: 1rem;
}

footer p {
  margin: 0;
}

/* Products Intro Section */
.products-intro {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.8s ease-in-out;
}

.image-container.active {
  opacity: 1;
  transform: translateX(0);
}

.image-container:not(.active) {
  transform: translateX(-100%);
}

.intro-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image1 .intro-image {
  transform: scale(1.1) rotate(2deg);
}

.image2 .intro-image {
  transform: scale(1.15) rotate(-1deg);
}

.image-container:hover .intro-image {
  transform: scale(1.25) rotate(0deg);
}

.site-intro {
  position: relative;
  z-index: 15;
  text-align: center;
  color: var(--text-white);
  background: transparent;
  padding: 3rem 2rem;
  border-radius: 20px;
  animation: fadeInUp 2s ease-out;
  margin-top: 8rem;
}

.site-intro h2 {
  font-size: 3.5rem;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  animation: textGlow 3s ease-in-out infinite alternate;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.site-intro p {
  font-size: 1.4rem;
  margin: 0;
  opacity: 0.95;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}

.navigation-dots {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10;
}

.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid var(--border-light);
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-dot:hover {
  background: var(--primary-color);
  border-color: var(--border-light);
  transform: scale(1.2);
  box-shadow: 0 0 10px var(--primary-color);
}

.nav-dot.active {
  background: var(--primary-color);
  border-color: var(--border-light);
  transform: scale(1.3);
  box-shadow: 0 0 15px var(--primary-color);
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(60px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes textGlow {
  0% {
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  }
  100% {
    text-shadow: 0 0 25px rgba(255, 255, 255, 0.8), 2px 2px 8px rgba(0, 0, 0, 0.7);
  }
}

@media (hover: hover) and (pointer: fine) {
  .product-card:hover .product-image {
    transform: scale(1.05);
  }

  .carousel-arrow:hover {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--text-white);
    transform: scale(1.1);
  }

  .product-indicator:hover {
    background: var(--primary-light);
    border-color: var(--primary-color);
    transform: scale(1.2);
  }
}

@media (max-width: 768px) {
  footer {
    padding: 1rem 0.75rem;
  }
  
  footer p {
    font-size: 0.9rem;
  }

  header {
    padding: 1rem;
  }
  
  header.floating {
    padding: 0.75rem 1rem;
  }

  header.floating .logo {
    height: 40px;
  }
  
  main {
    padding: 1rem 0.75rem;
  }
  
  section {
    padding: 1.5rem 1rem;
    margin-bottom: 1.5rem;
  }

  .theme-dropdown {
    width: 70%
  }

  .theme-controls {
    justify-content: center;
    width: 100%;
    gap: 0.75rem;
  }
  
  .theme-select {
    justify-content: center;
    width: 100%;
    min-width: auto;
    font-size: 0.9rem;
    padding: 0.5rem 1.5rem 0.5rem 0.75rem;
  }
  
  .header-content {
    flex-direction: row-reverse;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .logo-section {
    align-self: center;
  }
  
  .logo {
    height: 35px;
  }

  .products-section {
    padding: 3rem 2rem;
  }
  
  .products-section h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    margin-left: auto;
    margin-right: auto;
    padding: 0 3.5rem;
  }
  
  .products-carousel {
    gap: 1rem;
  }
  
  .products-slider {
    height: auto;
    min-height: 550px;
    overflow: hidden;
  }
  
  .product-card {
    flex-direction: column;
    gap: 0;
  }
  
  .product-card.prev,
  .product-card.next {
    opacity: 0.3;
    transform: translateX(-105%) scale(0.9);
  }
  
  .product-card.next {
    transform: translateX(105%) scale(0.9);
  }
  
  .product-image-wrapper {
    min-width: 100%;
    max-height: 300px;
  }
  
  .product-info {
    padding: 1.5rem;
  }

  .products-intro {
    height: 70vh;
  }
  
  .site-intro {
    padding: 2rem 1rem;
    margin-top: 4rem;
  }
  
  .site-intro h2 {
    font-size: 2.5rem;
  }
  
  .site-intro p {
    font-size: 1.2rem;
  }
  
  .nav-dot {
    width: 10px;
    height: 10px;
  }

  .navigation-dots {
    bottom: 1.5rem;
    gap: 0.75rem;
  }
  
  .product-title {
    font-size: 1.5rem;
  }
  
  .product-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .carousel-arrow {
    width: 40px;
    height: 40px;
  }
  
  .carousel-arrow svg {
    width: 20px;
    height: 20px;
  }

  .about-section {
    padding: 3rem 2rem;
  }

  .about-section h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    padding: 0 3.5rem;
  }

  .about-section p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    padding: 0 3.5rem;
  }

  .hamburger {
    display: flex;
  }
  
  .theme-controls.desktop-only {
    display: none;
  }
  
  .theme-controls.mobile-in-menu {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .navigation {
    position: fixed;
    top: 0px;
    left: -100%;
    width: 100%;
    height: calc(100vh);
    background: color-mix(in srgb, var(--bg-primary) 80%, transparent);
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem;
    gap: 1.5rem;
    transition: left 0.25s ease-out;
    z-index: 1000;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    overflow-y: auto;
    will-change: left;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
  }
  
  .navigation.mobile-open {
    left: 0;
    padding-top: calc(6vh);
    z-index: 1000;
  }
}

@media (max-width: 480px) {
  header {
    padding: 0.75rem 0.5rem;
  }
  
  header.floating {
    padding: 0.5rem;
  }

  header.floating .logo {
    height: 25px;
  }

  footer {
    padding: 0.75rem 0.5rem;
  }
  
  footer p {
    font-size: 0.8rem;
  }

  main {
    padding: 0.75rem 0.5rem;
  }
  
  section {
    padding: 1rem 0.75rem;
    margin-bottom: 1rem;
    border-radius: 6px;
  }

  .products-intro {
    height: 60vh;
  }
  
  .site-intro {
    padding: 1.5rem 0.75rem;
    margin-top: 2rem;
  }
  
  .site-intro h2 {
    font-size: 2rem;
  }
  
  .site-intro p {
    font-size: 1rem;
  }
  
  .nav-dot {
    width: 8px;
    height: 8px;
    border-width: 1px;
  }

  .navigation-dots {
    bottom: 1rem;
    gap: 0.5rem;
  }
  
  .intro-image {
    object-fit: cover;
    object-position: center;
  }

  .hamburger {
    display: flex;
  }

  .theme-controls.desktop-only {
    display: none;
  }

  .theme-controls.mobile-in-menu {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .header-content {
    gap: 0.75rem;
    flex-direction: row-reverse;
    align-items: flex-start;
  }

  .logo-section {
    flex: -1;
  }

  .logo {
    height: 30px;
  }
  
  .navigation {
    gap: 0.5rem;
    flex-direction: column;
  }
  
  .nav-link {
    font-size: 0.85rem;
    padding: 0.3rem 0.6rem;
    width: 100%;
    text-align: center;
  }

  .navigation.mobile-open {
    left: 0;
    padding-top: calc(6vh);
    z-index: 1000;
  }
  
  .theme-dropdown {
    width: 80%;
  }

  .theme-controls {
    justify-content: center;
    width: 100%;
    gap: 0.75rem;
  }
  
  .theme-select {
    justify-content: center;
    width: 100%;
    min-width: auto;
    font-size: 0.85rem;
    padding: 0.4rem 1.25rem 0.4rem 0.6rem;
  }
  
  .about-section p {
    font-size: 1rem;
    line-height: 1.5;
  }

  .products-section {
    padding: 2rem 0.5rem;
  }
  
  .products-section h2 {
    font-size: 1.75rem;
    padding: 0 0.5rem;
  }
  
  .products-carousel {
    gap: 0.5rem;
  }
  
  .products-slider {
    min-height: 500px;
    overflow: hidden;
  }
  
  .product-card.prev,
  .product-card.next {
    opacity: 0;
    transform: translateX(-100%) scale(0.8);
    pointer-events: none;
  }
  
  .product-card.next {
    transform: translateX(100%) scale(0.8);
  }
  
  .product-card.active {
    transform: translateX(0) scale(1);
  }
  
  .product-image-wrapper {
    max-height: 220px;
  }

  .product-info {
    padding: 1rem;
  }
  
  .product-title {
    font-size: 1.25rem;
  }
  
  .product-description {
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }
  
  .view-detail-btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    width: 100%;
  }
  
  .carousel-arrow {
    width: 36px;
    height: 36px;
    border-width: 1px;
  }
  
  .carousel-arrow svg {
    width: 18px;
    height: 18px;
  }
  
  .product-indicators {
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
  
  .product-indicator {
    width: 10px;
    height: 10px;
  }

  .about-section {
    padding: 2rem 0.5rem;
  }

  .about-section h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }

  .about-section p {
    font-size: 1.0rem;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }

}

@media (max-width: 1024px) {
  .header-content {
    max-width: 95%;
    padding: 0 1rem;
  }
  
  .navigation {
    gap: 1.5rem;
  }
  
  main {
    padding: 1.5rem 1rem;
    max-width: 95%;
  }
}

</style>
