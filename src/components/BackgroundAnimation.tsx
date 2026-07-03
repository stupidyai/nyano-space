const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#05080a]">
      {/* Mesh Gradient */}
      <div className="absolute inset-0 opacity-40 bg-mesh"></div>

      {/* Floating Orbs */}
      <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] animate-float"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-float [animation-delay:2s]"></div>
      <div className="absolute top-[40%] right-[30%] w-80 h-80 bg-purple-500/5 rounded-full blur-[80px] animate-float [animation-delay:4s]"></div>

      {/* Breathing Circle in the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-breathe"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full animate-breathe [animation-delay:1s]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/20 rounded-full animate-breathe [animation-delay:2s]"></div>
    </div>
  )
}

export default BackgroundAnimation
