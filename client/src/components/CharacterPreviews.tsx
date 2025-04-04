import { Character } from "@shared/schema";

interface CharacterPreviewsProps {
  characters: Character[];
  onSelectCharacter: (id: number) => void;
}

export default function CharacterPreviews({ characters, onSelectCharacter }: CharacterPreviewsProps) {
  const handleClick = (id: number) => {
    onSelectCharacter(id);
    // Smooth scroll to character detail section
    document.querySelector('#character-tabContent')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="mb-16">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-primary">
          Meet Our Contributors
        </h2>
        <p className="text-gray-400 max-w-xl text-center">
          These three visionaries from different fields have curated their most important artifacts for future generations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {characters.map(character => (
          <div 
            key={character.id}
            className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-800/50 cursor-pointer"
            onClick={() => handleClick(character.id)}
          >
            {/* Top border glow */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${character.borderColor} to-transparent`}></div>
            
            {/* Content */}
            <div className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className={`w-28 h-28 rounded-full overflow-hidden ring-4 ring-${character.borderColor}/40 group-hover:ring-${character.borderColor}/70 transition-all duration-300 mb-5 shadow-lg`}>
                  <img 
                    src={character.avatar} 
                    alt={character.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-${character.borderColor} transition-colors">{character.name}</h3>
                
                <div className="flex gap-2 mb-4 justify-center">
                  {character.traits.slice(0, 2).map((trait, index) => {
                    let bgClass, textClass, borderClass;
                    
                    if (index === 0) {
                      bgClass = `bg-${character.borderColor}/10`;
                      textClass = `text-${character.borderColor}`;
                      borderClass = `border-${character.borderColor}/30`;
                    } else {
                      bgClass = "bg-violet-500/10";
                      textClass = "text-violet-300";
                      borderClass = "border-violet-500/30";
                    }
                    
                    return (
                      <span key={trait} className={`${bgClass} ${textClass} ${borderClass} border px-3 py-1 rounded-full text-xs font-medium`}>
                        {trait}
                      </span>
                    );
                  })}
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  {character.bio.substring(0, 100)}...
                </p>
                
                <div className="w-full pt-4 border-t border-gray-800/50 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-${character.borderColor} transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    <span className="text-xs font-medium">10 items contributed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
