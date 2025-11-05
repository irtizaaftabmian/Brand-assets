import { motion } from "motion/react";

export function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Grid Dots Pattern */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          color: 'var(--color-muted-foreground)',
        }}
      />

      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0">
        {/* Blob 1 */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-10"
          style={{
            background: 'radial-gradient(circle, #9ca3af 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          initial={{ x: '10%', y: '20%' }}
        />

        {/* Blob 2 */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-10"
          style={{
            background: 'radial-gradient(circle, #6b7280 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          initial={{ x: '70%', y: '60%' }}
        />

        {/* Blob 3 */}
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full opacity-15 dark:opacity-8"
          style={{
            background: 'radial-gradient(circle, #94a3b8 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 80, 0],
            y: [0, 120, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          initial={{ x: '40%', y: '10%' }}
        />

        {/* Blob 4 */}
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full opacity-20 dark:opacity-10"
          style={{
            background: 'radial-gradient(circle, #71717a 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -60, 0],
            y: [0, -80, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          initial={{ x: '80%', y: '30%' }}
        />
      </div>

      {/* Gradient Overlay for smoother blend */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background/50 via-background/30 to-background/50"
      />
    </div>
  );
}
