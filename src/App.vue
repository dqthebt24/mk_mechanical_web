<template>
  <div class="app">
    <header :class="{ 'floating': isScrolled }">
      <div class="header-content">
        <div class="logo-section">
          <img :src="logo" alt="Logo" class="logo">
        </div>
        <nav class="navigation">
          <a @click.prevent="scrollToSection('home')" href="#home" class="nav-link">{{ t('nav.home') }}</a>
          <a @click.prevent="scrollToSection('products')" href="#products" class="nav-link">{{ t('nav.products') }}</a>
          <a @click.prevent="scrollToSection('about')" href="#about" class="nav-link">{{ t('nav.about') }}</a>
        </nav>
        <div class="theme-controls">
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

    <main id="products">
      <section id="about" class="about-section">
        <h2>{{ t('sections.about') }}</h2>
        <p>{{ t('about.description') }}</p>
      </section>
    </main>

    <footer>
      <p>{{ t('messages.builtWith') }} {{ vueVersion }}</p>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { version } from 'vue'
import { useI18n } from 'vue-i18n'
import { applyTheme, colorThemes } from './utils/themes.js'
import intro1 from './assets/images/intro_1.jpg'
import intro2 from './assets/images/intro_2.jpg'
import logo from './assets/images/LOGO-2.png'

export default {
  name: 'App',
  setup() {
    const { t, locale } = useI18n()
    const vueVersion = version
    const selectedTheme = ref('light')
    const currentImage = ref(0)
    const isScrolled = ref(false)

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
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const changeLanguage = (lang) => {
      locale.value = lang
      localStorage.setItem('language', lang)
    }

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

    return {
      t,
      locale,
      vueVersion,
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
      scrollToSection
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

.nav-link {
  color: var(--text-white);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transform: translateY(-2px);
}

header.floating .nav-link {
  font-size: 1rem;
  padding: 0.4rem 0.8rem;
}

header.floating .nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.theme-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
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
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
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

h2 {
  margin-top: 0;
  color: var(--text-primary);
}



.about-section {
  text-align: center;
}

.about-section p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

footer {
  background: var(--secondary-color);
  color: var(--text-white);
  text-align: center;
  padding: 1rem;
}

@media (max-width: 768px) {
  footer {
    padding: 1rem 0.75rem;
  }
  
  footer p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  footer {
    padding: 0.75rem 0.5rem;
  }
  
  footer p {
    font-size: 0.8rem;
  }
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

@media (max-width: 768px) {
  .site-intro {
    padding: 2rem 1rem;
    margin-top: 6rem;
  }
}

@media (max-width: 480px) {
  .site-intro {
    padding: 1.5rem 0.75rem;
    margin-top: 4rem;
  }
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

/* Navigation Dots */
.navigation-dots {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 20;
}

@media (max-width: 768px) {
  .navigation-dots {
    bottom: 1.5rem;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .navigation-dots {
    bottom: 1rem;
    gap: 0.5rem;
  }
}

.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--border-light);
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

@media (max-width: 768px) {
  .nav-dot {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .nav-dot {
    width: 8px;
    height: 8px;
    border-width: 1px;
  }
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

/* Responsive Design */
@media (max-width: 768px) {
  .site-intro {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
  
  .site-intro h2 {
    font-size: 2.5rem;
  }
  
  .site-intro p {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .site-intro h2 {
    font-size: 2rem;
  }
  
  .site-intro p {
    font-size: 1rem;
  }
}

/* Tablet Styles */
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

/* Mobile Styles */
@media (max-width: 768px) {
  header {
    padding: 1rem;
  }
  
  header.floating {
    padding: 0.75rem 1rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .logo-section {
    align-self: center;
  }
  
  .navigation {
    gap: 1rem;
    justify-content: center;
    width: 100%;
  }
  
  .nav-link {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
  
  .logo {
    height: 35px;
  }
  
  header.floating .logo {
    height: 30px;
  }
  
  .theme-controls {
    justify-content: center;
    width: 100%;
    gap: 0.75rem;
  }
  
  .theme-select {
    min-width: 120px;
    font-size: 0.9rem;
    padding: 0.5rem 1.5rem 0.5rem 0.75rem;
  }
  
  main {
    padding: 1rem 0.75rem;
  }
  
  section {
    padding: 1.5rem 1rem;
    margin-bottom: 1.5rem;
  }
}

/* Small Mobile Styles */
@media (max-width: 480px) {
  header {
    padding: 0.75rem 0.5rem;
  }
  
  header.floating {
    padding: 0.5rem;
  }
  
  .header-content {
    gap: 0.75rem;
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
  
  .logo {
    height: 30px;
  }
  
  header.floating .logo {
    height: 25px;
  }
  
  .theme-controls {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
  
  .theme-select {
    min-width: 100%;
    font-size: 0.85rem;
    padding: 0.4rem 1.25rem 0.4rem 0.6rem;
  }
  
  main {
    padding: 0.75rem 0.5rem;
  }
  
  section {
    padding: 1rem 0.75rem;
    margin-bottom: 1rem;
    border-radius: 6px;
  }
  
  .about-section p {
    font-size: 1rem;
    line-height: 1.5;
  }
}
</style>
