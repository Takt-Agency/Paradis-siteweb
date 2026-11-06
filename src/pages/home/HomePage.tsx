import { DestinationsSection } from '@/components/destinations/DestinationsSection'
import { EventsSection } from '@/components/events/EventsSection'
import { FeaturedStaysSection } from '@/components/featured-stays/FeaturedStaysSection'
import { Hero } from '@/components/hero/Hero'
import { RentalsSection } from '@/components/rentals/RentalsSection'
import { WhySection } from '@/components/why/WhySection'

export function HomePage() {
  return (
    <>
      <Hero />
      <DestinationsSection />
      <FeaturedStaysSection />
      <EventsSection />
      <RentalsSection />
      <WhySection />
    </>
  )
}
