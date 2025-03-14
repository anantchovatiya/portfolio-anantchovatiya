"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
        const response = await fetch('/api/leetcode');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch LeetCode stats: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          console.warn('Using fallback data:', data.error);
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

  // Bar chart data for problem difficulty
  const difficultyData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Solved',
        data: [stats.easySolved, stats.mediumSolved, stats.hardSolved],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)', // emerald for easy
          'rgba(249, 115, 22, 0.7)', // orange for medium
          'rgba(239, 68, 68, 0.7)', // red for hard
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Remaining',
        data: [
          stats.totalEasy - stats.easySolved,
          stats.totalMedium - stats.mediumSolved,
          stats.totalHard - stats.hardSolved,
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.2)',
          'rgba(249, 115, 22, 0.2)',
          'rgba(239, 68, 68, 0.2)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 0.5)',
          'rgba(249, 115, 22, 0.5)',
          'rgba(239, 68, 68, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    },
  };

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
            A visual representation of my problem-solving journey on LeetCode, showcasing my progress and achievements.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LeetCode Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900/40 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-800/40 shadow-lg shadow-emerald-900/5"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-white">LeetCode Statistics</h3>
                {error && (
                  <span className="text-xs text-amber-400 bg-amber-900/30 px-2 py-1 rounded">
                    {error}
                  </span>
                )}
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Problems Solved</span>
                    <span className="text-emerald-400 font-semibold">{stats.totalSolved} / {stats.totalQuestions}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2.5 rounded-full" 
                      style={{ width: `${stats.totalQuestions ? (stats.totalSolved / stats.totalQuestions) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-right text-sm text-gray-400">
                    {stats.totalQuestions ? ((stats.totalSolved / stats.totalQuestions) * 100).toFixed(1) : "0.0"}% Completed
                  </div>
                  <div className="mt-1 text-center text-xs text-gray-500 italic">
                    Based on total of 3482 available problems
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">Easy</div>
                    <div className="text-emerald-400 font-semibold">{stats.easySolved} / {stats.totalEasy}</div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-emerald-500 h-1.5 rounded-full" 
                        style={{ width: `${stats.totalEasy ? (stats.easySolved / stats.totalEasy) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">Medium</div>
                    <div className="text-orange-400 font-semibold">{stats.mediumSolved} / {stats.totalMedium}</div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-orange-500 h-1.5 rounded-full" 
                        style={{ width: `${stats.totalMedium ? (stats.mediumSolved / stats.totalMedium) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">Hard</div>
                    <div className="text-red-400 font-semibold">{stats.hardSolved} / {stats.totalHard}</div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-red-500 h-1.5 rounded-full" 
                        style={{ width: `${stats.totalHard ? (stats.hardSolved / stats.totalHard) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">Acceptance Rate</div>
                    <div className="text-purple-400 font-semibold">{stats.acceptanceRate}%</div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-purple-500 h-1.5 rounded-full" 
                        style={{ width: `${stats.acceptanceRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="text-gray-400 text-sm">Ranking</div>
                    <div className="text-white font-semibold">{stats.ranking.toLocaleString()}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-gray-400 text-sm">Reputation</div>
                    <div className="text-white font-semibold">{stats.reputation}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-gray-400 text-sm">Username</div>
                    <div className="text-white font-semibold">{stats.username}</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Charts Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-900/40 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-800/40 shadow-lg shadow-emerald-900/5"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Problem Solving Progress</h3>
              
              <div className="h-80">
                <h4 className="text-lg text-gray-300 mb-4">Problems by Difficulty</h4>
                <Bar data={difficultyData} options={barOptions} height={300} />
              </div>
              
              <div className="mt-16 flex justify-center">
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
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
} 