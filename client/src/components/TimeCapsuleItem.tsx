import { Item } from "@shared/schema";

interface TimeCapsuleItemProps {
  item: Item;
  onViewDetails: () => void;
}

export default function TimeCapsuleItem({ item, onViewDetails }: TimeCapsuleItemProps) {
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
    case "Art & Science":
    case "Code":
    case "Philosophy":
    case "Design":
    case "Collaboration":
    case "Environment":
    case "Conservation":
    case "Biology":
    case "Biodiversity":
    case "Genetics":
    case "Climate":
    case "Energy":
    case "Space":
    case "Architecture":
    case "Exploration":
    case "Art":
    case "Culture":
    case "Security":
    case "Entertainment":
      categoryColorClass = "bg-pink-500/10 text-pink-300 border-pink-500/30";
      categoryBorderClass = "border-pink-500/40";
      break;
    default:
      categoryColorClass = "bg-gray-500/10 text-gray-300 border-gray-500/30";
      categoryBorderClass = "border-gray-500/40";
  }

  return (
    <div 
      className={`group relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl border border-gray-800/50 bg-gradient-to-b from-gray-800/80 to-gray-900/90 backdrop-blur-sm cursor-pointer`}
      onClick={onViewDetails}
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${categoryBorderClass} opacity-50`}></div>
      <div className="p-5">
        <span className={`text-xs font-medium ${categoryColorClass} px-2.5 py-1 rounded-full inline-block mb-2.5 border`}>
          {item.category}
        </span>
        <h4 className="text-white font-medium mb-2 truncate group-hover:text-primary transition-colors">{item.title}</h4>
        <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">{item.description.substring(0, 120)}...</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-5">
        <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
          View Details
        </button>
      </div>
    </div>
  );
}
