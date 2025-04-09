import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import HomeNav from '../Components/HomeNav';
import blog from '../assets/blog.webp';
import { supabase } from '../supabaseClient';
import { useAuth } from '../Components/AuthContext';

const Blog = ({ session }) => {
    const navigate = useNavigate();
    const { session: authSession } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = ['All', 'Local', 'Culture', 'Events', 'History'];

    // Fetch blog posts from Supabase
    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                setLoading(true);
                
                let query = supabase
                    .from('blog_posts')
                    .select(`
                        *,
                        profiles:author_id 
                    `)
                    .order('created_at', { ascending: false });
                
                // Filter by category if not "All"
                if (selectedCategory !== 'All') {
                    query = query.eq('category', selectedCategory);
                }
                
                const { data, error } = await query;
                
                if (error) throw error;
                
                // Transform the data to match our component's expected format
                const formattedPosts = data.map(post => ({
                    id: post.id,
                    title: post.title,
                    excerpt: post.content.substring(0, 150) + '...',
                    category: post.category,
                    date: post.created_at,
                    readTime: `${Math.ceil(post.content.length / 1000)} min`,
                    image: post.image_url || "https://images.unsplash.com/photo-1520946228043-fdd9824c66f9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    content: post.content,
                    author: {
                        name: post.profiles?.full_name || post.profiles?.email || 'Anonymous',
                        avatar: post.profiles?.avatar_url || "https://randomuser.me/api/portraits/women/1.jpg"
                    }
                }));
                
                setBlogPosts(formattedPosts);
            } catch (err) {
                console.error('Error fetching blog posts:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchBlogPosts();
    }, [selectedCategory]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[60vh]">
                <HomeNav session={session} />
                <img 
                    src={blog}
                    alt="Blog Banner" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex flex-col justify-center items-center text-white px-4"
                >
                    <h1 className="text-6xl font-bold mb-4 text-center">Our Blog</h1>
                    <p className="text-xl max-w-2xl text-center mb-6">Stories, updates, and insights from the heart of Peterborough</p>
                    {authSession && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/blog-edit')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
                        >
                            Create New Post
                        </motion.button>
                    )}
                </motion.div>
            </div>

            {/* Category Filter */}
            <div className="container mx-auto px-4 py-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-4 justify-center mb-12"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Loading and Error States */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-8">
                        <p>Error loading blog posts: {error}</p>
                    </div>
                )}

                {/* Blog Grid */}
                {!loading && !error && (
                    <>
                        {blogPosts.length === 0 ? (
                            <div className="text-center py-12">
                                <h3 className="text-xl text-gray-600">No blog posts found in this category.</h3>
                                {authSession && (
                                    <button 
                                        onClick={() => navigate('/blog-edit')}
                                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full"
                                    >
                                        Create the first post
                                    </button>
                                )}
                            </div>
                        ) : (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {blogPosts.map((post) => (
                                    <motion.article
                                        key={post.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -10 }}
                                        className="bg-white rounded-2xl overflow-hidden shadow-lg transition-shadow hover:shadow-xl"
                                    >
                                        <div className="relative h-64">
                                            <img 
                                                src={post.image} 
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center mb-4">
                                                <img 
                                                    src={post.author.avatar} 
                                                    alt={post.author.name}
                                                    className="w-10 h-10 rounded-full mr-3"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-800">{post.author.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(post.date).toLocaleDateString()} · {post.readTime} read
                                                    </p>
                                                </div>
                                            </div>
                                            <h2 className="text-xl font-bold mb-3 text-gray-800">{post.title}</h2>
                                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="text-blue-600 font-medium hover:text-blue-700"
                                            >
                                                Read More →
                                            </motion.button>
                                        </div>
                                    </motion.article>
                                ))}
                            </motion.div>
                        )}
                    </>
                )}

                {/* Newsletter Section remains the same */}
            </div>
        </div>
    );
};

export default Blog;