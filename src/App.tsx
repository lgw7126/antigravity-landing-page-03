import { useRef, useEffect } from 'react';
import { Globe, ArrowRight } from 'lucide-react';

import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';

// Custom SVG Instagram Icon
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Custom SVG Twitter Icon
const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isFadingOut = useRef(false);
  const isStarted = useRef(false);

  // Vanilla JS requestAnimationFrame animation helper
  const animateOpacity = (
    element: HTMLVideoElement,
    start: number,
    end: number,
    duration: number,
    callback?: () => void
  ) => {
    const startTime = performance.now();
    const run = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity = start + (end - start) * progress;
      element.style.opacity = currentOpacity.toString();
      if (progress < 1) {
        requestAnimationFrame(run);
      } else if (callback) {
        callback();
      }
    };
    requestAnimationFrame(run);
  };

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isStarted.current) {
      isStarted.current = true;
      video.style.opacity = '0';
      video.play().then(() => {
        animateOpacity(video, 0, 1, 500);
      }).catch((err) => {
        console.error("Autoplay failed:", err);
        // Fallback in case of browser restrictions
        video.style.opacity = '1';
      });
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const duration = video.duration;
    const currentTime = video.currentTime;

    if (isNaN(duration) || duration === 0) return;

    const remaining = duration - currentTime;

    // Trigger fade-out when 0.55s or less remains
    if (remaining <= 0.55 && !isFadingOut.current) {
      isFadingOut.current = true;
      const currentOpacity = parseFloat(video.style.opacity || '1');
      animateOpacity(video, currentOpacity, 0, 500);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';
    setTimeout(() => {
      video.currentTime = 0;
      video.play().then(() => {
        isFadingOut.current = false;
        animateOpacity(video, 0, 1, 500);
      }).catch((err) => {
        console.error("Loop replay failed:", err);
        isFadingOut.current = false;
        video.style.opacity = '1';
      });
    }, 100);
  };

  // Safe fallback to trigger play if canplay didn't fire due to immediate loading
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.style.opacity = '0';
      if (video.readyState >= 3) {
        handleCanPlay();
      }
    }
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/10 selection:text-white font-sans antialiased">
      {/* SECTION 1: HERO CONTAINER */}
      <header className="min-h-screen overflow-hidden relative flex flex-col justify-between">
        
        {/* Background video */}
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
          style={{ opacity: 0 }}
          muted
          autoPlay
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />

        {/* Dark screen overlay underneath video for smooth crossfade to black */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />

        {/* Navbar */}
        <nav className="relative z-20 px-6 py-6 w-full">
          <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
            
            {/* Left side: Globe + Title + Links */}
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <Globe size={24} className="text-white" />
                <span className="text-white font-semibold text-lg tracking-tight">Asme</span>
              </div>
              <div className="hidden md:flex items-center gap-8 ml-8">
                <a href="#features" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                  Pricing
                </a>
                <a href="#about" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                  About
                </a>
              </div>
            </div>

            {/* Right side: Sign Up + Login */}
            <div className="flex items-center gap-6">
              <button className="text-white text-sm font-medium hover:text-white/80 transition-colors cursor-pointer">
                Sign Up
              </button>
              <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer">
                Login
              </button>
            </div>

          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[15%] md:-translate-y-[20%] max-w-3xl mx-auto w-full">
          
          {/* Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl white tracking-tight font-instrument mb-8 leading-[1.05]">
            Know it then <em className="italic font-normal">all</em>.
          </h1>

          {/* Email input form */}
          <div className="max-w-xl w-full mb-6">
            <form 
              onSubmit={(e) => e.preventDefault()} 
              className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 w-full"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-white placeholder:text-white/40 text-sm outline-none border-none flex-1 py-1"
                required
              />
              <button
                type="submit"
                className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Subscribe"
              >
                <ArrowRight size={20} />
              </button>
            </form>
          </div>

          {/* Subtitle */}
          <p className="text-white/80 text-sm leading-relaxed px-4 max-w-lg mb-8 font-light">
            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
          </p>

          {/* Manifesto button */}
          <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer">
            Manifesto
          </button>

        </div>

        {/* Social icons footer */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          <button 
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            aria-label="Instagram"
          >
            <InstagramIcon size={20} />
          </button>
          <button 
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            aria-label="Twitter"
          >
            <TwitterIcon size={20} />
          </button>
          <button 
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            aria-label="Website"
          >
            <Globe size={20} />
          </button>
        </div>

      </header>

      {/* Main Content Sections */}
      <main>
        <div id="about">
          <AboutSection />
        </div>
        <FeaturedVideoSection />
        <PhilosophySection />
        <ServicesSection />
      </main>
    </div>
  );
}
