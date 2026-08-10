"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Process from "@/components/Process";
import Works from "@/components/Works";
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
        <Process />
        <Works onOpenProject={setActiveProject} />
        <CTA onOpenContact={() => setContactOpen(true)} />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}