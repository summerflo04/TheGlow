import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CharacterTabs from "@/components/CharacterTabs";
import CharacterPanel from "@/components/CharacterPanel";
import TimeCapsuleVisualization from "@/components/TimeCapsuleVisualization";
import CharacterPreviews from "@/components/CharacterPreviews";
import ItemDetailModal from "@/components/ItemDetailModal";
import { Item, Character } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [selectedCharacterId, setSelectedCharacterId] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all characters
  const charactersQuery = useQuery<Character[]>({
    queryKey: ["/api/characters"],
  });

  // Fetch total items count
  const itemsQuery = useQuery<Item[]>({
    queryKey: ["/api/items"],
  });

  const characters = charactersQuery.data || [];
  const totalItems = itemsQuery.data?.length || 0;

  const handleSelectCharacter = (id: number) => {
    setSelectedCharacterId(id);
  };

  const handleViewItemDetails = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const selectedCharacter = characters.find((char: Character) => char.id === selectedCharacterId);

  if (charactersQuery.isLoading) {
    return (
      <div className="font-sans min-h-screen bg-gradient-to-b from-[#0f1729] to-[#111827] bg-fixed">
        <div className="container mx-auto px-6 py-10 max-w-7xl">
          {/* Header skeleton */}
          <div className="mb-16 text-center">
            <Skeleton className="h-14 w-2/3 mx-auto mb-6" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
          
          {/* Main content skeletons */}
          <div className="space-y-16">
            {/* Character panel skeleton */}
            <div>
              <Skeleton className="h-10 w-96 mx-auto mb-4" />
              <Skeleton className="h-96 w-full rounded-xl" />
            </div>
            
            {/* Time capsule visualization skeleton */}
            <Skeleton className="h-80 w-full rounded-xl" />
            
            {/* Character previews skeleton */}
            <div>
              <Skeleton className="h-10 w-64 mx-auto mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-64 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-neutral-light min-h-screen bg-gradient-to-b from-[#0f1729] to-[#111827] bg-fixed">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-[15%] w-72 h-72 bg-purple-600/5 rounded-full blur-3xl"></div>
          <div className="absolute top-[40%] right-[15%] w-96 h-96 bg-pink-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] left-[35%] w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-10 max-w-7xl relative z-10">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500">
            The Glow Time Capsule
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
            Preserving the essence of our era for the year 2100
          </p>
        </header>

        {/* Main Content */}
        <main>
          {/* Character Selection Tabs */}
          <div className="mb-16">
            <CharacterTabs 
              characters={characters} 
              selectedCharacterId={selectedCharacterId} 
              onSelectCharacter={handleSelectCharacter} 
            />

            {/* Character Content */}
            <div id="character-tabContent" className="mt-2">
              {selectedCharacter && (
                <CharacterPanel
                  character={selectedCharacter}
                  onViewItemDetails={handleViewItemDetails}
                />
              )}
            </div>
          </div>

          {/* Time Capsule Visualization */}
          <TimeCapsuleVisualization totalItems={totalItems} />

          {/* Character Previews */}
          <CharacterPreviews 
            characters={characters} 
            onSelectCharacter={handleSelectCharacter} 
          />
        </main>

        {/* Footer */}
        <footer className="mt-24 text-center border-t border-gray-800/50 pt-8">
          <p className="text-gray-400">The Glow Time Capsule Challenge &copy; {new Date().getFullYear()}</p>
          <p className="mt-2 text-gray-500 text-sm">Preserving our digital legacy for the year 2100</p>
        </footer>
      </div>

      {/* Item Detail Modal */}
      <ItemDetailModal 
        isOpen={isModalOpen} 
        item={selectedItem} 
        onClose={handleCloseModal}
        character={characters.find((char: Character) => selectedItem?.characterId === char.id)}
      />
    </div>
  );
}
