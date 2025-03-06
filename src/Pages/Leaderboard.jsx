import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Leaderboard component
const Leaderboard = () => {
  const navigate = useNavigate(); 
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('allTime'); // 'week', 'month', 'allTime'
  const [currentUser, setCurrentUser] = useState(null);
  
  // Background image from Unsplash
  const backgroundImage = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  // Initialize Supabase client - replace with your actual Supabase URL and key
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // ... existing code ...
  useEffect(() => {
    // Fetch current user
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('id, username, avatar_url')
          .eq('id', user.id)
          .single();
          
        if (data) setCurrentUser(data);
      }
    };

    // Fetch leaderboard data
    const fetchLeaderboard = async () => {
      setLoading(true);
      
      // First fetch scores
      let query = supabase
        .from('test_scores')
        .select(`
          id,
          user_id,
          score,
          completed_at
        `)
        .order('score', { ascending: false });
      
      // Apply timeframe filter
      if (timeframe === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        query = query.gte('completed_at', weekAgo.toISOString());
      } else if (timeframe === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        query = query.gte('completed_at', monthAgo.toISOString());
      }
      
      const { data: scoreData, error: scoreError } = await query;
      
      if (scoreData && scoreData.length > 0) {
        // Get unique user IDs
        const userIds = [...new Set(scoreData.map(item => item.user_id))];
        
        // Fetch user details
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, username, avatar_url')
          .in('id', userIds);
        
        if (userData) {
          // Create a map of user data for quick lookup
          const userMap = {};
          userData.forEach(user => {
            userMap[user.id] = user;
          });
          
          // Process data to remove duplicates (keep highest score per user)
          const userBestScores = {};
          
          scoreData.forEach(item => {
            const userId = item.user_id;
            if (!userBestScores[userId] || item.score > userBestScores[userId].score) {
              userBestScores[userId] = {
                id: userId,
                username: userMap[userId]?.username || 'Unknown User',
                avatar_url: userMap[userId]?.avatar_url || null,
                score: item.score,
                completed_at: item.completed_at
              };
            }
          });
          
          // Convert to array and sort
          const sortedData = Object.values(userBestScores)
            .sort((a, b) => b.score - a.score)
            .map((item, index) => ({ ...item, rank: index + 1 }));
          
          setLeaderboardData(sortedData);
        }
      } else {
        setLeaderboardData([]);
      }
      
      setLoading(false);
    };

    getCurrentUser();
    fetchLeaderboard();
    
    // Set up subscription for real-time updates
    const subscription = supabase
      .channel('leaderboard-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'test_scores' 
      }, () => {
        fetchLeaderboard();
      })
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, [timeframe]);

  // Determine the CSS class for the current user's row
  const getUserRowClass = (userId) => {
    if (currentUser && userId === currentUser.id) {
      return 'bg-indigo-50/80 dark:bg-indigo-900/50 backdrop-blur-sm';
    }
    return '';
  };

  // Get medal emoji for top 3
  const getMedal = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  // Animation variants for elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <div 
      className="min-h-screen py-12 px-4 sm:px-6 flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${backgroundImage})` 
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto backdrop-blur-md bg-white/30 dark:bg-gray-800/40 rounded-2xl shadow-2xl overflow-hidden border border-white/20"
      >
        <div className="px-6 py-5 border-b border-white/20 dark:border-gray-700/50">
          <div className="flex justify-between items-center">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold text-white drop-shadow-lg"
            >
              Assessment Leaderboard
            </motion.h2>
            
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </motion.button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setTimeframe('week')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                timeframe === 'week'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              This Week
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setTimeframe('month')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                timeframe === 'month'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              This Month
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setTimeframe('allTime')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                timeframe === 'allTime'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              All Time
            </motion.button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin"></div>
              <div className="w-16 h-16 border-l-4 border-r-4 border-transparent rounded-full animate-spin absolute top-0 left-0" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
            </div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="overflow-x-auto"
          >
            <table className="min-w-full divide-y divide-white/10 dark:divide-gray-700/50">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-16">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 dark:divide-gray-700/50">
                <AnimatePresence>
                  {leaderboardData.map((entry, index) => (
                    <motion.tr 
                      key={entry.id} 
                      variants={itemVariants}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: index * 0.05, duration: 0.5 }
                      }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`${getUserRowClass(entry.id)} hover:bg-white/10 dark:hover:bg-gray-700/30 transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {entry.rank <= 3 ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 260, 
                                damping: 20,
                                delay: 0.2 + index * 0.05
                              }}
                              className={`
                                inline-flex items-center justify-center w-10 h-10 rounded-full 
                                ${entry.rank === 1 
                                  ? 'bg-gradient-to-br from-yellow-300 to-yellow-600 text-yellow-900' 
                                  : entry.rank === 2 
                                    ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900'
                                    : 'bg-gradient-to-br from-amber-500 to-amber-700 text-amber-900'
                                }
                                shadow-lg text-xl font-bold
                              `}
                            >
                              {getMedal(entry.rank)}
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 + index * 0.05 }}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium"
                            >
                              {entry.rank}
                            </motion.div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <motion.div 
                            className="flex-shrink-0 h-12 w-12 relative"
                            initial={{ scale: 0, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 260, 
                              damping: 20,
                              delay: 0.1 + index * 0.05
                            }}
                          >
                            {entry.avatar_url ? (
                              <img 
                                className="h-12 w-12 rounded-full object-cover border-2 border-white/50 shadow-lg" 
                                src={entry.avatar_url} 
                                alt={entry.username} 
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center border-2 border-white/50 shadow-lg">
                                <span className="text-white font-medium text-lg">
                                  {entry.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            {entry.rank <= 3 && (
                              <motion.div 
                              className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.05 }}
                            >
                              <span className="text-xs">{getMedal(entry.rank)}</span>
                            </motion.div>
                          )}
                        </motion.div>
                        <div className="ml-4">
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                            className="text-base font-medium text-white"
                          >
                            {entry.username}
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            className="text-sm text-gray-300"
                          >
                            {new Date(entry.completed_at).toLocaleDateString()}
                          </motion.div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.3 + index * 0.05 
                        }}
                        className="text-lg font-bold"
                      >
                        <span className="bg-gradient-to-r text-white bg-clip-text text-transparent">
                          {entry.score}
                        </span>
                      </motion.div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {leaderboardData.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="py-12 text-center text-gray-300"
            >
              <span className="text-lg">No data available for this time period</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  </div>
);
};

export default Leaderboard;