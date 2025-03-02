import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import HomeNav from '../Components/HomeNav';
import blog from '../assets/blog.webp';

const BlogEdit = ({ session }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Local',
        content: '',
        image: null,
        imagePreview: null
    });

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                image: file,
                imagePreview: URL.createObjectURL(file)
            });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically:
        // 1. Upload the image to your storage
        // 2. Save the blog post data to your database
        // 3. Redirect to the blog page
        navigate('/blog');
    };

    return (
        <div className="min-h-screen relative">            
            {/* Background image with overlay */}
            <div className="fixed inset-0" style={{ zIndex: 0 }}>
                <img 
                    src={blog}
                    alt="Blog Banner" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0"></div>
            </div>

            <div className="relative" style={{ zIndex: 50 }}>
                <HomeNav session={session} />
            </div>

            {/* Content container */}
            <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8"
                >
                    <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title Input */}
                        <div>
                            <label className="block text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Category Selection */}
                        <div>
                            <label className="block text-gray-700 mb-2">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            >
                                <option value="Local">Local</option>
                                <option value="Culture">Culture</option>
                                <option value="Events">Events</option>
                                <option value="History">History</option>
                            </select>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-gray-700 mb-2">Cover Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full"
                                required
                            />
                            {formData.imagePreview && (
                                <div className="mt-4">
                                    <img
                                        src={formData.imagePreview}
                                        alt="Preview"
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Content Editor */}
                        <div>
                            <label className="block text-gray-700 mb-2">Content</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({...formData, content: e.target.value})}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                rows="10"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
                            >
                                Publish Post
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={() => navigate('/blog')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-medium hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogEdit;