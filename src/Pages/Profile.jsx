import React, { useEffect, useState } from 'react';
import { Button, Label, TextInput, Alert, Spinner, Textarea } from 'flowbite-react';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import HomeNav from '../Components/HomeNav';
import { useAuth } from '../Components/AuthContext';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [avatar, setAvatar] = useState(null);
  const {session} = useAuth();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('User not found');
        }
        
        setUser(user);
        
        // Get user profile
        const { success, data, error } = await getProfile(user.id);
        
        if (success) {
          setProfile(data);
        } else {
          console.error('Error fetching profile:', error);
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage({ type: 'failure', text: 'Failed to load profile information' });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserAndProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    try {
      const updates = {
        username: e.target.username.value,
        full_name: e.target.fullName.value,
        website: e.target.website.value,
        bio: e.target.bio.value,
        updated_at: new Date()
      };
      
      const { success, error } = await updateProfile(user.id, updates);
      
      if (success) {
        setProfile({ ...profile, ...updates });
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        throw error;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'failure', text: 'Failed to update profile' });
    }
  };

  const handleAvatarChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    const fileSize = file.size / 1024 / 1024; // size in MB
    
    if (fileSize > 2) {
      setMessage({ type: 'failure', text: 'File size should be less than 2MB' });
      return;
    }
    
    try {
      setUploading(true);
      
      const { success, avatarUrl, error } = await uploadAvatar(user.id, file);
      
      if (success) {
        setProfile({ ...profile, avatar_url: avatarUrl });
        setMessage({ type: 'success', text: 'Avatar updated successfully!' });
      } else {
        throw error;
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setMessage({ type: 'failure', text: 'Failed to upload avatar' });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNav session={session}/>
      
      <div className="container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8"
        >
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
          
          {message.text && (
            <Alert color={message.type} className="mb-6">
              {message.text}
            </Alert>
          )}
          
          <div className="flex flex-col md:flex-row items-center mb-8 gap-6">
            <div className="relative">
              <img
                src={profile?.avatar_url || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                  <Spinner size="md" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{profile?.full_name || 'User'}</h2>
              <p className="text-gray-500">@{profile?.username || 'username'}</p>
              
              <div className="mt-4">
                <label className="inline-block bg-indigo-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-600 transition">
                  Change Avatar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                value={session?.user?.email}
                disabled
              />
              <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            
            <div>
              <Label htmlFor="username" value="Username" />
              <TextInput
                id="username"
                name="username"
                defaultValue={profile?.username || ''}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="fullName" value="Full Name" />
              <TextInput
                id="fullName"
                name="fullName"
                defaultValue={profile?.full_name || ''}
              />
            </div>
            
            <div>
              <Label htmlFor="website" value="Website" />
              <TextInput
                id="website"
                name="website"
                defaultValue={profile?.website || ''}
              />
            </div>
            
            <div>
              <Label htmlFor="bio" value="Bio" />
              <Textarea
                id="bio"
                name="bio"
                rows={4}
                defaultValue={profile?.bio || ''}
              />
            </div>
            
            <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600">
              Save Changes
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;