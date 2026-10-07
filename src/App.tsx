import About from '@/components/About/About'
import BookingForm from '@/components/BookingForm/BookingForm'
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer/Footer'
import Founder from '@/components/Founder/Founder'
import Gallery from '@/components/Gallery/Gallery'
import Hero from '@/components/Hero/Hero'
import Intro from '@/components/Intro/Intro'
import Navbar from '@/components/Navbar/Navbar'
import Services from '@/components/Services/Services'
import Testimonials from '@/components/Testimonials/Testimonials'
import Trainers from '@/components/Trainers/Trainers'
import FloatingCTA from '@/components/ui/FloatingCTA'
import BackToTop from '@/components/ui/BackToTop'
import WhySthira from '@/components/WhySthira/WhySthira'

/**
 * Sthira Yoga & Wellness
 *
 * Single-page site. The section order follows the intended visitor journey:
 * land → understand Sthira → explore services → meet the trainers → build
 * trust (gallery + testimonials) → book.
 */
export default function App() {
  return (
    <>
      <Navbar />

      <main id="main">
        <Hero />
        <Intro />
        <About />
        <Founder />
        <Services />
        <Trainers />
        <WhySthira />
        <Gallery />
        <Testimonials />
        <BookingForm />
        <Contact />
      </main>

      <Footer />
      <FloatingCTA />
      <BackToTop />
    </>
  )
}
