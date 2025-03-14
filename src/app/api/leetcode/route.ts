import { NextResponse } from 'next/server';

// LeetCode GraphQL API endpoint
const LEETCODE_API_URL = 'https://leetcode.com/graphql';
const LEETCODE_USERNAME = '22it016'; // Your LeetCode username

// Define types for LeetCode API responses
interface ACSubmission {
  difficulty: string;
  count: number;
  submissions: number;
}

interface QuestionCount {
  difficulty: string;
  count: number;
}

interface LeetCodeProfile {
  ranking: number;
  reputation: number;
  starRating: number;
}

interface LeetCodeUserData {
  username: string;
  submitStats: {
    acSubmissionNum: ACSubmission[];
  };
  profile: LeetCodeProfile;
}

interface LeetCodeResponse {
  data: {
    matchedUser: LeetCodeUserData | null;
    allQuestionsCount: QuestionCount[];
  };
}

export async function GET() {
  try {
    // GraphQL query to fetch user profile data
    const userProfileQuery = {
      query: `
        query userProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            profile {
              ranking
              reputation
              starRating
            }
          }
          allQuestionsCount {
            difficulty
            count
          }
        }
      `,
      variables: {
        username: LEETCODE_USERNAME,
      },
    };

    // Fetch data from LeetCode GraphQL API
    const profileResponse = await fetch(LEETCODE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify(userProfileQuery),
      cache: 'force-cache', // Use cache to prevent rate limiting
    });

    if (!profileResponse.ok) {
      throw new Error(`Failed to fetch LeetCode profile: ${profileResponse.statusText}`);
    }

    const profileData = await profileResponse.json() as LeetCodeResponse;
    
    // If no user data is found
    if (!profileData.data.matchedUser) {
      return NextResponse.json(
        { error: 'LeetCode user not found' },
        { status: 404 }
      );
    }

    // Extract relevant data
    const userData = profileData.data.matchedUser;
    const allQuestionsCount = profileData.data.allQuestionsCount;
    
    // Calculate total questions by difficulty
    const totalQuestions = 3482; // Fixed total number of LeetCode problems
    const totalEasy = allQuestionsCount.find((item: QuestionCount) => item.difficulty === 'Easy')?.count || 0;
    const totalMedium = allQuestionsCount.find((item: QuestionCount) => item.difficulty === 'Medium')?.count || 0;
    const totalHard = allQuestionsCount.find((item: QuestionCount) => item.difficulty === 'Hard')?.count || 0;
    
    // Calculate solved questions by difficulty
    const acSubmissions = userData.submitStats.acSubmissionNum;
    const totalSolved = acSubmissions.find((item: ACSubmission) => item.difficulty === 'All')?.count || 0;
    const easySolved = acSubmissions.find((item: ACSubmission) => item.difficulty === 'Easy')?.count || 0;
    const mediumSolved = acSubmissions.find((item: ACSubmission) => item.difficulty === 'Medium')?.count || 0;
    const hardSolved = acSubmissions.find((item: ACSubmission) => item.difficulty === 'Hard')?.count || 0;
    
    // Calculate acceptance rate
    const totalSubmissions = acSubmissions.find((item: ACSubmission) => item.difficulty === 'All')?.submissions || 0;
    const acceptanceRate = totalSubmissions > 0 
      ? ((totalSolved / totalSubmissions) * 100).toFixed(1) 
      : 0;
    
    // Format the response
    const leetcodeStats = {
      username: userData.username,
      totalSolved,
      totalQuestions,
      easySolved,
      totalEasy,
      mediumSolved,
      totalMedium,
      hardSolved,
      totalHard,
      acceptanceRate: parseFloat(acceptanceRate as string),
      ranking: userData.profile.ranking || 0,
      reputation: userData.profile.reputation || 0,
      starRating: userData.profile.starRating || 0,
    };

    return NextResponse.json(leetcodeStats, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400', // Cache for 1 hour, stale for 24 hours
      }
    });
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    
    // Return fallback data in case of error
    return NextResponse.json({
      username: LEETCODE_USERNAME,
      totalSolved: 150,
      totalQuestions: 3482,
      easySolved: 70,
      totalEasy: 600,
      mediumSolved: 65,
      totalMedium: 1300,
      hardSolved: 15,
      totalHard: 600,
      acceptanceRate: 65.2,
      ranking: 125000,
      contributionPoints: 320,
      reputation: 0,
      error: 'Failed to fetch real data, showing fallback data',
    }, {
      headers: {
        'Cache-Control': 'public, max-age=600', // Cache fallback data for 10 minutes
      }
    });
  }
} 