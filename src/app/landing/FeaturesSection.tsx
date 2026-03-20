'use client';

export default function FeaturesSection() {
  return (
    <>
      {/* Core Features Section */}
      <section className="py-24 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-primary block mb-2">Technical Capabilities</span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-surface">Engineered for Collaboration.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-1">
            {/* Feature 1 */}
            <div className="bg-surface-container-high p-8 ghost-border hover:bg-surface-container-highest transition-colors group text-on-surface">
              <div className="w-12 h-12 flex items-center justify-center bg-primary text-on-primary mb-6 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl">search_insights</span>
              </div>
              <h3 className="font-headline text-xl font-bold mb-4">Discovery Hub</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Search and filter collaboration rooms by technology tags. Connect with developers working on the same stack in real-time.
              </p>
              <div className="mt-8 pt-8 border-t border-outline-variant/20 flex gap-2">
                <span className="w-2 h-2 bg-primary"></span>
                <span className="w-2 h-2 bg-outline-variant"></span>
                <span className="w-2 h-2 bg-outline-variant"></span>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="bg-surface-container-high p-8 ghost-border hover:bg-surface-container-highest transition-colors group text-on-surface">
              <div className="w-12 h-12 flex items-center justify-center bg-primary text-on-primary mb-6 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl">hub</span>
              </div>
              <h3 className="font-headline text-xl font-bold mb-4">Meeting Space</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Integrated video, audio, and high-fidelity screen sharing. Designed as a dedicated space for focused technical discussions.
              </p>
              <div className="mt-8 pt-8 border-t border-outline-variant/20 flex gap-2">
                <span className="w-2 h-2 bg-primary"></span>
                <span className="w-2 h-2 bg-primary"></span>
                <span className="w-2 h-2 bg-outline-variant"></span>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="bg-surface-container-high p-8 ghost-border hover:bg-surface-container-highest transition-colors group text-on-surface">
              <div className="w-12 h-12 flex items-center justify-center bg-primary text-on-primary mb-6 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl">settings_input_component</span>
              </div>
              <h3 className="font-headline text-xl font-bold mb-4">Room Ownership</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Create, edit, and delete your own rooms. Link GitHub repositories to provide context for your pair-programming session.
              </p>
              <div className="mt-8 pt-8 border-t border-outline-variant/20 flex gap-2">
                <span className="w-2 h-2 bg-primary"></span>
                <span className="w-2 h-2 bg-primary"></span>
                <span className="w-2 h-2 bg-primary"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 text-on-surface">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight uppercase">Implementation Protocol</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-0 ghost-border text-on-surface">
            {/* Step 1 */}
            <div className="p-8 border-r border-outline-variant/20 md:last:border-r-0 relative group">
              <div className="font-headline text-6xl font-black text-surface-container-highest absolute top-4 right-4 group-hover:text-primary/10 transition-colors">01</div>
              <h4 className="font-label text-xs tracking-widest text-primary mb-4">AUTHENTICATION</h4>
              <h3 className="font-headline text-lg font-bold mb-4">GitHub OAuth</h3>
              <p className="text-on-surface-variant text-sm">Secure identity verification via GitHub. Establish your developer profile instantly.</p>
              <div className="mt-12 h-1 bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/40 w-1/4"></div>
              </div>
            </div>
            {/* Step 2 */}
            <div className="p-8 border-r border-outline-variant/20 md:last:border-r-0 relative group">
              <div className="font-headline text-6xl font-black text-surface-container-highest absolute top-4 right-4 group-hover:text-primary/10 transition-colors">02</div>
              <h4 className="font-label text-xs tracking-widest text-primary mb-4">DISCOVERY</h4>
              <h3 className="font-headline text-lg font-bold mb-4">Filter Rooms</h3>
              <p className="text-on-surface-variant text-sm">Search the active grid using technology keywords or specific repository tags.</p>
              <div className="mt-12 h-1 bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/40 w-2/4"></div>
              </div>
            </div>
            {/* Step 3 */}
            <div className="p-8 border-r border-outline-variant/20 md:last:border-r-0 relative group">
              <div className="font-headline text-6xl font-black text-surface-container-highest absolute top-4 right-4 group-hover:text-primary/10 transition-colors">03</div>
              <h4 className="font-label text-xs tracking-widest text-primary mb-4">INITIATION</h4>
              <h3 className="font-headline text-lg font-bold mb-4">Join or Host</h3>
              <p className="text-on-surface-variant text-sm">Jump into a live thread or create a new room to host your own collaboration session.</p>
              <div className="mt-12 h-1 bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/40 w-3/4"></div>
              </div>
            </div>
            {/* Step 4 */}
            <div className="p-8 border-r border-outline-variant/20 md:last:border-r-0 relative group">
              <div className="font-headline text-6xl font-black text-surface-container-highest absolute top-4 right-4 group-hover:text-primary/10 transition-colors">04</div>
              <h4 className="font-label text-xs tracking-widest text-primary mb-4">REAL-TIME</h4>
              <h3 className="font-headline text-lg font-bold mb-4">Collaborate</h3>
              <p className="text-on-surface-variant text-sm">Engage via low-latency audio/video and screen sharing. Use your local IDE of choice.</p>
              <div className="mt-12 h-1 bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-primary w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}