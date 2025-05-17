import React, { useState, useEffect } from "react";
import {
  Camera,
  Share2,
  Upload,
  X,
  RefreshCw,
  Info,
  Award,
  ChevronDown,
} from "lucide-react";

// Enhanced Share Modal Component
const ShareModal = ({ show, onClose, results }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("link");
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // Access window only after component has mounted (client-side)
    setShareUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full animate-scaleIn shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 relative">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Share2 size={20} className="mr-2" />
            Share Your Results
          </h3>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex border-b">
          <button
            className={`py-3 px-6 font-medium text-sm transition-colors ${
              activeTab === "link"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("link")}
          >
            Copy Link
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm transition-colors ${
              activeTab === "social"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("social")}
          >
            Social Media
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm transition-colors ${
              activeTab === "export"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("export")}
          >
            Export
          </button>
        </div>

        <div className="p-6">
          {activeTab === "link" && (
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Share this link with others:
              </p>
              <div className="flex">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 border border-gray-300 p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  onClick={(e) => e.target.select()}
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg transition-colors flex items-center"
                  onClick={handleCopy}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="flex gap-4 justify-center py-4">
              <button className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  f
                </div>
              </button>
              <button className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 4.01C21.0424 4.67 19.9821 5.1978 18.86 5.47C18.2577 4.78631 17.4573 4.3361 16.567 4.18751C15.6767 4.03893 14.7395 4.19933 13.9247 4.64319C13.11 5.08705 12.4644 5.79245 12.0868 6.64301C11.7092 7.49358 11.6166 8.44544 11.82 9.35C9.9698 9.25874 8.16658 8.78322 6.53 7.95999C4.89343 7.13677 3.46925 5.98006 2.36 4.57C1.93019 5.2783 1.74694 6.12267 1.84 6.96C1.93305 7.79732 2.30277 8.56637 2.89 9.14C2.32139 9.1153 1.76528 8.94852 1.28 8.66V8.72C1.27998 9.69107 1.63078 10.6284 2.27143 11.3625C2.91208 12.0966 3.80156 12.5834 4.77 12.73C4.2451 12.8826 3.69613 12.9116 3.16 12.82C3.41571 13.6525 3.91573 14.3812 4.59014 14.9012C5.26456 15.4212 6.08758 15.7066 6.94 15.72C6.0898 16.3864 5.12192 16.8834 4.08662 17.1788C3.05133 17.4742 1.96535 17.5626 0.89 17.44C2.9 18.7099 5.26396 19.3935 7.69 19.39C15.69 19.39 20.09 12.85 20.09 7.18C20.09 6.95 20.09 6.72 20.08 6.49C20.9676 5.84305 21.7403 5.04236 22.38 4.12C21.5669 4.51049 20.6972 4.77456 19.8 4.91C20.7466 4.37267 21.4533 3.53116 21.8 2.54L22 4.01Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </button>
              <button className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.6 14C16.4 13.9 15.1 13.3 14.9 13.2C14.7 13.1 14.5 13.1 14.3 13.3C14.1 13.5 13.7 14.1 13.5 14.3C13.4 14.5 13.2 14.5 13 14.4C12.3 14.1 11.6 13.7 11 13.2C10.5 12.7 10 12.1 9.6 11.5C9.5 11.3 9.6 11.1 9.7 11C9.8 10.9 9.9 10.7 10.1 10.6C10.2 10.5 10.3 10.3 10.3 10.2C10.4 10.1 10.4 9.9 10.3 9.8C10.2 9.7 9.7 8.5 9.5 8.1C9.4 7.7 9.2 7.7 9.1 7.7C9 7.7 8.8 7.7 8.6 7.7C8.4 7.7 8.1 7.8 7.9 8C7.3 8.6 7 9.3 7 10.1C7.1 11 7.4 11.9 8 12.7C9.1 14.4 10.5 15.8 12.2 16.8C12.7 17.1 13.2 17.2 13.7 17.4C14.2 17.6 14.7 17.6 15.2 17.5C15.7 17.4 16.2 16.9 16.5 16.4C16.7 16 16.7 15.6 16.6 15.2L16.6 14ZM19.1 4.9C15.2 1 8.9 1 5 4.9C1.8 8.1 1.2 13.1 3.4 16.9L2 22L7.3 20.6C8.8 21.4 10.4 21.8 12 21.8C17.5 21.8 21.9 17.4 21.9 11.9C22 9.3 20.9 6.8 19.1 4.9ZM16.4 18.9C15.1 19.7 13.6 20.2 12 20.2C10.5 20.2 9.1 19.8 7.8 19.1L7.5 18.9L4.4 19.7L5.2 16.7L5 16.4C2.6 12.4 3.8 7.4 7.7 4.9C11.6 2.4 16.6 3.7 19 7.5C21.4 11.4 20.3 16.5 16.4 18.9Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </button>
              <button className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
                <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold">
                  in
                </div>
              </button>
            </div>
          )}

          {activeTab === "export" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-2">
                Export your analysis results:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2V8H20"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 13H8"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 17H8"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 9H9H8"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-medium">Excel</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                      stroke="#F44336"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2V8H20"
                      stroke="#F44336"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 18V12"
                      stroke="#F44336"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 15H16"
                      stroke="#F44336"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-medium">PDF</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                      stroke="#2196F3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 10L12 15L17 10"
                      stroke="#2196F3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15V3"
                      stroke="#2196F3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-medium">Image</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                      stroke="#FF9800"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 17L21 12L16 7"
                      stroke="#FF9800"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12H9"
                      stroke="#FF9800"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-medium">Text</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
