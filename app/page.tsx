"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Statement from "@/components/Statement";
import Process from "@/components/Process";
import Works from "@/components/Works";
import Experience from "@/components/Experience";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ProjectModal from "@/components/ProjectModal";
import type { Project } from "@/data/projects";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <Nav onOpenContact={() => setContactOpen(true)} />
      <main>
        <Hero onOpenContact={() => setContactOpen(true)} />
        <TechMarquee />
        <Statement />
        <Process />
        <Works onOpenProject={setActiveProject} />
        <Experience />
        <CTA onOpenContact={() => setContactOpen(true)} />
      </main>
      <Footer />
      <AnimatePresence>
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
