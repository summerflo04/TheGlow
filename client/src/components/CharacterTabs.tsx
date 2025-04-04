import { Character } from "@shared/schema";

interface CharacterTabsProps {
  characters: Character[];
  selectedCharacterId: number;
  onSelectCharacter: (id: number) => void;
}

export default function CharacterTabs({ 
  characters, 
  selectedCharacterId, 
  onSelectCharacter 
}: CharacterTabsProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-center">
        <div className="inline-flex rounded-2xl bg-gray-800/40 p-1.5 backdrop-blur-xl shadow-lg border border-gray-700/50">
          {characters.map(character => {
            const isSelected = selectedCharacterId === character.id;
            return (
              <button 
                key={character.id}
                className={`relative px-8 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isSelected 
                    ? 'bg-gray-700/70 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30'
                }`}
                type="button" 
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectCharacter(character.id)}
              >
                {/* Top highlight bar indicator for selected tab */}
                {isSelected && (
                  <div className={`absolute top-0 left-[10%] right-[10%] h-1 bg-${character.borderColor} rounded-b-full opacity-80`}></div>
                )}
                
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full overflow-hidden ${
                    isSelected 
                      ? `ring-2 ring-${character.borderColor} shadow-lg shadow-${character.borderColor}/20` 
                      : 'border border-gray-600/50'
                  }`}>
                    <img 
                      src={character.avatar} 
                      alt={character.name} 
                      className={`w-full h-full object-cover ${isSelected ? 'scale-110' : ''} transition-transform duration-300`} 
                    />
                  </div>
                  <span className={isSelected ? 'scale-105 transform transition-transform duration-300' : ''}>{character.name}</span>
                </div>
                
                {/* Bottom glow for selected tab */}
                {isSelected && (
                  <div className={`absolute bottom-1 left-[20%] right-[20%] h-0.5 bg-${character.borderColor}/50 blur-sm`}></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
