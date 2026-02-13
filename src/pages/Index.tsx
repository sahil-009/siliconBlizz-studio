import HeroSection from "@/components/home/HeroSection";
import WhatWeBuild from "@/components/home/WhatWeBuild";
import AutomationShowcase from "@/components/home/AutomationShowcase";
import CaseStudyPreview from "@/components/home/CaseStudyPreview";
import ProcessSection from "@/components/home/ProcessSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import SocialMediaSection from "@/components/home/SocialMediaSection";
import TwitterReviewsSection from "@/components/home/TwitterReviewsSection";
import SolutionsAndContact from "@/components/home/SolutionsAndContact";

const Index = () => {
  return (
    <>
      <HeroSection />
      <WhatWeBuild />
      <AutomationShowcase />
      <CaseStudyPreview />
      <ProcessSection />
      <CaseStudiesSection />
      <SocialMediaSection />
      <TwitterReviewsSection />
      <SolutionsAndContact />
    </>
  );
};

export default Index;
