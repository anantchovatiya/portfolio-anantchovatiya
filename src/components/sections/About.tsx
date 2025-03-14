"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function About() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const skills = [
        "JavaScript", "React", "Next.js",
        "Node.js", "Python", "Tailwind CSS", "Deep Learning", "Data Structure & Algorithm"
    ];

    return (
        <section
            id="about"
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
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.7 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-purple-600 rounded-xl transform rotate-3"></div>
                        <div className="absolute inset-0 bg-gray-900 rounded-xl transform -rotate-3 flex items-center justify-center">
                            <div className="relative h-[350px] w-[350px] rounded-full overflow-hidden border-4 border-emerald-400 shadow-lg shadow-emerald-500/20">
                                {/* Replace with your actual profile image */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-lg">
                                    <Image src="/images/profile.jpg" alt="Profile" width={350} height={350} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold mb-6 text-white"
                            initial={{ opacity: 0, x: 50 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            About <span className="text-emerald-400">Me</span>
                        </motion.h2>

                        <motion.div
                            className="space-y-4 text-gray-300"
                            initial={{ opacity: 0, x: 50 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <p className="text-lg">
                                <span>I&apos;m </span> <span className="text-emerald-400 font-semibold">Anant Chovatiya</span>, a passionate <span className="font-semibold">Next.js Developer</span> with expertise in <span className="font-semibold">Artificial Intelligence & Machine Learning (AI/ML)</span>. I specialize in building high-performance, scalable applications that integrate modern web technologies with intelligent automation.
                            </p>

                            <p>
                                My journey in tech began with experimenting with HTML and CSS to build simple websites. Over time, I expanded my expertise to include Next.js, React.js, Node.js, and AI-driven solutions, continuously adapting to the latest advancements in technology.
                            </p>

                            <p>
                                I believe in writing clean, maintainable code and creating intuitive user experiences. My approach combines technical expertise with problem-solving, enabling me to build efficient, AI-powered applications that solve real-world challenges.
                            </p>

                        </motion.div>

                        {/* Skills tags */}
                        <motion.div
                            className="mt-6 mb-8"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <h3 className="text-lg font-semibold text-white mb-3">Technical Expertise:</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <motion.span
                                        key={skill}
                                        className="bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full text-sm border border-emerald-800/30"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(16, 185, 129, 0.2)' }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="mt-8 grid grid-cols-2 gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            {/* Education Card */}
                            <div className="relative overflow-hidden rounded-lg border border-emerald-800/30 backdrop-blur-sm shadow-lg bg-gray-900/40">
                                <div className="relative p-6 z-10">
                                    <h3 className="text-xl font-semibold text-emerald-400 mb-2">Education</h3>
                                    <p className="text-gray-300 font-medium">BTech in Information Technology</p>
                                    <p className="text-gray-400 text-sm">Charotar University of Science and Technology, 2022-2026</p>
                                    <div className="mt-2 text-gray-400 text-sm">CGPA: 9.53</div>
                                </div>
                            </div>

                            {/* Experience Card */}
                            <div className="relative overflow-hidden rounded-lg border border-purple-800/30 backdrop-blur-sm shadow-lg bg-gray-900/40">
                                <div className="relative p-6 z-10">
                                    <h3 className="text-xl font-semibold text-purple-400 mb-2">Experience</h3>
                                    <p className="text-gray-300 font-medium">Clumoss, Vadodara</p>
                                    <p className="text-gray-400 text-sm">Full Stack Developer Intern</p>
                                    
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="mt-8 relative overflow-hidden rounded-lg border border-emerald-800/30 backdrop-blur-sm shadow-lg bg-gray-900/40"
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="relative p-6 z-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full p-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-purple-400">Currently Available for Work</h4>
                                </div>

                                <p className="text-gray-300 ml-9">
                                    I&apos;m open to freelance projects, full-time positions, and collaborative opportunities. Let&apos;s build something amazing together!
                                </p>

                                <div className="mt-4 ml-9">
                                    <motion.button
                                        className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-indigo-600 text-white rounded-lg font-medium text-sm flex items-center gap-2 hover:from-emerald-500 hover:to-indigo-500 transition-all shadow-md"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        Contact Me
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 
