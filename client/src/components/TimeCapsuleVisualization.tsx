interface TimeCapsuleVisualizationProps {
  totalItems: number;
}

export default function TimeCapsuleVisualization({ totalItems }: TimeCapsuleVisualizationProps) {
  return (
    <div className="mb-20">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-primary">
          Collective Time Capsule
        </h2>
        <p className="text-gray-400 mt-2 max-w-2xl text-center">
          A digital snapshot of our era, preserved for future generations to discover in 2100
        </p>
      </div>

      <div className="relative h-96 bg-gradient-to-b from-gray-900/90 to-gray-800/30 backdrop-blur-sm rounded-2xl flex items-center justify-center overflow-hidden border border-gray-700/50 shadow-2xl">
        {/* Pulsing backdrop effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/5 rounded-full animate-pulse [animation-delay:1s]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-pink-500/5 rounded-full animate-pulse [animation-delay:2s]"></div>
        </div>
        
        {/* Floating capsule with 3D effect */}
        <div className="relative z-10 animate-[float_8s_ease-in-out_infinite]">
          <div className="w-60 h-60 relative group transition-all duration-500 cursor-pointer hover:scale-105">
            {/* Outer glow */}
            <div className="absolute inset-[-10px] bg-gradient-to-br from-primary/30 via-violet-500/30 to-pink-500/30 rounded-3xl opacity-50 blur-xl group-hover:opacity-70 transition-opacity"></div>
            
            {/* Capsule body with glass morphism */}
            <div className="absolute inset-0 bg-gray-800/90 backdrop-blur-md rounded-3xl border border-gray-600/50 shadow-inner group-hover:border-gray-500/80 transition-all"></div>
            
            {/* Top highlight */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-primary/20 to-violet-500/20 rounded-full mb-4 border border-primary/30">
                <span className="text-5xl">🚀</span>
              </div>
              <div className="text-center space-y-3">
                <div className="text-white text-xl font-bold">{totalItems} Items Preserved</div>
                <div className="text-primary/90 font-medium">For the Year 2100</div>
                <div className="bg-gray-700/30 text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-700/50 mt-2">
                  3 Contributors • {Math.floor(totalItems / 3)} Categories
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating particles with animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Larger particles */}
          <div className="absolute w-3 h-3 bg-primary rounded-full opacity-70 shadow-[0_0_15px_3px] shadow-primary/60 animate-[float_10s_ease-in-out_infinite]" style={{ top: '15%', left: '20%' }}></div>
          <div className="absolute w-2 h-2 bg-violet-500 rounded-full opacity-70 shadow-[0_0_12px_2px] shadow-violet-500/60 animate-[float_13s_ease-in-out_infinite]" style={{ top: '60%', left: '75%' }}></div>
          <div className="absolute w-4 h-4 bg-pink-500 rounded-full opacity-70 shadow-[0_0_18px_3px] shadow-pink-500/60 animate-[float_16s_ease-in-out_infinite]" style={{ top: '75%', left: '30%' }}></div>
          
          {/* Smaller particles */}
          <div className="absolute w-1.5 h-1.5 bg-primary/80 rounded-full opacity-70 shadow-[0_0_8px_2px] shadow-primary/60 animate-[float_8s_ease-in-out_infinite]" style={{ top: '25%', left: '80%' }}></div>
          <div className="absolute w-1 h-1 bg-violet-500/80 rounded-full opacity-70 shadow-[0_0_6px_1px] shadow-violet-500/60 animate-[float_7s_ease-in-out_infinite]" style={{ top: '80%', left: '55%' }}></div>
          <div className="absolute w-2 h-2 bg-pink-500/80 rounded-full opacity-70 shadow-[0_0_10px_2px] shadow-pink-500/60 animate-[float_9s_ease-in-out_infinite]" style={{ top: '40%', left: '40%' }}></div>
          <div className="absolute w-1 h-1 bg-primary/80 rounded-full opacity-70 shadow-[0_0_6px_1px] shadow-primary/60 animate-[float_11s_ease-in-out_infinite]" style={{ top: '30%', left: '65%' }}></div>
        </div>
      </div>
    </div>
  );
}
