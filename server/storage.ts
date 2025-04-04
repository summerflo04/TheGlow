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
    // Ensure borderColor is always a string, not undefined
    const character: Character = { 
      ...insertCharacter, 
      id,
      borderColor: insertCharacter.borderColor || "primary" 
    };
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
    // Ensure resource is always a string, never null or undefined
    const item: Item = { 
      ...insertItem, 
      id,
      resource: insertItem.resource || "No resource available"
    };
    this.items.set(id, item);
    return item;
  }

  // Seed initial data
  private async seedData() {
    // Create characters
    const bria = await this.createCharacter({
      name: "Bria Reign",
      traits: ["Chronically online", "Sassy", "Culturally fluent"],
      avatar: "/images/bria.jpeg",
      bio: "Has strong opinions on everything from Wordle to world politics — often in the same sentence. Drama-aware but claims she doesn't do drama (she does). Emotionally intelligent in DMs, chaotic neutral in public comments.",
      borderColor: "primary"
    });

    const jax = await this.createCharacter({
      name: "Jax",
      traits: ["Tech bro", "Builder", "Optimizer"],
      avatar: "/images/jax.jpeg",
      bio: "Addicted to building things no one asked for. Thinks sleep is 'just an optional downtime process'. Always between burnouts but will never admit it. Lowkey self-aware, highkey obsessed with optimization.",
      borderColor: "secondary"
    });

    const luca = await this.createCharacter({
      name: "Luca Saint",
      traits: ["NYC fashion student", "Elegant", "Eccentric"],
      avatar: "/images/luca.jpeg",
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
      resource: "Original video with 124M views"
    });

    await this.createItem({
      characterId: bria.id,
      title: "Love Island Drama Compilation",
      description: "A curated collection of the most iconic moments from the reality show that defined an era of dating culture. From shocking recouplings to iconic catchphrases, this archive captures the cultural phenomenon in all its chaotic glory.",
      significance: "Reality dating shows shaped relationship expectations and created shared cultural references for an entire generation, influencing everything from dating app behavior to relationship language.",
      category: "Entertainment",
      resource: "Supercut of most-viewed moments"
    });

    await this.createItem({
      characterId: bria.id,
      title: "Threads First-Week Archive",
      description: "Complete record of the chaotic first week of Meta's Twitter alternative launch. This archive captures the platform's explosive growth, celebrity migrations, and the uniquely unhinged content created during its early adoption phase.",
      significance: "The Threads launch represented a pivotal moment in social media history, as users migrated platforms en masse following Twitter's controversial changes, reshaping the digital public square overnight.",
      category: "Technology",
      resource: "Complete first-week post archive"
    });

    await this.createItem({
      characterId: bria.id,
      title: "Wordle Score Archive",
      description: "Complete collection of those little green and yellow squares that took over everyone's timeline in 2022. This archive includes the daily puzzles, solution statistics, and the most viral score shares that dominated social feeds.",
      significance: "Wordle created a rare moment of collective daily ritual across the internet, bringing lighthearted competition and shared experience to millions during a time of ongoing social isolation.",
      category: "Entertainment",
      resource: "Complete puzzle archive with statistics"
    });

    await this.createItem({
      characterId: bria.id,
      title: "TikTok Dance Evolution",
      description: "Comprehensive archive of trending TikTok dances that defined an era of viral movement. From simple hand gestures to elaborate choreography, this collection documents how dance crazes spread globally through social platforms.",
      significance: "TikTok dances created a new form of global cultural exchange, allowing anyone to participate in trending movements regardless of geographic location, transforming how dance evolved and spread.",
      category: "Culture",
      resource: "Evolution timeline with creator credits"
    });

    await this.createItem({
      characterId: bria.id,
      title: "Drake vs. Kendrick Beef",
      description: "Complete archive of the legendary hip-hop feud that captivated the internet. This collection includes every diss track, social media response, and the real-time reactions that turned this rivalry into a cultural watershed moment.",
      significance: "This rap battle transcended music to become a global conversation, highlighting how social media transformed artistic feuds into participatory entertainment events with unprecedented audience engagement.",
      category: "Entertainment",
      resource: "Complete audio archive with annotation"
    });

    await this.createItem({
      characterId: bria.id,
      title: "Met Gala Red Carpet Archive",
      description: "Comprehensive visual documentation of fashion's biggest night. This archive captures the most iconic, controversial, and meme-worthy looks that defined contemporary celebrity fashion and sparked endless social media debates.",
      significance: "The Met Gala evolved from an elite fashion event to a globally discussed cultural moment, where outfit choices became statements analyzed and debated across social platforms.",
      category: "Fashion",
      resource: "Interactive timeline with designer interviews"
    });

    await this.createItem({
      characterId: bria.id,
      title: "TikTok Ban Controversy",
      description: "Complete documentation of the political and cultural battle over TikTok's future in America. This archive includes government hearings, creator responses, and the unprecedented campaign to save a social platform from regulation.",
      significance: "The TikTok ban debate highlighted the complex intersection of national security, youth culture, and the growing influence of creator economies in shaping political discourse and policy outcomes.",
      category: "Politics",
      resource: "Complete congressional testimony archive"
    });

    await this.createItem({
      characterId: bria.id,
      title: "Reels Brain Rot",
      description: "Curated collection of the most hypnotically addictive short-form content that defined the scrolling generation. From oddly satisfying videos to inexplicably viral moments, this archive captures the strange allure of endless content.",
      significance: "Short-form video algorithms created unprecedented changes in attention spans and content consumption, fostering a unique cultural condition where users found themselves unable to stop consuming increasingly fragmented content.",
      category: "Psychology",
      resource: "Attention impact study with viewer data"
    });

    await this.createItem({
      characterId: bria.id,
      title: "We Did It Joe - Kamala Harris Edit",
      description: "The viral video of Vice President Harris' spontaneous phone call that launched a thousand remixes. This archive contains the original clip and its evolution into a cultural touchstone through countless edits and applications.",
      significance: "This moment demonstrated how political events were increasingly processed through remix culture, transforming authentic reactions into versatile meme templates that extended far beyond their original political context.",
      category: "Politics",
      resource: "Complete remix evolution timeline"
    });

    // Create items for Jax
    await this.createItem({
      characterId: jax.id,
      title: "Vision Pro Unboxing",
      description: "Comprehensive first-look at Apple's revolutionary spatial computing headset. This detailed exploration captures the device's capabilities, limitations, and the varied reactions to what was meant to be the future of computing.",
      significance: "The Vision Pro represented a pivotal attempt to move computing beyond screens into spatial integration, marking a significant moment in the evolution of human-computer interaction regardless of its commercial success.",
      category: "Technology",
      resource: "Complete teardown with technical specifications"
    });

    await this.createItem({
      characterId: jax.id,
      title: "Elon's Twitter Takeover Timeline",
      description: "Detailed chronicle of the billionaire's chaotic acquisition and transformation of Twitter. This archive documents the policy changes, controversial decisions, and tumultuous workplace drama that redefined the platform.",
      significance: "This acquisition represented an unprecedented moment when a single billionaire's personal vision dramatically altered a global communication platform, raising fundamental questions about power, speech, and private control of digital public squares.",
      category: "Business",
      resource: "Complete policy change documentation"
    });

    await this.createItem({
      characterId: jax.id,
      title: "Claude/Grok Chat Logs",
      description: "Archive of conversations with early commercial AI assistants that transformed productivity. This collection captures both impressive capabilities and amusing hallucinations that characterized the dawn of consumer AI.",
      significance: "These early AI interactions represent humanity's first widespread experience with artificial general intelligence, capturing both the promise and limitations of systems that would fundamentally transform how people worked and created.",
      category: "Technology",
      resource: "Complete conversation dataset"
    });

    await this.createItem({
      characterId: jax.id,
      title: "LeetCode Job Market Crisis",
      description: "Documentation of the tech industry's obsession with algorithmic interviews amid contracting opportunities. This archive captures the anxiety, competition, and criticism surrounding tech hiring practices during market uncertainty.",
      significance: "This period revealed fundamental tensions in tech hiring, as companies increasingly relied on abstract puzzle-solving to evaluate candidates while the industry simultaneously faced its most significant contraction in decades.",
      category: "Career",
      resource: "Industry-wide hiring data analysis"
    });

    await this.createItem({
      characterId: jax.id,
      title: "Viral Tech Tweets Collection",
      description: "Curated archive of the most influential tech industry posts that shaped digital discourse. From founder pronouncements to engineer whistleblowing, this collection captures the conversations that drove Silicon Valley.",
      significance: "These viral moments transcended tech to influence mainstream culture, revealing how the thoughts of industry insiders increasingly shaped broader social attitudes toward technology and its role in society.",
      category: "Social Media",
      resource: "Impact analysis with engagement metrics"
    });

    await this.createItem({
      characterId: jax.id,
      title: "Why I'm Leaving FAANG at 27",
      description: "The HackerNews post that launched a thousand career changes. This influential resignation letter and its thousands of comments capture the disillusionment that swept through tech's most prestigious companies.",
      significance: "This viral post crystallized growing dissatisfaction with Big Tech's working conditions and values, sparking broader conversations about work-life balance, compensation, and purpose in the technology industry.",
      category: "Career",
      resource: "Complete comment thread archive"
    });

    await this.createItem({
      characterId: jax.id,
      title: "AI-Generated Portrait Collection",
      description: "Gallery of eerily perfect AI-generated professional headshots that flooded LinkedIn. This archive captures both the impressive technical achievements and the unsettling homogeneity of algorithmically generated professional identities.",
      significance: "This trend marked a turning point when AI-generated imagery became indistinguishable from photography, forcing a fundamental reconsideration of visual authenticity in professional contexts.",
      category: "Technology",
      resource: "Technical analysis of generation patterns"
    });

    await this.createItem({
      characterId: jax.id,
      title: "Uber for Therapists Pitch Deck",
      description: "Complete startup pitch for the controversial on-demand mental health service. This comprehensive business proposal includes market analysis, financial projections, and the heated investor discussions that followed.",
      significance: "This pitch exemplified the tech industry's tendency to apply platform economics to increasingly intimate human services, raising important questions about care commodification and professional ethics.",
      category: "Business",
      resource: "Complete investor Q&A transcript"
    });

    await this.createItem({
      characterId: jax.id,
      title: "4:30 AM Routine Reel",
      description: "Viral video detailing a tech entrepreneur's extreme morning productivity ritual. This meticulous documentation of cold plunges, meditation, nootropics, and time-blocking captured the industry's optimization obsession.",
      significance: "This video epitomized Silicon Valley's distinctive approach to productivity and wellness, where biological functions were increasingly viewed through the lens of optimization and performance enhancement.",
      category: "Lifestyle",
      resource: "Complete product list with usage instructions"
    });

    await this.createItem({
      characterId: jax.id,
      title: "Non-Working GPT Todo App",
      description: "Source code for the AI-generated task management application that never quite worked. This extensively documented project captures both the promise and limitations of early generative AI for software development.",
      significance: "This project represented the early frontier of AI-assisted programming, highlighting both the revolutionary potential and practical limitations of systems that could generate code but struggled with logical consistency.",
      category: "Code",
      resource: "Complete development history with error analysis"
    });

    // Create items for Luca Saint
    await this.createItem({
      characterId: luca.id,
      title: "Social Justice Infographic Carousel",
      description: "Collection of the visually distinct slideshows that transformed complex social issues into shareable content. This archive captures both the design evolution and the discourse around information aesthetics and activism.",
      significance: "These carousels represented a fundamental shift in how social justice information spread, creating a distinctive visual language for activism that prioritized accessibility and shareability.",
      category: "Activism",
      resource: "Design evolution analysis with engagement metrics"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Pinterest Aesthetic Collections",
      description: "Comprehensive archive of the visual mood boards that defined distinct internet aesthetics. From cottagecore to Y2K revival, this collection documents how digital curation shaped personal style and identity.",
      significance: "Pinterest boards transformed how people conceptualized and communicated personal style, creating a visual vocabulary for aesthetics that influenced fashion, interior design, and personal expression.",
      category: "Design",
      resource: "Trend analysis with influence mapping"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Aesthetic Communication Guide",
      description: "Instructional archive demonstrating how visual aesthetics replaced traditional vocabulary. This guide documents the evolution of communication where 'dark academia' or 'coastal grandmother' conveyed more than paragraphs of description.",
      significance: "This shift represented a fundamental change in how people conceptualized and communicated identity, replacing descriptive language with visual shorthand that conveyed complex meaning through aesthetic association.",
      category: "Communication",
      resource: "Complete aesthetic vocabulary with visual examples"
    });

    await this.createItem({
      characterId: luca.id,
      title: "NYC Subway Chaos Archive",
      description: "Curated collection capturing the beautiful mayhem of New York City's underground transit system. From spontaneous Jazz performances to fashion shows unfolding between stations, this archive celebrates urban serendipity.",
      significance: "The subway represented one of the last truly democratic shared spaces in an increasingly stratified city, where authentic human interaction and cultural exchange happened across social boundaries.",
      category: "Urban Life",
      resource: "Interactive map with documented events"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Thrifted Jacket Styling Series",
      description: "Viral TikTok collection showing a single secondhand jacket transformed through 50 different styling approaches. This visual guide demonstrates creative reinterpretation through accessories, layering, and context changes.",
      significance: "This series captured the generational shift toward sustainable fashion and individual expression, rejecting fast fashion consumerism in favor of creative reuse and personal style innovation.",
      category: "Fashion",
      resource: "Complete technique guide with accessory details"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Fashion Week Backstage Access",
      description: "Unauthorized footage from behind the scenes at exclusive runway shows. This rare documentation captures the unfiltered reality behind the curated perfection of high fashion presentations.",
      significance: "This footage represented the democratization of fashion's most exclusive spaces, bringing transparency to an industry traditionally defined by carefully controlled access and presentation.",
      category: "Fashion",
      resource: "Designer interviews with candid commentary"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Rat-Chewed Designer Piece",
      description: "Preserved remains of a luxury garment damaged by New York's infamous rodent population. This artifact became a viral symbol of the city's gritty reality colliding with aspirational fashion culture.",
      significance: "This damaged garment became an ironic status symbol, representing the authentic New York experience that balanced glamour with urban grit in a way that couldn't be replicated in manufactured fashion narratives.",
      category: "Fashion",
      resource: "Exhibition history with critical reviews"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Bodega Bacon Egg & Cheese",
      description: "Comprehensive documentation of the quintessential New York breakfast sandwich in its natural habitat. This archive includes photography, interviews with iconic bodega owners, and cultural analysis of this urban staple.",
      significance: "The bodega BEC transcended its status as mere food to become a cultural institution and class equalizer in a divided city, representing affordable quality and neighborhhood connection amid rapid gentrification.",
      category: "Food",
      resource: "Map of critically acclaimed locations with recipes"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Blurry Mirror Outfit Documentation",
      description: "Collection of intentionally low-resolution outfit photos that defined a generation's approach to fashion documentation. This archive traces the evolution from high-production fashion photography to authentic, imperfect self-representation.",
      significance: "This aesthetic rejection of technical perfection represented a cultural shift toward authenticity over polish, where the deliberate embrace of imperfection became a statement against curated inauthenticity.",
      category: "Photography",
      resource: "Technical analysis of intentional degradation techniques"
    });

    await this.createItem({
      characterId: luca.id,
      title: "Rick Owens DM Request",
      description: "Screenshot collection documenting the phenomenon of fashion students boldly messaging industry icons. This archive captures both desperate pleas and surprising successes in the pursuit of design mentorship and borrowed garments.",
      significance: "These direct messages represented how social media collapsed traditional industry hierarchies, creating unprecedented access to fashion's most exclusive figures through digital persistence and creativity.",
      category: "Social Media",
      resource: "Success strategy analysis with response statistics"
    });
  }
}

export const storage = new MemStorage();