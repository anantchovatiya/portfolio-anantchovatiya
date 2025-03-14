"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Skill {
  name: string;
  category: string;
}

const skills: Skill[] = [
  { name: 'HTML/CSS', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'React.js', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'Python', category: 'AI/ML' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Deep Learning', category: 'AI/ML' },
  { name: 'Machine Learning', category: 'AI/ML' },
];

const softSkills: string[] = [
  'Problem Solving',
  'Team Collaboration',
  'Communication',
  'Time Management',
  'Adaptability',
  'Critical Thinking',
  'Creativity',
  'Leadership',
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const softSkillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section 
      id="skills" 
      className="py-20 min-h-screen flex items-center relative"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-900/70 to-gray-950/80 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_40%)] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(124,58,237,0.08),transparent_30%)] z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="text-emerald-400">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A combination of technical expertise and soft skills that I&apos;ve developed through education, projects, and work experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Technical Skills by Category */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Technical Skills</h3>
            
            <div className="grid grid-cols-1 gap-6">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <motion.div
                  key={category}
                  className="relative overflow-hidden rounded-xl border border-emerald-800/30 backdrop-blur-sm shadow-lg bg-gray-900/40 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h4 className="text-lg font-semibold text-emerald-400 mb-4">{category}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categorySkills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        className="flex flex-col items-center"
                        variants={skillVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                      >
                        <div className="w-16 h-16 rounded-full bg-gray-800/80 flex items-center justify-center mb-2 border border-emerald-800/30">
                          <span className="text-emerald-400 text-xl font-bold">{skill.name.charAt(0)}</span>
                        </div>
                        <h5 className="text-gray-300 font-medium text-center">{skill.name}</h5>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills and Currently Learning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Soft Skills</h3>
            <motion.div 
              className="grid grid-cols-1 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {softSkills.map((skill) => (
                <motion.div
                  key={skill}
                  className="relative overflow-hidden rounded-lg border border-emerald-800/30 backdrop-blur-sm shadow-lg bg-gray-900/40"
                  variants={softSkillVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative p-4 flex items-center gap-3 z-10">
                    <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              className="mt-8 relative overflow-hidden rounded-xl border border-emerald-800/30 backdrop-blur-sm shadow-lg bg-gray-900/40"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="relative p-6 z-10">
                <h4 className="text-xl font-semibold text-emerald-400 mb-2">Currently Learning</h4>
                <ul className="text-gray-300 space-y-2 mt-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Cloud Computing (AWS)</span>
                  </li>
                  
                  
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
