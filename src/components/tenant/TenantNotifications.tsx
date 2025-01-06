import React from 'react';
import { Bell } from 'lucide-react';

const TenantNotifications: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Notifications</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="space-y-3">
            {[
              {
                title: 'Maintenance Update',
                message: 'Your maintenance request has been scheduled for tomorrow',
                date: '1 hour ago',
                type: 'info'
              },
              {
                title: 'Rent Reminder',
                message: 'Your rent payment is due in 5 days',
                date: '3 hours ago',
                type: 'warning'
              },
              {
                title: 'Building Notice',
                message: 'Water maintenance scheduled for next Tuesday',
                date: '1 day ago',
                type: 'info'
              }
            ].map((notification, index) => (
              <div 
                key={index}
                className="p-3 border rounded hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{notification.title}</h4>
                  <span className="text-sm text-gray-500">{notification.date}</span>
                </div>
                <p className="text-gray-600 mt-1">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Notification Settings</h3>
          <div className="space-y-2">
            {[
              'Maintenance Updates',
              'Rent Reminders',
              'Building Notices',
              'Community Events'
            ].map((setting) => (
              <div 
                key={setting}
                className="flex items-center justify-between p-2"
              >
                <span>{setting}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantNotifications;
