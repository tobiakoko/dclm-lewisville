const VERSES = [
  { text: "Be still, and know that I am God.", ref: "Psalm 46:10" },
  { text: "Faith is the assurance of things hoped for.", ref: "Hebrews 11:1" },
  { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
];

const getRandomVerse = () => VERSES[Math.floor(Math.random() * VERSES.length)];

export default function Loading() {
  const verse = getRandomVerse();

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center max-w-lg text-center space-y-8">
        
        {/* Animated Cross/Icon */}
        <div className="relative flex items-center justify-center">
          {/* Outer gentle pulse */}
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-[pulse_3s_infinite]"></div>
          
          {/* Rotating ring - using v4 arbitrary animation syntax */}
          <div className="h-12 w-12 rounded-full border-2 border-primary/20 border-t-primary animate-[spin_3s_linear_infinite]"></div>
          
          {/* Center Cross/Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
             {/* Use your SVG logo here, or this simple cross */}
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary opacity-80">
                <path d="M12 4v16m-8-8h16" strokeLinecap="round" />
             </svg>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 animate-[fade-in_1s_ease-out]">
          <blockquote className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
            &ldquo;{verse.text}&rdquo;
          </blockquote>
          <cite className="block text-sm font-semibold text-primary uppercase tracking-[0.2em] not-italic">
            {verse.ref}
          </cite>
        </div>
      </div>
    </div>
  )
}