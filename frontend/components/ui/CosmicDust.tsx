'use client';

export default function CosmicDust() {
  return (
    <div className="fixed inset-0 -z-[5] pointer-events-none overflow-hidden">
      {/* Purple nebula */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 animate-rotate-slow"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
          top: '10%',
          left: '10%',
        }}
      />

      {/* Pink nebula */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
          top: '20%',
          right: '15%',
          animation: 'rotate-slow 150s linear infinite reverse',
        }}
      />

      {/* Blue nebula */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[110px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'rotate-slow 180s linear infinite',
        }}
      />

      {/* Smaller accent nebulas */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 60%)',
          top: '60%',
          right: '25%',
          animation: 'float 20s ease-in-out infinite',
        }}
      />

      <div
        className="absolute w-[350px] h-[350px] rounded-full blur-[70px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 60%)',
          bottom: '20%',
          right: '10%',
          animation: 'float 25s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
}
