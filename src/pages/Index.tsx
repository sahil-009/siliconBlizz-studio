import SEO from "@/components/SEO";
import HeroSection from "@/components/home/HeroSection";
import WhatWeBuild from "@/components/home/WhatWeBuild";
import AutomationShowcase from "@/components/home/AutomationShowcase";
import CaseStudyPreview from "@/components/home/CaseStudyPreview";
import ProcessSection from "@/components/home/ProcessSection";
import OurWorks from "@/components/home/OurWorks";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import SocialMediaSection from "@/components/home/SocialMediaSection";
import TwitterReviewsSection from "@/components/home/TwitterReviewsSection";
import SolutionsAndContact from "@/components/home/SolutionsAndContact";

const Index = () => {
  return (
    <>
      <SEO
        title="SiliconBlizz Studio | AI Automation & Web Development Company"
        description="SiliconBlizz Studio is a leading AI automation and web development company. We build scalable websites, custom apps, and automate business workflows to help you grow 10x faster."
        keywords="SiliconBlizz, automation agency, web development company, AI automation, business process automation, software development, scalable web apps, digital transformation, n8n automation, custom software India"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "SiliconBlizz Studio",
          "url": "https://siliconblizz.com",
          "logo": "https://siliconblizz.com/logo.png",
          "sameAs": [
            "https://twitter.com/SiliconBlizz",
            "https://linkedin.com/company/siliconblizz-studio"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-1234567890",
            "contactType": "customer service"
          },
          "description": "AI-Powered Digital & Automation Studio building scalable apps and automation systems."
        }}
      />
      <HeroSection />
      <WhatWeBuild />
      <AutomationShowcase />
      <CaseStudyPreview />
      <ProcessSection />
      <OurWorks />
      <CaseStudiesSection />
      <SocialMediaSection />
      <TwitterReviewsSection />
      <SolutionsAndContact />
    </>
  );
};

export default Index;
