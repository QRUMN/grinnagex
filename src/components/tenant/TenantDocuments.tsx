import React from 'react';
import { FileText } from 'lucide-react';

const TenantDocuments: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Documents</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Important Documents</h3>
          <div className="space-y-2">
            {[
              { name: 'Lease Agreement', date: '2024-01-01' },
              { name: 'House Rules', date: '2024-01-01' },
              { name: 'Move-in Checklist', date: '2024-01-01' },
            ].map((doc) => (
              <div 
                key={doc.name}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span>{doc.name}</span>
                </div>
                <span className="text-sm text-gray-500">{doc.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Upload Document</h3>
          <form className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Document Type</label>
              <select className="w-full p-2 border rounded">
                <option>Insurance Certificate</option>
                <option>Utility Bill</option>
                <option>Maintenance Receipt</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">File</label>
              <input 
                type="file" 
                className="w-full p-2 border rounded"
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Upload Document
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TenantDocuments;
