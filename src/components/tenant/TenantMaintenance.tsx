import React from 'react';
import { Wrench } from 'lucide-react';

const TenantMaintenance: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Wrench className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Maintenance Requests</h2>
      </div>
      
      <div className="space-y-4">
        {/* Maintenance request form */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-2">Submit New Request</h3>
          <form className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Issue Type</label>
              <select className="w-full p-2 border rounded">
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>HVAC</option>
                <option>Appliance</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea 
                className="w-full p-2 border rounded" 
                rows={4}
                placeholder="Describe the issue..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select className="w-full p-2 border rounded">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Emergency</option>
              </select>
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TenantMaintenance;
