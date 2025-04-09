import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import HomeNav from '../Components/HomeNav';
import blog from '../assets/blog.webp';
import { supabase } from '../supabaseClient';
import { useAuth } from '../Components/AuthContext';

const BlogEdit = ({ session }) => {
    const navigate = useNavigate();
    const { session: authSession } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
        setLoading(true);
        setError(null);
        
        try {
            if (!authSession?.user) {
                throw new Error('You must be logged in to create a post');
            }
            
            // 1. Try to create the bucket first if it doesn't exist
            let imageUrl = null;
            if (formData.image) {
                try {
                    // Create the bucket if it doesn't exist
                    const { error: bucketError } = await supabase.storage.createBucket('blog-images', {
                        public: true
                    });
                    
                    // Ignore error if bucket already exists
                    if (bucketError && bucketError.message !== 'Bucket already exists') {
                        console.error('Error creating bucket:', bucketError);
                        // Fall back to default image if bucket creation fails
                        imageUrl = "https://images.unsplash.com/photo-1520946228043-fdd9824c66f9?q=80&w=2940&auto=format&fit=crop";
                    } else {
                        // Upload the image
                        const fileExt = formData.image.name.split('.').pop();
                        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
                        const filePath = `${fileName}`;
                        
                        const { data: uploadData, error: uploadError } = await supabase.storage
                            .from('blog-images')
                            .upload(filePath, formData.image);
                            
                        if (uploadError) {
                            console.error('Upload error:', uploadError);
                            // Fall back to default image if upload fails
                            imageUrl = "https://images.unsplash.com/photo-1520946228043-fdd9824c66f9?q=80&w=2940&auto=format&fit=crop";
                        } else {
                            // Get public URL for the uploaded image
                            const { data: { publicUrl } } = supabase.storage
                                .from('blog-images')
                                .getPublicUrl(filePath);
                                
                            imageUrl = publicUrl;
                        }
                    }
                } catch (storageError) {
                    console.error('Storage error:', storageError);
                    // Fall back to default image if any storage operation fails
                    imageUrl = "https://images.unsplash.com/photo-1520946228043-fdd9824c66f9?q=80&w=2940&auto=format&fit=crop";
                }
            } else {
                // Use default image if no image was selected
                imageUrl = "https://images.unsplash.com/photo-1520946228043-fdd9824c66f9?q=80&w=2940&auto=format&fit=crop";
            }
            
            // 2. Save blog post data to database
            const { data: postData, error: postError } = await supabase
                .from('blog_posts')
                .insert([
                    {
                        title: formData.title,
                        content: formData.content,
                        category: formData.category,
                        image_url: imageUrl,
                        author_id: authSession.user.id,
                    
                    }
                ]);
                
            if (postError) throw postError;
            
            // 3. Redirect to blog page on success
            navigate('/blog');
            
        } catch (err) {
            console.error('Error creating blog post:', err);
            setError(err.message || 'Failed to create blog post');
        } finally {
            setLoading(false);
        }
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
                    
                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                            <p>{error}</p>
                        </div>
                    )}
                    
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
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Publishing...' : 'Publish Post'}
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