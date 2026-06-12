import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  videoUrl: string;
  tag: string;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
}

function ServiceCard({ videoUrl, tag, title, description, index, isInView }: ServiceCardProps) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay: i * 0.15,
            ease: [0.16, 1, 0.3, 1]
          }
        })
      }}
      className="liquid-glass rounded-3xl overflow-hidden group flex flex-col h-full cursor-pointer"
    >
      {/* Video Container */}
      <div className="aspect-video w-full overflow-hidden relative">
        <video
          src={videoUrl}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Card Body */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-4">
          <span className="uppercase tracking-widest text-white/40 text-xs font-semibold">
            {tag}
          </span>
          <div className="liquid-glass rounded-full p-2 text-white transition-colors group-hover:bg-white/10">
            <ArrowUpRight size={18} />
          </div>
        </div>

        <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight font-medium">
          {title}
        </h3>

        <p className="text-white/50 text-sm leading-relaxed font-light flex-1">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const services = [
    {
      videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
      tag: 'Strategy',
      title: 'Research & Insight',
      description: 'We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.'
    },
    {
      videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
      tag: 'Craft',
      title: 'Design & Execution',
      description: 'From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.'
    }
  ];

  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
      {/* Subtle radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.02) 0%, transparent 60%)',
        }}
      />

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        {/* Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-end mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight font-light">
            What we do
          </h2>
          <span className="text-white/40 text-sm tracking-wider uppercase hidden md:inline font-semibold">
            Our services
          </span>
        </motion.div>

        {/* Staggered Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.tag}
              videoUrl={service.videoUrl}
              tag={service.tag}
              title={service.title}
              description={service.description}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
