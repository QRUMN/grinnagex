import React from 'react';
import { Settings } from 'lucide-react';

const TenantSettings: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Settings</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Profile Settings</h3>
          <form className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email"
                className="w-full p-2 border rounded"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input 
                type="tel"
                className="w-full p-2 border rounded"
                placeholder="(123) 456-7890"
              />
            </div>
          </form>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Communication Preferences</h3>
          <div className="space-y-2">
            {[
              'Email Notifications',
              'SMS Notifications',
              'Push Notifications',
              'Newsletter Subscription'
            ].map((pref) => (
              <div 
                key={pref}
                className="flex items-center justify-between p-2"
              >
                <span>{pref}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Security</h3>
          <div className="space-y-3">
            <button 
              className="w-full p-2 border rounded text-left hover:bg-gray-50"
            >
              Change Password
            </button>
            <button 
              className="w-full p-2 border rounded text-left hover:bg-gray-50"
            >
              Two-Factor Authentication
            </button>
            <button 
              className="w-full p-2 border rounded text-left hover:bg-gray-50"
            >
              Login History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantSettings;
