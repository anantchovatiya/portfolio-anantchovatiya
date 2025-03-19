"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function LeetCodeBadges() {
  const [loading, setLoading] = useState(true);
  const username = '22it016'; // Your LeetCode username

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => setLoading(false), 800);
    }
  }, [inView]);

  // Simplified badge URL
  const getBadgeUrl = () => {
    return `https://leetcode-badge-showcase.vercel.app/api?username=${username}&theme=dark&badge_only=true&scale=0.65`;
  };

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/40 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-800/40 shadow-lg shadow-emerald-900/5 h-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723a3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Earned Badges
        </h3>
      </div>

      {loading ? (
        <div className="h-48 flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="text-gray-500 text-sm mt-4">Loading badges...</p>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30 flex-grow flex items-center justify-center">
            <Image
              src={getBadgeUrl()}
              alt="LeetCode Badges"
              width={250}
              height={150}
              className="object-contain"
              unoptimized={true}
              priority
            />
          </div>
          
          <div className="mt-4 text-right">
            <a 
              href={`https://leetcode.com/${username}/`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm inline-flex items-center transition-colors"
            >
              <span>View All Badges</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
} 
