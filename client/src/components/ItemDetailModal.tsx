import { Item, Character } from "@shared/schema";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ItemDetailModalProps {
  isOpen: boolean;
  item: Item | null;
  character: Character | undefined;
  onClose: () => void;
}

export default function ItemDetailModal({ isOpen, item, character, onClose }: ItemDetailModalProps) {
  if (!item || !character) return null;
  
  let categoryColorClass = "";
  let categoryBorderClass = "";
  
  // Assign colors based on category
  switch (item.category) {
    case "Technology":
      categoryColorClass = "bg-primary/10 text-primary border-primary/30";
      categoryBorderClass = "border-primary/40";
      break;
    case "Knowledge":
    case "Language":
    case "History":
    case "Society":
    case "Finance":
    case "Fashion":
    case "Legacy":
    case "Governance":
      categoryColorClass = "bg-violet-500/10 text-violet-300 border-violet-500/30";
      categoryBorderClass = "border-violet-500/40";
      break;
    default:
      categoryColorClass = "bg-pink-500/10 text-pink-300 border-pink-500/30";
      categoryBorderClass = "border-pink-500/40";
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-900 rounded-xl max-w-4xl p-0 border border-gray-800/50 shadow-2xl">
        {/* Hidden but accessible title for screen readers */}
        <DialogTitle className="sr-only">{item.title} - Time Capsule Item</DialogTitle>
        <DialogDescription className="sr-only">Detailed view of time capsule item contributed by {character.name}</DialogDescription>
        
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-medium ${categoryColorClass} px-3 py-1 rounded-full inline-block border`}>
                {item.category}
              </span>
              <div className="flex items-center text-sm text-gray-400">
                <div className="w-5 h-5 rounded-full overflow-hidden mr-1.5 border border-gray-700">
                  <img 
                    src={character.avatar} 
                    alt={character.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>by {character.name}</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
          </div>
          
          <div className="space-y-6 mb-8">
            <div>
              <h4 className="text-lg font-medium text-gray-100 mb-2">Description</h4>
              <p className="text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
            
            <div className="bg-gray-800/60 p-6 rounded-xl shadow-inner border border-gray-700/50">
              <h4 className="text-lg font-medium text-gray-100 flex items-center gap-2 mb-3">
                <span className="bg-gradient-to-r from-primary to-violet-500 h-4 w-1 rounded"></span>
                Why This Matters for the Future
              </h4>
              <p className="text-gray-300 leading-relaxed">
                {item.significance}
              </p>
            </div>
            
            {item.resource && (
              <div>
                <h4 className="text-md font-medium text-gray-200 mb-2">Associated Resources</h4>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-primary hover:text-primary/80 transition-colors flex items-center"
                  >
                    <span className="underline">{item.resource}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="py-2 px-4 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors border border-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
