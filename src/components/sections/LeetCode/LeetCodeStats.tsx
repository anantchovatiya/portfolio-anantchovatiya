"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LeetCodeBadges from './LeetCodeBadges';
import LeetCodeHeatmap from './LeetCodeHeatmap';

interface LeetCodeStats {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  reputation: number;
  starRating?: number;
  contributionPoints?: number;
  error?: string;
}

export default function LeetCodeStats() {
  const [stats, setStats] = useState<LeetCodeStats>({
    username: '22it016',
    totalSolved: 0,
    totalQuestions: 0,
    easySolved: 0,
    totalEasy: 0,
    mediumSolved: 0,
    totalMedium: 0,
    hardSolved: 0,
    totalHard: 0,
    acceptanceRate: 0,
    ranking: 0,
    reputation: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Fetch LeetCode stats from our API
  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        setLoading(true);
        
        // Fetch main LeetCode stats
        const response = await fetch('/api/leetcode');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch LeetCode stats: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          console.warn('Using fallback data:', data.error);
          setError(data.error);
        }
        
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching LeetCode stats:', err);
        setError('Failed to load LeetCode stats. Using fallback data.');
      } finally {
        setLoading(false);
      }
    };
    
    if (inView) {
      fetchLeetCodeStats();
    }
  }, [inView]);

  return (
    <section id="leetcode" className="py-16 md:py-20 relative">
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
            My <span className="text-emerald-400">LeetCode</span> Profile
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A visual representation of my problem-solving journey on LeetCode, showcasing my coding activity and achievements.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <>
            {/* Main row: Heatmap and Badges side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Heatmap Card - Left side */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <LeetCodeHeatmap />
              </motion.div>
              
              {/* Badges Card - Right side */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <LeetCodeBadges />
              </motion.div>
            </div>
            
            {/* Profile link - Below all cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex justify-center"
            >
              <a 
                href={`https://leetcode.com/${stats.username}/`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.715.744 1.314 0 2.292-.989 2.292-2.31 0-.669-.234-1.314-.748-1.823l-2.689-2.689c-1.21-1.209-2.751-1.823-4.386-1.823-1.657 0-3.157.613-4.346 1.824l-4.33 4.319c-1.21 1.21-1.802 2.697-1.802 4.376s.592 3.165 1.803 4.375l4.32 4.32c1.21 1.21 2.731 1.823 4.376 1.823 1.637 0 3.166-.613 4.377-1.824l2.689-2.688c.515-.515.782-1.153.782-1.823 0-1.314-.973-2.31-2.292-2.31-.604 0-1.202.233-1.714.748z"></path>
                </svg>
                View Full LeetCode Profile
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
} 
