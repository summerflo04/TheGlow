import { 
  users, type User, type InsertUser,
  characters, type Character, type InsertCharacter,
  items, type Item, type InsertItem
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods (keeping for compatibility)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Character methods
  getCharacters(): Promise<Character[]>;
  getCharacter(id: number): Promise<Character | undefined>;
  createCharacter(character: InsertCharacter): Promise<Character>;
  
  // Item methods
  getItems(): Promise<Item[]>;
  getItemsByCharacterId(characterId: number): Promise<Item[]>;
  getItem(id: number): Promise<Item | undefined>;
  createItem(item: InsertItem): Promise<Item>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private characters: Map<number, Character>;
  private items: Map<number, Item>;
  private userId: number;
  private characterId: number;
  private itemId: number;

  constructor() {
    this.users = new Map();
    this.characters = new Map();
    this.items = new Map();
    this.userId = 1;
    this.characterId = 1;
    this.itemId = 1;
    
    // Initialize with seed data
    this.seedData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Character methods
  async getCharacters(): Promise<Character[]> {
    return Array.from(this.characters.values());
  }

  async getCharacter(id: number): Promise<Character | undefined> {
    return this.characters.get(id);
  }

  async createCharacter(insertCharacter: InsertCharacter): Promise<Character> {
    const id = this.characterId++;
    const character: Character = { ...insertCharacter, id };
    this.characters.set(id, character);
    return character;
  }

  // Item methods
  async getItems(): Promise<Item[]> {
    return Array.from(this.items.values());
  }

  async getItemsByCharacterId(characterId: number): Promise<Item[]> {
    return Array.from(this.items.values()).filter(
      (item) => item.characterId === characterId
    );
  }

  async getItem(id: number): Promise<Item | undefined> {
    return this.items.get(id);
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const id = this.itemId++;
    const item: Item = { ...insertItem, id };
    this.items.set(id, item);
    return item;
  }

  // Seed initial data
;  private async seedData() {
    // Create characters
    const bria = await this.createCharacter({
      name: "Bria Reign",
      traits: ["Chronically online", "Sassy", "Culturally fluent"],
      avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&q=80&w=250&h=250",
      bio: "Has strong opinions on everything from Wordle to world politics — often in the same sentence. Drama-aware but claims she doesn't do drama (she does). Emotionally intelligent in DMs, chaotic neutral in public comments.",
      borderColor: "primary"
    });

    const jax = await this.createCharacter({
      name: "Jax",
      traits: ["Tech bro", "Builder", "Optimizer"],
      avatar: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80&w=250&h=250",
      bio: "Addicted to building things no one asked for. Thinks sleep is 'just an optional downtime process'. Always between burnouts but will never admit it. Lowkey self-aware, highkey obsessed with optimization.",
      borderColor: "secondary"
    });

    const luca = await this.createCharacter({
      name: "Luca Saint",
      traits: ["NYC fashion student", "Elegant", "Eccentric"],
      avatar: "https://images.unsplash.com/photo-1539614474468-f423a2d2270c?auto=format&fit=crop&q=80&w=250&h=250",
      bio: "Blends irony with sincerity like it's an outfit choice. Has resting 'don't talk to me unless you're art' face. Says more in a moodboard than most say in a novel.",
      borderColor: "accent"
    });

    // Create items for Bria Reign
    await this.createItem({
      characterId: bria.id,
      title: "BBL Drake",
      description: "Viral video capturing Drake's rumored Brazilian Butt Lift surgery controversy. This explosive meme sparked weeks of social media frenzy, highlighting the intersection of celebrity culture, beauty standards, and internet humor.",
      significance: "This moment exemplifies how quickly internet culture could transform serious topics into viral entertainment, blending celebrity gossip with broader conversations about body image and authenticity.",
      category: "Entertainment",
      imageUrl: "https://images.unsplash.com/photo-1603651349806-ff55f6619a24?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Original video with 124M views"
    });

    await this.createItem({
      characterId: bria.id,
      title: "Love Island Drama Compilation",
      description: "A curated collection of the most iconic moments from the reality show that defined an era of dating culture. From shocking recouplings to iconic catchphrases, this archive captures the cultural phenomenon in all its chaotic glory.",
      significance: "Reality dating shows shaped relationship expectations and created shared cultural references for an entire generation, influencing everything from dating app behavior to relationship language.",
      category: "Entertainment",
      imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Supercut of most-viewed moments"
    });

    await this.createItem({
      characterId: bria.id,
      title: "Threads First-Week Archive",
      description: "Complete record of the chaotic first week of Meta's Twitter alternative launch. This archive captures the platform's explosive growth, celebrity migrations, and the uniquely unhinged content created during its early adoption phase.",
      significance: "The Threads launch represented a pivotal moment in social media history, as users migrated platforms en masse following Twitter's controversial changes, reshaping the digital public square overnight.",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete first-week post archive"
    });

    await this.createItem({
      characterId: bria.id,
      title: "Wordle Score Archive",
      description: "Complete collection of those little green and yellow squares that took over everyone's timeline in 2022. This archive includes the daily puzzles, solution statistics, and the most viral score shares that dominated social feeds.",
      significance: "Wordle created a rare moment of collective daily ritual across the internet, bringing lighthearted competition and shared experience to millions during a time of ongoing social isolation.",
      category: "Entertainment",
      imageUrl: "https://images.unsplash.com/photo-1642892204808-496c5fd7b089?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete puzzle archive with statistics"
    });

    await this.createItem({
      characterId: bria.id,
      title: "TikTok Dance Evolution",
      description: "Comprehensive archive of trending TikTok dances that defined an era of viral movement. From simple hand gestures to elaborate choreography, this collection documents how dance crazes spread globally through social platforms.",
      significance: "TikTok dances created a new form of global cultural exchange, allowing anyone to participate in trending movements regardless of geographic location, transforming how dance evolved and spread.",
      category: "Culture",
      imageUrl: "https://images.unsplash.com/photo-1585828922344-85c9daa264b0?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Evolution timeline with creator credits"
    });

    await this.createItem({
      characterId: bria.id,
      title: "Drake vs. Kendrick Beef",
      description: "Complete archive of the legendary hip-hop feud that captivated the internet. This collection includes every diss track, social media response, and the real-time reactions that turned this rivalry into a cultural watershed moment.",
      significance: "This rap battle transcended music to become a global conversation, highlighting how social media transformed artistic feuds into participatory entertainment events with unprecedented audience engagement.",
      category: "Entertainment",
      imageUrl: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete audio archive with annotation"
    });

    await this.createItem({
      characterId: bria.id,
      title: "Met Gala Red Carpet Archive",
      description: "Comprehensive visual documentation of fashion's biggest night. This archive captures the most iconic, controversial, and meme-worthy looks that defined contemporary celebrity fashion and sparked endless social media debates.",
      significance: "The Met Gala evolved from an elite fashion event to a globally discussed cultural moment, where outfit choices became statements analyzed and debated across social platforms.",
      category: "Fashion",
      imageUrl: "https://images.unsplash.com/photo-1580171401478-47361febfb1f?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Interactive timeline with designer interviews"
    });

    await this.createItem({
      characterId: bria.id,
      title: "TikTok Ban Controversy",
      description: "Complete documentation of the political and cultural battle over TikTok's future in America. This archive includes government hearings, creator responses, and the unprecedented campaign to save a social platform from regulation.",
      significance: "The TikTok ban debate highlighted the complex intersection of national security, youth culture, and the growing influence of creator economies in shaping political discourse and policy outcomes.",
      category: "Politics",
      imageUrl: "https://images.unsplash.com/photo-1594319622810-b9fb0a591dcb?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete congressional testimony archive"
    });

    await this.createItem({
      characterId: bria.id,
      title: "Reels Brain Rot",
      description: "Curated collection of the most hypnotically addictive short-form content that defined the scrolling generation. From oddly satisfying videos to inexplicably viral moments, this archive captures the strange allure of endless content.",
      significance: "Short-form video algorithms created unprecedented changes in attention spans and content consumption, fostering a unique cultural condition where users found themselves unable to stop consuming increasingly fragmented content.",
      category: "Psychology",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Attention impact study with viewer data"
    });

    await this.createItem({
      characterId: bria.id,
      title: "We Did It Joe - Kamala Harris Edit",
      description: "The viral video of Vice President Harris' spontaneous phone call that launched a thousand remixes. This archive contains the original clip and its evolution into a cultural touchstone through countless edits and applications.",
      significance: "This moment demonstrated how political events were increasingly processed through remix culture, transforming authentic reactions into versatile meme templates that extended far beyond their original political context.",
      category: "Politics",
      imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete remix evolution timeline"
    });

    // Create items for Jax
    await this.createItem({
      characterId: jax.id,
      title: "Vision Pro Unboxing",
      description: "Comprehensive first-look at Apple's revolutionary spatial computing headset. This detailed exploration captures the device's capabilities, limitations, and the varied reactions to what was meant to be the future of computing.",
      significance: "The Vision Pro represented a pivotal attempt to move computing beyond screens into spatial integration, marking a significant moment in the evolution of human-computer interaction regardless of its commercial success.",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete teardown with technical specifications"
    });

    await this.createItem({
      characterId: jax.id,
      title: "Elon's Twitter Takeover Timeline",
      description: "Detailed chronicle of the billionaire's chaotic acquisition and transformation of Twitter. This archive documents the policy changes, controversial decisions, and tumultuous workplace drama that redefined the platform.",
      significance: "This acquisition represented an unprecedented moment when a single billionaire's personal vision dramatically altered a global communication platform, raising fundamental questions about power, speech, and private control of digital public squares.",
      category: "Business",
      imageUrl: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete policy change documentation"
    });

    await this.createItem({
      characterId: jax.id,
      title: "Claude/Grok Chat Logs",
      description: "Archive of conversations with early commercial AI assistants that transformed productivity. This collection captures both impressive capabilities and amusing hallucinations that characterized the dawn of consumer AI.",
      significance: "These early AI interactions represent humanity's first widespread experience with artificial general intelligence, capturing both the promise and limitations of systems that would fundamentally transform how people worked and created.",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1677442135133-3e3c5eaf13b1?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete conversation dataset"
    });

    await this.createItem({
      characterId: jax.id,
      title: "LeetCode Job Market Crisis",
      description: "Documentation of the tech industry's obsession with algorithmic interviews amid contracting opportunities. This archive captures the anxiety, competition, and criticism surrounding tech hiring practices during market uncertainty.",
      significance: "This period revealed fundamental tensions in tech hiring, as companies increasingly relied on abstract puzzle-solving to evaluate candidates while the industry simultaneously faced its most significant contraction in decades.",
      category: "Career",
      imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Industry-wide hiring data analysis"
    });

    await this.createItem({
      characterId: jax.id,
      title: "Viral Tech Tweets Collection",
      description: "Curated archive of the most influential tech industry posts that shaped digital discourse. From founder pronouncements to engineer whistleblowing, this collection captures the conversations that drove Silicon Valley.",
      significance: "These viral moments transcended tech to influence mainstream culture, revealing how the thoughts of industry insiders increasingly shaped broader social attitudes toward technology and its role in society.",
      category: "Social Media",
      imageUrl: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Impact analysis with engagement metrics"
    });

    await this.createItem({
      characterId: jax.id,
      title: "Why I'm Leaving FAANG at 27",
      description: "The HackerNews post that launched a thousand career changes. This influential resignation letter and its thousands of comments capture the disillusionment that swept through tech's most prestigious companies.",
      significance: "This viral post crystallized growing dissatisfaction with Big Tech's working conditions and values, sparking broader conversations about work-life balance, compensation, and purpose in the technology industry.",
      category: "Career",
      imageUrl: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete comment thread archive"
    });

    await this.createItem({
      characterId: jax.id,
      title: "AI-Generated Portrait Collection",
      description: "Gallery of eerily perfect AI-generated professional headshots that flooded LinkedIn. This archive captures both the impressive technical achievements and the unsettling homogeneity of algorithmically generated professional identities.",
      significance: "This trend marked a turning point when AI-generated imagery became indistinguishable from photography, forcing a fundamental reconsideration of visual authenticity in professional contexts.",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Technical analysis of generation patterns"
    });

    await this.createItem({
      characterId: jax.id,
      title: "Uber for Therapists Pitch Deck",
      description: "Complete startup pitch for the controversial on-demand mental health service. This comprehensive business proposal includes market analysis, financial projections, and the heated investor discussions that followed.",
      significance: "This pitch exemplified the tech industry's tendency to apply platform economics to increasingly intimate human services, raising important questions about care commodification and professional ethics.",
      category: "Business",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete investor Q&A transcript"
    });

    await this.createItem({
      characterId: jax.id,
      title: "4:30 AM Routine Reel",
      description: "Viral video detailing a tech entrepreneur's extreme morning productivity ritual. This meticulous documentation of cold plunges, meditation, nootropics, and time-blocking captured the industry's optimization obsession.",
      significance: "This video epitomized Silicon Valley's distinctive approach to productivity and wellness, where biological functions were increasingly viewed through the lens of optimization and performance enhancement.",
      category: "Lifestyle",
      imageUrl: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete product list with usage instructions"
    });

    await this.createItem({
      characterId: jax.id,
      title: "Non-Working GPT Todo App",
      description: "Source code for the AI-generated task management application that never quite worked. This extensively documented project captures both the promise and limitations of early generative AI for software development.",
      significance: "This project represented the early frontier of AI-assisted programming, highlighting both the revolutionary potential and practical limitations of systems that could generate code but struggled with logical consistency.",
      category: "Code",
      imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete development history with error analysis"
    });

    // Create items for Luca Saint
    await this.createItem({
      characterId: luca.id,
      title: "Social Justice Infographic Carousel",
      description: "Collection of the visually distinct slideshows that transformed complex social issues into shareable content. This archive captures both the design evolution and the discourse around information aesthetics and activism.",
      significance: "These carousels represented a fundamental shift in how social justice information spread, creating a distinctive visual language for activism that prioritized accessibility and shareability.",
      category: "Activism",
      imageUrl: "https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Design evolution analysis with engagement metrics"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Pinterest Aesthetic Collections",
      description: "Comprehensive archive of the visual mood boards that defined distinct internet aesthetics. From cottagecore to Y2K revival, this collection documents how digital curation shaped personal style and identity.",
      significance: "Pinterest boards transformed how people conceptualized and communicated personal style, creating a visual vocabulary for aesthetics that influenced fashion, interior design, and personal expression.",
      category: "Design",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Trend analysis with influence mapping"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Aesthetic Communication Guide",
      description: "Instructional archive demonstrating how visual aesthetics replaced traditional vocabulary. This guide documents the evolution of communication where 'dark academia' or 'coastal grandmother' conveyed more than paragraphs of description.",
      significance: "This shift represented a fundamental change in how people conceptualized and communicated identity, replacing descriptive language with visual shorthand that conveyed complex meaning through aesthetic association.",
      category: "Communication",
      imageUrl: "https://images.unsplash.com/photo-1607604674483-619c85ff9e39?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete aesthetic vocabulary with visual examples"
    });

    await this.createItem({
      characterId: luca.id,
      title: "NYC Subway Chaos Archive",
      description: "Curated collection capturing the beautiful mayhem of New York City's underground transit system. From spontaneous Jazz performances to fashion shows unfolding between stations, this archive celebrates urban serendipity.",
      significance: "The subway represented one of the last truly democratic shared spaces in an increasingly stratified city, where authentic human interaction and cultural exchange happened across social boundaries.",
      category: "Urban Life",
      imageUrl: "https://images.unsplash.com/photo-1534430480872-3b73a86ab571?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Interactive map with documented events"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Thrifted Jacket Styling Series",
      description: "Viral TikTok collection showing a single secondhand jacket transformed through 50 different styling approaches. This visual guide demonstrates creative reinterpretation through accessories, layering, and context changes.",
      significance: "This series captured the generational shift toward sustainable fashion and individual expression, rejecting fast fashion consumerism in favor of creative reuse and personal style innovation.",
      category: "Fashion",
      imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete technique guide with accessory details"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Fashion Week Backstage Access",
      description: "Unauthorized footage from behind the scenes at exclusive runway shows. This rare documentation captures the unfiltered reality behind the curated perfection of high fashion presentations.",
      significance: "This footage represented the democratization of fashion's most exclusive spaces, bringing transparency to an industry traditionally defined by carefully controlled access and presentation.",
      category: "Fashion",
      imageUrl: "https://images.unsplash.com/photo-1537274942065-eda9d00a6293?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Designer interviews with candid commentary"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Rat-Chewed Designer Piece",
      description: "Preserved remains of a luxury garment damaged by New York's infamous rodent population. This artifact became a viral symbol of the city's gritty reality colliding with aspirational fashion culture.",
      significance: "This damaged garment became an ironic status symbol, representing the authentic New York experience that balanced glamour with urban grit in a way that couldn't be replicated in manufactured fashion narratives.",
      category: "Fashion",
      imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Exhibition history with critical reviews"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Bodega Bacon Egg & Cheese",
      description: "Comprehensive documentation of the quintessential New York breakfast sandwich in its natural habitat. This archive includes photography, interviews with iconic bodega owners, and cultural analysis of this urban staple.",
      significance: "The bodega BEC transcended its status as mere food to become a cultural institution and class equalizer in a divided city, representing affordable quality and neighborhhood connection amid rapid gentrification.",
      category: "Food",
      imageUrl: "https://images.unsplash.com/photo-1639024471283-03a3e79b2333?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Map of critically acclaimed locations with recipes"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Blurry Mirror Outfit Documentation",
      description: "Collection of intentionally low-resolution outfit photos that defined a generation's approach to fashion documentation. This archive traces the evolution from high-production fashion photography to authentic, imperfect self-representation.",
      significance: "This aesthetic rejection of technical perfection represented a cultural shift toward authenticity over polish, where the deliberate embrace of imperfection became a statement against curated inauthenticity.",
      category: "Photography",
      imageUrl: "https://images.unsplash.com/photo-1592217052865-9d3d0d126aec?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Technical analysis of intentional degradation techniques"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Rick Owens DM Request",
      description: "Screenshot collection documenting the phenomenon of fashion students boldly messaging industry icons. This archive captures both desperate pleas and surprising successes in the pursuit of design mentorship and borrowed garments.",
      significance: "These direct messages represented how social media collapsed traditional industry hierarchies, creating unprecedented access to fashion's most exclusive figures through digital persistence and creativity.",
      category: "Social Media",
      imageUrl: "https://images.unsplash.com/photo-1618510053699-61c83f3f10ea?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Success strategy analysis with response statistics"
    });

    // Create items for Neo
    await this.createItem({
      characterId: neo.id,
      title: "Viral Meme Collection",
      description: "A curated archive of the most influential memes that shaped cultural discourse and communication. This collection captures how humor, social commentary, and shared references evolved in the digital age.",
      significance: "Memes became a primary language of cultural exchange, political expression, and community formation. This archive preserves these ephemeral artifacts to help future generations understand how ideas spread and evolved.",
      category: "Culture",
      imageUrl: "https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Academic analysis of meme evolution patterns"
    });

    await this.createItem({
      characterId: neo.id,
      title: "First Blockchain-Based Government",
      description: "Documentation of the first nation to implement blockchain technology for transparent governance. This system transformed voting, public finance, and service delivery through cryptographic verification and decentralized oversight.",
      significance: "This represents a fundamental evolution in governance, creating unprecedented transparency and accountability. The archive documents both the technological implementation and the societal impacts of this governance model.",
      category: "Governance",
      imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "System architecture and social impact reports"
    });

    await this.createItem({
      characterId: neo.id,
      title: "Global Pandemic Response Archive",
      description: "A comprehensive record of humanity's response to major 21st-century pandemics. This collection includes public health data, medical innovations, and cultural adaptations that emerged during these global crises.",
      significance: "Pandemics forced rapid evolution in medicine, public policy, and social norms. This archive preserves the lessons learned through these challenges to inform future responses to biological threats.",
      category: "History",
      imageUrl: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Interactive timeline of pandemic responses"
    });

    await this.createItem({
      characterId: neo.id,
      title: "Virtual Reality Masterpieces",
      description: "A collection of the most significant artistic works created for immersive virtual reality. These pieces redefined creative expression by utilizing full spatial dimensions, interactive elements, and multi-sensory components.",
      significance: "VR art represented a fundamental shift in creative expression beyond two-dimensional media. This archive preserves these works that could only be fully experienced through immersive technology.",
      category: "Art",
      imageUrl: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Immersive gallery with creator commentaries"
    });

    await this.createItem({
      characterId: neo.id,
      title: "Internet Culture Lexicon",
      description: "An encyclopedic dictionary of digital slang, acronyms, and linguistic innovations that emerged online. This comprehensive reference documents how language evolved in response to digital communication constraints and communities.",
      significance: "Online communication transformed language itself, creating new expressions, meanings, and communicative patterns. This archive preserves these linguistic innovations that might otherwise be lost to time.",
      category: "Language",
      imageUrl: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Etymology database with usage examples"
    });

    await this.createItem({
      characterId: neo.id,
      title: "Social Media Platform Archive",
      description: "A preserved snapshot of the major social networks that shaped human interaction. This collection includes interface designs, feature evolutions, and sample content that demonstrates how these platforms influenced communication.",
      significance: "Social media fundamentally altered human socialization, information sharing, and community formation. This archive helps future generations understand the digital environments that shaped billions of lives.",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1591522810877-e9a8199ae26d?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Interactive platform museum"
    });

    await this.createItem({
      characterId: neo.id,
      title: "Digital Identity Evolution",
      description: "Documentation of how personal identity transformed in the digital age. This collection tracks the evolution from usernames to biometric verification to decentralized identity systems that gave individuals control over their data.",
      significance: "Digital identity became as important as physical identity for many aspects of life. This archive preserves the technological and social evolution of how humans represented themselves in digital spaces.",
      category: "Society",
      imageUrl: "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Timeline of identity authentication methods"
    });

    await this.createItem({
      characterId: neo.id,
      title: "Influential Video Games",
      description: "A collection of the most culturally and artistically significant video games. These interactive experiences pushed the boundaries of narrative, visual design, and player agency while addressing complex themes.",
      significance: "Video games emerged as one of the most influential art forms of the era, combining storytelling, visual art, music, and interactive design. This archive preserves these works that shaped cultural narratives and created new forms of artistic expression.",
      category: "Entertainment",
      imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Playable museum with developer commentary"
    });

    await this.createItem({
      characterId: neo.id,
      title: "Digital Fashion Revolution",
      description: "Documentation of how clothing design evolved when freed from physical constraints. This collection showcases digital-only fashion, augmented reality wearables, and other innovations that transformed self-expression.",
      significance: "As digital existence became more important, fashion innovation increasingly happened in virtual spaces. This archive preserves these creative works that redefined personal aesthetics beyond physical limitations.",
      category: "Fashion",
      imageUrl: "https://images.unsplash.com/photo-1569412148958-352264461339?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Virtual runway archive with designer interviews"
    });

    await this.createItem({
      characterId: neo.id,
      title: "Cryptocurrency Artifacts",
      description: "A historical collection of the major cryptocurrencies and blockchain technologies that transformed finance. This includes the original code, whitepaper, and early transaction records of Bitcoin and other influential digital currencies.",
      significance: "Cryptocurrencies represented a radical rethinking of money, value, and financial systems. This archive preserves the origins and evolution of these technologies that created new economic possibilities outside traditional financial institutions.",
      category: "Finance",
      imageUrl: "https://images.unsplash.com/photo-1639815188546-c43c240be049?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Genesis blocks and founding documents"
    });

    // Create items for Zara
    await this.createItem({
      characterId: zara.id,
      title: "Climate Tipping Points Record",
      description: "Comprehensive documentation of critical climate thresholds crossed in the early 21st century. This collection includes scientific data, observable impacts, and adaptation strategies developed in response.",
      significance: "These events marked irreversible changes in Earth's systems that shaped humanity's relationship with our planet. This archive preserves both the scientific understanding and lived experience of these transformative ecological shifts.",
      category: "Environment",
      imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Interactive climate model with historical data"
    });

    await this.createItem({
      characterId: zara.id,
      title: "First Mars Landing Documentation",
      description: "The complete record of humanity's first crewed mission to Mars. This collection includes technical specifications, crew journals, biological samples, and geological findings from this historic achievement.",
      significance: "This mission represented humanity's first steps toward becoming a multi-planetary species. This archive preserves this pivotal moment in our evolution and expansion beyond Earth.",
      category: "Space",
      imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Original mission broadcast and communications"
    });

    await this.createItem({
      characterId: zara.id,
      title: "Oceanic Restoration Initiative",
      description: "Documentation of the successful large-scale restoration of marine ecosystems. This collection tracks the innovative techniques, international cooperation, and biological results of humanity's efforts to heal ocean environments.",
      significance: "This project demonstrated humanity's capacity to reverse ecological damage rather than simply limit it. This archive preserves the methods, challenges, and achievements of this unprecedented planetary healing effort.",
      category: "Conservation",
      imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Before/after ecosystem monitoring data"
    });

    await this.createItem({
      characterId: zara.id,
      title: "Global Seed Vault Catalog",
      description: "A complete genetic repository of Earth's plant biodiversity. This collection includes seed samples, genetic sequencing, and cultivation information for thousands of plant species preserved for future regeneration.",
      significance: "This vault represented humanity's insurance policy against extinction of plant species. This archive catalogs our efforts to preserve the genetic heritage of Earth's plant life against climate change and other threats.",
      category: "Biodiversity",
      imageUrl: "https://images.unsplash.com/photo-1611735341450-74d61e660ad2?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Complete species database with genetic information"
    });

    await this.createItem({
      characterId: zara.id,
      title: "Last Fossil Fuel Power Plant",
      description: "Documentation of the decommissioning of the final commercial fossil fuel power generation facility. This collection includes photos, technical specifications, and records of the global energy transition that made it possible.",
      significance: "This event marked the end of humanity's dependence on carbon-based energy sources. This archive preserves the culmination of the decades-long effort to transform our civilization's energy foundation.",
      category: "Energy",
      imageUrl: "https://images.unsplash.com/photo-1486947799489-3fabdd7d32a6?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Global energy transition timeline"
    });

    await this.createItem({
      characterId: zara.id,
      title: "Synthetic Biology Breakthroughs",
      description: "A record of the most transformative innovations in engineered biological systems. This collection documents the creation of organisms designed to produce medicines, remove pollution, and create sustainable materials.",
      significance: "Synthetic biology represented humanity's growing capacity to direct evolution for specific purposes. This archive preserves these innovations that blurred the line between the natural and the designed.",
      category: "Biology",
      imageUrl: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Genetic design specifications and safety protocols"
    });

    await this.createItem({
      characterId: zara.id,
      title: "Atmospheric Carbon Capture Network",
      description: "Documentation of the global infrastructure that removed excess carbon dioxide from Earth's atmosphere. This collection includes the technology, international agreements, and measurable climate impacts of this planetary-scale intervention.",
      significance: "This project represented humanity's deliberate assumption of responsibility for managing Earth's climate. This archive preserves the methods and outcomes of this unprecedented geo-engineering achievement.",
      category: "Climate",
      imageUrl: "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Carbon capture efficiency metrics across decades"
    });

    await this.createItem({
      characterId: zara.id,
      title: "Space Habitat Designs",
      description: "Architectural and engineering plans for self-sustaining human habitats in space. This collection includes blueprints, materials research, and life support systems for long-term human presence beyond Earth.",
      significance: "These designs represented humanity's growing capability to create habitable environments in the most extreme conditions. This archive preserves these innovations that enabled sustainable living beyond our home planet.",
      category: "Architecture",
      imageUrl: "https://images.unsplash.com/photo-1538391286656-461e20081226?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "Virtual walkthrough of constructed habitats"
    });

    await this.createItem({
      characterId: zara.id,
      title: "Extinct Species Revival Project",
      description: "Documentation of successful efforts to resurrect extinct species through genetic reconstruction. This collection includes the scientific methods, ethical debates, and ecological considerations of these de-extinction initiatives.",
      significance: "This project represented humanity's attempt to undo previous ecological damage through advanced biotechnology. This archive preserves both the technological achievements and the complex ethical questions raised by bringing back lost species.",
      category: "Genetics",
      imageUrl: "https://images.unsplash.com/photo-1475518112798-86ae358241eb?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "First revival success case studies"
    });

    await this.createItem({
      characterId: zara.id,
      title: "Deep Ocean Exploration Findings",
      description: "Discoveries from comprehensive mapping and exploration of Earth's deep oceans. This collection includes biological specimens, geological data, and visual records of previously unknown marine ecosystems.",
      significance: "These expeditions revealed the last uncharted regions of our home planet. This archive preserves the incredible biodiversity and geological features discovered in Earth's final frontier.",
      category: "Exploration",
      imageUrl: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=400&h=250",
      resource: "3D bathymetric maps and species catalog"
    });
  }
}

export const storage = new MemStorage();
