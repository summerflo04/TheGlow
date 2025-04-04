import { useQuery } from "@tanstack/react-query";
import { Character, Item } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import TimeCapsuleItem from "./TimeCapsuleItem";

interface CharacterPanelProps {
  character: Character;
  onViewItemDetails: (item: Item) => void;
}

export default function CharacterPanel({ character, onViewItemDetails }: CharacterPanelProps) {
  // Fetch items for this character
  const itemsQuery = useQuery<Item[]>({
    queryKey: [`/api/characters/${character.id}/items`],
  });

  const items = itemsQuery.data || [];

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-xl mb-12 border border-gray-800/50 shadow-lg">
      <div className="md:flex gap-10 items-start">
        {/* Character Avatar and Info */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <div className="flex flex-col items-center md:items-start">
            <div className={`w-40 h-40 rounded-full overflow-hidden ring-4 ring-${character.borderColor}/70 mb-5 shadow-xl shadow-${character.borderColor}/20 border-2 border-gray-800`}>
              <img 
                src={character.avatar} 
                alt={`${character.name} avatar`} 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-white">{character.name}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {character.traits.map((trait, index) => {
                const colorClasses = index === 0 
                  ? "bg-primary/10 text-primary-foreground border border-primary/30" 
                  : index === 1 
                    ? "bg-violet-500/10 text-violet-300 border border-violet-500/30" 
                    : "bg-pink-500/10 text-pink-300 border border-pink-500/30";
                
                return (
                  <span key={trait} className={`${colorClasses} px-3 py-1 rounded-full text-sm font-medium`}>
                    {trait}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="bg-gray-800/60 p-5 rounded-lg backdrop-blur-sm border border-gray-700/50 shadow-inner">
            <h3 className="text-lg font-medium mb-3 text-gray-100">Character Bio</h3>
            <p className="text-gray-300 leading-relaxed">{character.bio}</p>
          </div>
        </div>

        {/* Character's Items Collection */}
        <div className="md:w-2/3">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-3 text-white/90 flex items-center">
              <span className="bg-gradient-to-r from-primary/80 to-violet-500/80 h-5 w-1 rounded mr-2"></span>
              {character.name}'s Time Capsule Contributions
            </h3>
            <p className="text-gray-400 pl-3 border-l border-gray-700">
              These items represent what {character.name} believes future generations should remember about our era.
            </p>
          </div>

          {/* Items Grid */}
          {itemsQuery.isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
              {items.map((item: Item) => (
                <TimeCapsuleItem 
                  key={item.id} 
                  item={item} 
                  onViewDetails={() => onViewItemDetails(item)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
