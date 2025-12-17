"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ProfileCard } from "@/components/home/ProfileCard";

const PhotographyCard = dynamic(() => import("@/components/home/PhotographyCard").then(mod => mod.PhotographyCard));
const SystemsCard = dynamic(() => import("@/components/home/SystemsCard").then(mod => mod.SystemsCard));
const TechStackCard = dynamic(() => import("@/components/home/TechStackCard").then(mod => mod.TechStackCard));
const SocialLinks = dynamic(() => import("@/components/home/SocialLinks").then(mod => mod.SocialLinks));
import { item } from "@/lib/animations";




export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col py-8 relative">


      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-purple-100/40 to-pink-100/40 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 blur-3xl opacity-60" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/40 via-teal-100/40 to-green-100/40 dark:from-blue-900/20 dark:via-teal-900/20 dark:to-green-900/20 blur-3xl opacity-60" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-full md:min-h-[650px] lg:min-h-[700px]"
      >
        <ProfileCard />
        <PhotographyCard />
        <SystemsCard />
        <TechStackCard />
        <SocialLinks />
      </motion.div>


    </div>
  );
}
