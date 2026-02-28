import { motion } from 'framer-motion';

const MorphingBlobs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main large blob */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] morph-blob float opacity-40"
        style={{
          background: 'var(--blob-gradient-1)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Secondary blob */}
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] morph-blob-alt float-delayed opacity-30"
        style={{
          background: 'var(--blob-gradient-2)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Accent blob */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] morph-blob opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(var(--red-intense) / 0.4), transparent)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default MorphingBlobs;
