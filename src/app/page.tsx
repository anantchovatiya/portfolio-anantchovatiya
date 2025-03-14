import Background3D from '@/components/3d/Background3D';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import LeetCodeStats from '@/components/sections/LeetCode/LeetCodeStats';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-white overflow-x-hidden">
      {/* 3D Background - placed first for proper layering */}
      <Background3D />
      
      {/* Content Container - ensures proper z-index and centering */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <div className="w-full">
          {/* Hero Section */}
          <Hero />
          
          {/* About Section */}
          <About />
          
          {/* Skills Section */}
          <Skills />
          
          {/* Projects Section */}
          <Projects />
          
          {/* LeetCode Section */}
          <LeetCodeStats />
          
          {/* Contact Section */}
          <Contact />
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </main>
  );
}
