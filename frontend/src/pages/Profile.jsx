import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import { User, Mail, MapPin, Phone, Calendar, CreditCard, Building, Package } from 'lucide-react';

function Profile() {
  //const { role, username } = useAuth();
  const role = 'manager'; // Hardcoded for demonstration purposes
  const username = 'johndoe'; // Hardcoded for demonstration purposes
  const axios = useAxios();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/auth/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [axios]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-pulse text-xl text-purple-700">Loading profile...</div>
      </div>
    );
  }

  // Determine which role icon to show
  const RoleIcon = () => {
    if (role === 'manager') return <Building className="h-6 w-6 text-white" />;
    if (role === 'worker') return <User className="h-6 w-6 text-white" />;
    if (role === 'supplier') return <Package className="h-6 w-6 text-white" />;
    return <User className="h-6 w-6 text-white" />;
  };

  return (
    <div className="min-h-screen md:min-h-[90dvh] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#1e0e4b] to-[#7747ff] rounded-t-2xl p-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center">
              <div className="rounded-full bg-white/20 p-3 mr-4">
                <RoleIcon />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user?.name || username}</h1>
                <p className="text-white/80 capitalize">{role}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white/10 rounded-lg px-4 py-2 inline-flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                <span>Active Account</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Common Info Section */}
            <div className="col-span-1 md:col-span-2 mb-4">
              <h2 className="text-lg font-semibold text-[#1e0e4b] mb-4 border-b border-gray-200 pb-2">
                Personal Information
              </h2>
            </div>

            {/* Name */}
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-[#7747ff]/10 p-3 rounded-lg mr-4">
                <User className="h-5 w-5 text-[#7747ff]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-[#1e0e4b]">{user?.name || 'Not provided'}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-[#7747ff]/10 p-3 rounded-lg mr-4">
                <Mail className="h-5 w-5 text-[#7747ff]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-[#1e0e4b]">{user?.email || 'Not provided'}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-[#7747ff]/10 p-3 rounded-lg mr-4">
                <MapPin className="h-5 w-5 text-[#7747ff]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-[#1e0e4b]">{user?.address || 'Not provided'}</p>
              </div>
            </div>

            {/* Phone */}
            <div className={`flex items-start ${role==='supplier' ? 'mb-10' : ''}`}>
              <div className="flex-shrink-0 bg-[#7747ff]/10 p-3 rounded-lg mr-4">
                <Phone className="h-5 w-5 text-[#7747ff]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-[#1e0e4b]">{user?.phone || 'Not provided'}</p>
              </div>
            </div>

            {/* Employee-specific information (manager or worker) */}
            {(role === 'manager' || role === 'worker') && (
              <>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#7747ff]/10 p-3 rounded-lg mr-4">
                    <Calendar className="h-5 w-5 text-[#7747ff]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Birthday</p>
                    <p className="font-medium text-[#1e0e4b]">{user?.birthday || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-start mb-10">
                  <div className="flex-shrink-0 bg-[#7747ff]/10 p-3 rounded-lg mr-4">
                    <CreditCard className="h-5 w-5 text-[#7747ff]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Salary</p>
                    <p className="font-medium text-[#1e0e4b]">
                      {user?.salary ? `$${user.salary.toLocaleString()}` : 'Not provided'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default Profile;