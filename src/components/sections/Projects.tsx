"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'ProlanceHub - Freelancing Platform',
    description: 'A full-stack e-commerce platform with user authentication, product catalog, cart functionality, and payment integration.',
    image: '/images/prolancehub.png',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Express.js', 'Tailwind CSS', 'React', 'ML', 'Gemini API', 'Google OAuth'],
    demoLink: 'https:prolancehub.onrender.com',
    codeLink: 'https://github.com/anantchovatiya/ProlanceHub',
  },
  {
    id: 2,
    title: 'Fuel the Chais - Creators Platform',
    description: 'A productivity application for managing tasks, projects, and deadlines with team collaboration features.',
    image: '/images/fuelthechais.png',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Express.js', 'Tailwind CSS', 'React', 'Google OAuth', 'Github OAuth', 'Razorpay'],
    demoLink: 'https://fuelthechais.onrender.com',
    codeLink: 'https://github.com/anantchovatiya/fuelthechai',
  },
  {
    id: 3,
    title: 'Banglore Home Price Prediction',
    description: 'ML model to predict the price of a home in Banglore based on the features of the home.',
    image: '/images/housepriceprediction.png',
    tags: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Numpy', 'flask', 'HTML', 'CSS', 'JavaScript'],
    demoLink: 'https://github.com/anantchovatiya/BHP_frontend',
    codeLink: 'https://github.com/anantchovatiya/BHP_backend',
  },
  {
    id: 4,
    title: 'Banking System',
    description: 'A banking system that allows users to transfer money between accounts and view their transaction history.',
    image: '/images/bankingsystem.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'EJS', 'Twilio API'],
    demoLink: 'https://creditsystem.onrender.com',
    codeLink: 'https://github.com/anantchovatiya/creditsystem',
  },
];

export default function Projects() {
  // const [activeProject, setActiveProject] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.2,
  //     },
  //   },
  // };

  // const projectVariants = {
  //   hidden: { opacity: 0, y: 30 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.5,
  //     },
  //   },
  // };

  return (
    <section id="projects" className="py-20 min-h-screen relative">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-900/70 to-gray-950/80 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(124,58,237,0.1),transparent_40%)] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.08),transparent_30%)] z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
      
      {/* Floating particles */}
      <div className="absolute top-[15%] left-[20%] w-1 h-1 rounded-full bg-purple-300/40 animate-pulse"></div>
      <div className="absolute top-[35%] right-[25%] w-0.5 h-0.5 rounded-full bg-emerald-300/40 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-[25%] left-[40%] w-0.5 h-0.5 rounded-full bg-indigo-300/30 animate-pulse" style={{ animationDelay: '0.7s' }}></div>
      <div className="absolute bottom-[45%] right-[30%] w-1 h-1 rounded-full bg-purple-400/20 animate-pulse" style={{ animationDelay: '2.1s' }}></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="text-emerald-400">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work, showcasing my skills in web development, design, and problem-solving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl border border-emerald-800/30 backdrop-blur-sm shadow-lg bg-gray-900/40"
            >
              <div className="relative z-10">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      // Fallback to placeholder image if the project image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/project-placeholder.svg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-emerald-900/50 text-emerald-200 border border-emerald-700/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <Link
                      href={project.demoLink}
                      className="px-4 py-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-sm transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </Link>
                    <Link
                      href={project.codeLink}
                      className="px-4 py-2 rounded-lg bg-gray-800/80 hover:bg-gray-800 text-white text-sm transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
