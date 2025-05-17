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
  ImageIcon,
  Camera as CameraIcon,
  Sparkles,
} from "lucide-react";

// Enhanced Image Upload Component
const ImageUpload = ({ onUpload, uploadedImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);

  // Add pulsing effect periodically to draw attention
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 1000);
    }, 5000);

    return () => clearInterval(pulseInterval);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const event = { target: { files: [file] } };
      onUpload(event);
    }
  };

  return (
    <div className="w-full h-full">
      <input
        id="upload"
        type="file"
        accept="image/*"
        onChange={onUpload}
        className="hidden"
      />

      <div
        className={`relative group h-full w-full rounded-xl overflow-hidden transition-all duration-500 ${
          isDragging ? "ring-4 ring-violet-400 scale-[0.99]" : ""
        } ${pulseEffect ? "ring-2 ring-violet-500/30 animate-pulse" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadedImage ? (
          <div className="relative w-full h-full">
            <img
              src={uploadedImage}
              alt="Uploaded Food"
              className="w-full h-full object-cover"
            />
            {/* Sparkle decorations */}
            <div className="absolute top-2 right-2 text-yellow-300 animate-float animation-delay-1000">
              <Sparkles size={16} />
            </div>
            <div className="absolute top-8 left-5 text-yellow-300 animate-float animation-delay-2000">
              <Sparkles size={12} />
            </div>
            <div className="absolute bottom-12 right-8 text-yellow-300 animate-float animation-delay-3000">
              <Sparkles size={14} />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm">
                  Food Image Uploaded
                </span>
                <label
                  htmlFor="upload"
                  className="bg-white/10 backdrop-blur-md p-2 rounded-lg shadow-lg cursor-pointer border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <RefreshCw size={18} className="text-white" />
                </label>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

            {/* Bottom indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-black/50 text-white/80 text-xs py-1 px-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
              <CameraIcon size={10} />
              <span>Replace image</span>
            </div>
          </div>
        ) : (
          <label
            htmlFor="upload"
            className={`flex flex-col items-center justify-center h-full cursor-pointer transition-all duration-500 ${
              isDragging
                ? "bg-gradient-to-br from-violet-500/20 to-indigo-500/10"
                : "bg-gradient-to-br from-violet-500/5 via-indigo-900/10 to-fuchsia-500/5 hover:from-violet-500/15 hover:to-indigo-500/10"
            }`}
          >
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-violet-400/50 animate-float"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="absolute top-3/4 left-1/3 w-2 h-2 rounded-full bg-indigo-400/40 animate-float"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div
                className="absolute top-2/3 right-1/4 w-1.5 h-1.5 rounded-full bg-blue-400/50 animate-float"
                style={{ animationDelay: "0.8s" }}
              ></div>
              <div
                className="absolute top-1/3 right-1/3 w-2.5 h-2.5 rounded-full bg-fuchsia-400/40 animate-float"
                style={{ animationDelay: "1.2s" }}
              ></div>
              <div
                className="absolute bottom-1/4 right-1/2 w-2 h-2 rounded-full bg-pink-400/40 animate-float"
                style={{ animationDelay: "2.2s" }}
              ></div>
            </div>

            <div
              className={`p-6 rounded-full mb-4 transition-all duration-300 ${
                isDragging
                  ? "bg-violet-500/30 animate-pulse"
                  : "bg-gradient-to-r from-violet-500/10 to-indigo-500/10"
              } relative group-hover:shadow-lg group-hover:shadow-violet-500/20`}
            >
              <div
                className={`absolute inset-0 rounded-full bg-violet-500/10 animate-ping-slow ${
                  isDragging ? "opacity-100" : "opacity-70"
                }`}
              ></div>
              <Upload
                size={32}
                className={`${
                  isDragging ? "text-violet-300" : "text-white/80"
                } transition-colors duration-300 relative z-10 group-hover:text-violet-300`}
              />
            </div>
            <p
              className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                isDragging ? "text-violet-200" : "text-white/90"
              } drop-shadow-sm`}
            >
              {isDragging
                ? "Drop your image here"
                : "Drag & drop your food image"}
            </p>
            <p className="text-sm text-white/60 mb-6">
              or click to browse files
            </p>
            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-1 relative overflow-hidden group border border-white/10">
              <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="flex items-center relative z-10">
                <ImageIcon size={18} className="mr-2" />
                <span>Select Image</span>
              </div>
              <div className="absolute -top-1 -right-1 animate-float">
                <Sparkles size={12} className="text-yellow-300" />
              </div>
            </button>

            {/* Drag indicator */}
            {isDragging && (
              <div className="absolute inset-4 border-2 border-dashed border-violet-400/60 rounded-lg animate-pulse pointer-events-none"></div>
            )}
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
