import PageWrapper from '@/components/layout/PageWrapper'
import {
  HeroSection,
  WhatWeDoSection,
  TechStripSection,
  ServicesSection,
  IndustriesSection,
  CaseStudiesSection,
  WhyNexusSection,
} from '@/components/sections'

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <WhatWeDoSection />
      <TechStripSection />
      <ServicesSection />
      <IndustriesSection />
      <CaseStudiesSection />
      <WhyNexusSection />
    </PageWrapper>
  )
}
