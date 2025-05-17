import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Camera,
  Share2,
  Upload,
  X,
  RefreshCw,
  Info,
  Award,
  ChevronDown,
  Sparkles,
  Star,
  Zap,
  Heart,
  Trophy,
  Flame,
  Rocket,
  ThumbsUp,
} from "lucide-react";

// Enhanced Confetti Component with more customization options
const Confetti = memo(
  ({
    show,
    duration = 5000,
    particleCount = 150,
    messageStyle = "default",
    customMessage = "",
  }) => {
    const [particles, setParticles] = useState([]);
    const [message, setMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    // Enhanced color palette with gradients
    const confettiColors = [
      "#FF5252",
      "#FF4081",
      "#E040FB",
      "#7C4DFF",
      "#536DFE",
      "#448AFF",
      "#40C4FF",
      "#18FFFF",
      "#64FFDA",
      "#69F0AE",
      "#B2FF59",
      "#EEFF41",
      "#FFFF00",
      "#FFD740",
      "#FFAB40",
      "#FF6E40",
      "#F06292",
      "#BA68C8",
      "#9575CD",
      "#7986CB",
      "#64B5F6",
      "#4FC3F7",
      "#4DD0E1",
      "#4DB6AC",
      "#81C784",
      "#AED581",
    ];

    // Extended icon variety
    const iconTypes = [
      <Sparkles key="sparkles" size={12} strokeWidth={3} />,
      <Star key="star" size={12} strokeWidth={3} />,
      <Zap key="zap" size={12} strokeWidth={3} />,
      <Heart key="heart" size={12} strokeWidth={3} />,
      <Award key="award" size={12} strokeWidth={3} />,
      <Trophy key="trophy" size={12} strokeWidth={3} />,
      <Flame key="flame" size={12} strokeWidth={3} />,
      <Rocket key="rocket" size={12} strokeWidth={3} />,
      <ThumbsUp key="thumbsUp" size={12} strokeWidth={3} />,
    ];

    // Different message styles
    const messageStyles = {
      default:
        "bg-gradient-to-r from-violet-500/90 to-indigo-500/90 py-3 px-8 rounded-full text-white text-lg font-bold shadow-lg shadow-purple-500/30 backdrop-blur-sm border border-white/10",
      success:
        "bg-gradient-to-r from-green-500/90 to-emerald-500/90 py-3 px-8 rounded-full text-white text-lg font-bold shadow-lg shadow-green-500/30 backdrop-blur-sm border border-white/10",
      achievement:
        "bg-gradient-to-r from-amber-500/90 to-orange-500/90 py-3 px-8 rounded-full text-white text-lg font-bold shadow-lg shadow-amber-500/30 backdrop-blur-sm border border-white/10",
      info: "bg-gradient-to-r from-blue-500/90 to-cyan-500/90 py-3 px-8 rounded-full text-white text-lg font-bold shadow-lg shadow-blue-500/30 backdrop-blur-sm border border-white/10",
    };

    // Success messages with more variety
    const successMessages = [
      "Analysis Complete! 🌟",
      "Food detected! 🥗",
      "Nutritional data ready! 📊",
      "Keep it up! 🔥",
      "Great choice! 🏆",
      "Calories calculated! ⚡",
      "Nutrition tracked! 📈",
      "Health goal in progress! 💪",
      "Diet data updated! 🍎",
      "Looking good! ✨",
    ];

    // Generate particles with improved performance using useCallback
    const generateParticles = useCallback(() => {
      return Array.from({ length: particleCount }).map((_, i) => {
        // More varied sizes
        const size = Math.random() * 16 + 5;
        const color =
          confettiColors[Math.floor(Math.random() * confettiColors.length)];

        // More particle shape variety
        const shapeType = Math.random();
        let shape = {};

        if (shapeType < 0.6) {
          // Rectangle
          const isSquare = Math.random() > 0.5;
          shape = {
            width: `${size}px`,
            height: `${isSquare ? size : size * 0.4}px`,
            borderRadius: isSquare ? "2px" : "0",
          };
        } else if (shapeType < 0.8) {
          // Circle
          shape = {
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
          };
        } else {
          // Triangle (CSS triangle using border)
          shape = {
            width: "0",
            height: "0",
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
            backgroundColor: "transparent",
          };
        }

        // More dynamic animations
        const xMovement = Math.random() * 20 - 10; // Move left or right

        return {
          id: i,
          left: `${Math.random() * 100}%`,
          top: "-5%",
          color,
          ...shape,
          transform: `rotate(${
            Math.random() * 360
          }deg) translate(${xMovement}px, 0)`,
          animationDuration: `${Math.random() * 4 + 3}s`,
          animationDelay: `${Math.random() * 2}s`,
          animationTimingFunction:
            Math.random() > 0.7
              ? "ease-in-out"
              : "cubic-bezier(0.4, 0.0, 0.2, 1)",
          opacity: Math.random() * 0.5 + 0.5,
        };
      });
    }, [particleCount, confettiColors]);

    useEffect(() => {
      if (show) {
        // Generate confetti particles
        setParticles(generateParticles());
        setIsVisible(true);

        // Show custom message or random congratulatory message
        setMessage(
          customMessage ||
            successMessages[Math.floor(Math.random() * successMessages.length)]
        );

        // Clean up after animation completes
        const timer = setTimeout(() => {
          setIsVisible(false);
          // Delay particle cleanup for smooth exit
          setTimeout(() => setParticles([]), 1000);
          setMessage("");
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [show, duration, generateParticles, customMessage, successMessages]);

    // If not showing and animation is complete, don't render
    if (!show && !isVisible && particles.length === 0) return null;

    // Calculate responsive sizes based on viewport
    const getResponsiveSize = (baseSize) => {
      // This will be calculated at runtime based on viewport size
      return `clamp(${baseSize * 0.7}px, ${baseSize / 20}vw, ${
        baseSize * 1.3
      }px)`;
    };

    return (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {/* Confetti particles */}
        {particles.map((particle) => {
          // Randomly decide if this will be an icon or a regular confetti piece
          const isIcon = Math.random() > 0.85;

          if (isIcon) {
            const IconComponent =
              iconTypes[Math.floor(Math.random() * iconTypes.length)];

            return (
              <div
                key={particle.id}
                className={`absolute animate-confetti text-white/90 ${
                  isVisible ? "opacity-100" : "opacity-0"
                } transition-opacity duration-1000`}
                style={{
                  left: particle.left,
                  top: particle.top,
                  color: particle.color,
                  transform: particle.transform,
                  animationDuration: particle.animationDuration,
                  animationDelay: particle.animationDelay,
                  animationTimingFunction: particle.animationTimingFunction,
                  filter: "drop-shadow(0 0 2px rgba(255,255,255,0.3))",
                }}
              >
                {IconComponent}
              </div>
            );
          }

          return (
            <div
              key={particle.id}
              className={`absolute animate-confetti ${
                isVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000`}
              style={{
                left: particle.left,
                top: particle.top,
                backgroundColor: particle.borderBottom
                  ? "transparent"
                  : particle.color,
                width: particle.width,
                height: particle.height,
                borderRadius: particle.borderRadius,
                borderLeft: particle.borderLeft,
                borderRight: particle.borderRight,
                borderBottom: particle.borderBottom,
                transform: particle.transform,
                animationDuration: particle.animationDuration,
                animationDelay: particle.animationDelay,
                animationTimingFunction: particle.animationTimingFunction,
                opacity: particle.opacity,
                boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
              }}
            />
          );
        })}

        {/* Success message with animation and responsive design */}
        {message && (
          <div
            className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-fadeSlideUp ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } transition-all duration-500`}
          >
            <div className={messageStyles[messageStyle]}>{message}</div>
          </div>
        )}

        {/* Background glow effect with more dynamic animation */}
        {isVisible && (
          <>
            <div className="fixed inset-0 bg-purple-600/5 animate-pulse-slow pointer-events-none"></div>
            <div className="fixed inset-0 bg-gradient-radial from-indigo-500/10 to-transparent opacity-75 animate-pulse pointer-events-none"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vmin] h-[30vmin] rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl animate-ping-slow pointer-events-none"></div>
          </>
        )}
      </div>
    );
  }
);

export default Confetti;
