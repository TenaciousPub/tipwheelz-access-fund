export const UnderConstruction = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-3xl mx-auto">
        {/* Main Headline */}
        <h1 
          className="text-7xl md:text-9xl font-bold mb-6 animate-pulse-glow"
          style={{ 
            fontFamily: 'Bebas Neue, sans-serif',
            textShadow: '0 0 40px rgba(79, 187, 164, 0.6), 0 0 80px rgba(79, 187, 164, 0.3)'
          }}
        >
          COMING SOON
        </h1>

        {/* Tagline */}
        <p className="text-2xl md:text-4xl text-primary mb-8 font-semibold">
          Fuel the jokes. Fund the fight.
        </p>

        {/* Message */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          We're putting the finishing touches on something special. 
          TipWheelz is almost ready to help you support the content you love.
        </p>

        {/* Launch Status */}
        <div className="inline-block px-8 py-4 rounded-lg bg-primary/20 border border-primary/30 backdrop-blur-sm">
          <p className="text-primary font-semibold text-lg">
            🚀 Launching Very Soon
          </p>
        </div>

        {/* Decorative glow effect */}
        <div 
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(79, 187, 164, 0.3) 0%, transparent 70%)'
          }}
        />
      </div>
    </div>
  );
};
