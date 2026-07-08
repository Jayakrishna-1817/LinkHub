// Smart Bookmark Classifier
// Adapted from LinkHub's ML classifier for Chrome Extension

const categoryKeywords = {
  // Social Media
  'Social Media': {
    keywords: ['facebook.com', 'instagram.com', 'twitter.com', 'x.com', 'snapchat.com', 'tiktok.com', 'pinterest.com', 'reddit.com', 'tumblr.com', 'whatsapp.com', 'whatsapp', 'telegram.org', 'discord.com', 'mastodon', 'threads.net', 'bluesky', 'social network', 'social media'],
    subCategories: {
      'Facebook': ['facebook.com', 'fb.com', 'fb.watch'],
      'Instagram': ['instagram.com', 'instagr.am'],
      'Twitter/X': ['twitter.com', 'x.com', 'tweet'],
      'Reddit': ['reddit.com', 'redd.it'],
      'TikTok': ['tiktok.com'],
      'Pinterest': ['pinterest.com', 'pin.it'],
      'Discord': ['discord.com', 'discord.gg'],
      'Threads': ['threads.net'],
      'WhatsApp': ['whatsapp.com', 'whatsapp', 'web.whatsapp.com']
    }
  },
  
  // Technology & Programming
  'Technology': {
    keywords: ['github.com', 'stackoverflow.com', 'dev.to', 'hackernoon.com', 'techcrunch.com', 'theverge.com', 'arstechnica.com', 'wired.com', 'programming', 'coding', 'developer', 'software', 'api', 'docs', 'documentation', 'chat.openai.com', 'openai.com', 'perplexity.ai', 'claude.ai', 'gemini.google.com', 'vercel.com', 'v0.dev', 'netlify.com', 'railway.app', 'render.com', 'fly.io', 'supabase.com', 'firebase.google.com'],
    subCategories: {
      'AI Tools': ['chat.openai.com', 'chatgpt', 'perplexity.ai', 'claude.ai', 'anthropic.com', 'gemini.google.com', 'deepseek', 'huggingface.co', 'replicate.com'],
      'GitHub': ['github.com', 'github.io', 'raw.githubusercontent'],
      'Stack Overflow': ['stackoverflow.com', 'stackexchange.com', 'serverfault.com'],
      'Cloud Platforms': ['vercel.com', 'v0.dev', 'netlify.com', 'railway.app', 'render.com', 'fly.io', 'heroku.com', 'digitalocean.com'],
      'Backend Services': ['supabase.com', 'firebase.google.com', 'aws.amazon.com', 'cloud.google.com', 'azure.microsoft.com'],
      'Package Managers': ['npmjs.com', 'pypi.org', 'packagist.org', 'crates.io', 'rubygems.org'],
      'Dev Tools': ['postman.com', 'insomnia.rest', 'figma.com', 'codepen.io', 'jsfiddle.net', 'codesandbox.io']
    }
  },
  
  // Entertainment
  'Entertainment': {
    keywords: ['youtube', 'youtu.be', 'netflix', 'hulu', 'disney', 'prime video', 'primevideo', 'twitch', 'spotify', 'soundcloud', 'movie', 'music', 'video', 'streaming', 'entertainment', 'imdb', 'rotten tomatoes', 'lyrics', 'song', 'audio', 'podcast'],
    subCategories: {
      'YouTube': ['youtube', 'youtu.be'],
      'Netflix': ['netflix'],
      'Prime Video': ['prime video', 'primevideo', 'amazon.com/prime', 'amazon.com/gp/video'],
      'Disney+': ['disney', 'disneyplus'],
      'Hulu': ['hulu'],
      'Twitch': ['twitch.tv', 'twitch'],
      'Spotify': ['spotify.com', 'open.spotify', 'spotify'],
      'Movies': ['imdb', 'rotten tomatoes', 'movie', 'cinema', 'film'],
      'Music': ['music', 'soundcloud', 'apple music', 'youtube music', 'lyrics', 'song', 'audio'],
      'Gaming': ['game', 'gaming', 'steam', 'playstation', 'xbox', 'nintendo', 'ign.com', 'gamespot']
    }
  },
  
  // Shopping & E-commerce
  'Shopping': {
    keywords: ['amazon.com', 'ebay.com', 'walmart.com', 'target.com', 'etsy.com', 'aliexpress.com', 'alibaba.com', 'flipkart.com', 'myntra.com', 'ajio.com', 'shop', 'store', 'ecommerce', 'online shopping', 'buy online'],
    subCategories: {
      'Amazon': ['amazon.com', 'amazon.in', 'amazon.co.uk', 'amzn.to'],
      'eBay': ['ebay.com', 'ebay.in'],
      'Etsy': ['etsy.com', 'etsy'],
      'Walmart': ['walmart.com', 'walmart'],
      'Target': ['target.com', 'target'],
      'Fashion': ['zara', 'h&m', 'fashion', 'clothing', 'apparel', 'nike', 'adidas']
    }
  },
  
  // News & Media
  'News': {
    keywords: ['cnn.com', 'bbc.com', 'nytimes.com', 'theguardian.com', 'reuters.com', 'bloomberg.com', 'forbes.com', 'wsj.com', 'washingtonpost.com', 'apnews.com', 'news', 'article', 'breaking news'],
    subCategories: {
      'Tech News': ['techcrunch.com', 'theverge.com', 'arstechnica.com', 'wired.com'],
      'Business News': ['bloomberg.com', 'forbes.com', 'wsj.com', 'cnbc.com', 'businessinsider.com'],
      'General News': ['cnn.com', 'bbc.com', 'nytimes.com', 'theguardian.com', 'reuters.com', 'apnews.com']
    }
  },
  
  // Education & Learning
  'Education': {
    keywords: ['coursera.org', 'udemy.com', 'edx.org', 'khanacademy.org', 'skillshare.com', 'pluralsight.com', 'linkedin.com/learning', 'udacity.com', 'codecademy.com', 'freecodecamp.org', 'education', 'e-learning', 'online course', 'gradious', 'smartinternz', 'nptel', 'swayam'],
    subCategories: {
      'Online Courses': ['coursera.org', 'udemy.com', 'edx.org', 'pluralsight.com', 'skillshare.com', 'linkedin.com/learning'],
      'LMS Platforms': ['gradious', 'smartinternz', 'canvas', 'blackboard', 'moodle'],
      'Coding Platforms': ['codecademy.com', 'freecodecamp.org', 'leetcode.com', 'hackerrank.com', 'codewars.com'],
      'Documentation': ['docs', 'documentation', 'api reference', 'guide', 'manual'],
      'Tutorials': ['tutorial', 'how to', 'guide', 'learn']
    }
  },
  
  // Productivity & Tools
  'Productivity': {
    keywords: ['google', 'drive', 'docs', 'sheets', 'gmail', 'calendar', 'notion', 'trello', 'slack', 'zoom', 'teams', 'asana', 'productivity', 'tool', 'workspace', 'collaboration'],
    subCategories: {
      'Google Workspace': ['google.com/drive', 'docs.google', 'sheets.google', 'gmail', 'calendar.google'],
      'Project Management': ['trello', 'asana', 'jira', 'monday.com'],
      'Communication': ['slack', 'zoom', 'teams', 'discord', 'meet.google']
    }
  },
  
  // Finance & Banking
  'Finance': {
    keywords: ['bank', 'banking', 'finance', 'investment', 'stock', 'trading', 'crypto', 'cryptocurrency', 'bitcoin', 'ethereum', 'phonepe.com', 'phonepe.in', 'phonepe', 'paytm.com', 'paytm', 'pay.google', 'gpay', 'upi payment', 'bhim', 'insurance', 'loan', 'credit card', 'debit card', 'financial'],
    subCategories: {
      'Banking': ['bank', 'banking', 'account', 'savings'],
      'Digital Payments': ['phonepe', 'phonepe.com', 'paytm', 'paytm.com', 'pay.google', 'gpay', 'google pay', 'upi', 'bhim', 'digital payment', 'online payment'],
      'Cryptocurrency': ['crypto', 'bitcoin', 'ethereum', 'blockchain', 'coinbase', 'binance'],
      'Investment': ['investment', 'stock', 'trading', 'portfolio', 'robinhood', 'mutual fund'],
      'Insurance': ['insurance', 'policy', 'coverage', 'claim']
    }
  },
  
  // Health & Fitness
  'Health & Fitness': {
    keywords: ['health', 'fitness', 'workout', 'exercise', 'gym', 'yoga', 'nutrition', 'diet', 'wellness', 'medical', 'doctor', 'hospital'],
    subCategories: {
      'Fitness': ['fitness', 'workout', 'exercise', 'gym', 'training'],
      'Nutrition': ['nutrition', 'diet', 'recipe', 'food', 'cooking'],
      'Medical': ['medical', 'health', 'doctor', 'hospital', 'medicine']
    }
  },
  
  // Travel
  'Travel': {
    keywords: ['travel', 'trip', 'flight', 'hotel', 'booking', 'airbnb', 'expedia', 'tripadvisor', 'vacation', 'tour', 'destination'],
    subCategories: {
      'Booking': ['booking.com', 'expedia', 'hotels.com', 'airbnb'],
      'Flights': ['flight', 'airline', 'airport'],
      'Reviews': ['tripadvisor', 'yelp', 'review']
    }
  },
  
  // Career & Jobs
  'Career': {
    keywords: ['wellfound.com', 'angel.co', 'indeed.com', 'glassdoor.com', 'linkedin.com', 'naukri.com', 'monster.com', 'ziprecruiter.com', 'dice.com', 'job search', 'careers', 'hiring', 'recruitment', 'job opening', 'job posting', 'employment', 'professional network'],
    subCategories: {
      'LinkedIn': ['linkedin.com', 'linkedin.com/in', 'linkedin.com/feed', 'linkedin.com/jobs', 'linkedin.com/company'],
      'Job Boards': ['wellfound.com', 'angel.co', 'indeed.com', 'naukri.com', 'monster.com', 'ziprecruiter.com', 'dice.com', 'hired.com'],
      'Company Reviews': ['glassdoor.com', 'comparably.com', 'blind', 'levels.fyi']
    }
  },
  
  // Startups & Business
  'Startups': {
    keywords: ['producthunt.com', 'ycombinator.com', 'crunchbase.com', 'techstars.com', 'startup', 'founder', 'venture capital', 'vc', 'funding', 'pitch deck', 'saas', 'b2b', 'mvp'],
    subCategories: {
      'Startup Discovery': ['producthunt.com', 'betalist.com', 'startupstash.com'],
      'Accelerators': ['ycombinator.com', 'techstars.com', '500.co', 'alchemist'],
      'Funding': ['crunchbase.com', 'angellist.com', 'pitchbook.com'],
      'SaaS Tools': ['saas', 'software as a service', 'cloud software']
    }
  },
  
  // Design & Creative
  'Design': {
    keywords: ['figma.com', 'dribbble.com', 'behance.net', 'awwwards.com', 'canva.com', 'adobe.com', 'sketch.com', 'invision.com', 'design', 'ui', 'ux', 'graphic design', 'creative'],
    subCategories: {
      'Design Tools': ['figma.com', 'sketch.com', 'adobe.com', 'canva.com', 'invision.com'],
      'Inspiration': ['dribbble.com', 'behance.net', 'awwwards.com', 'siteinspire.com'],
      'Resources': ['unsplash.com', 'pexels.com', 'icons8.com', 'fontawesome.com']
    }
  }
};

// Analyze URL and content to determine category
function classifyBookmark(url, title, pageContent = '') {
  const urlLower = url.toLowerCase();
  const titleLower = title.toLowerCase();
  const contentLower = pageContent.toLowerCase();
  const text = `${urlLower} ${titleLower} ${contentLower}`;
  
  console.log('🔍 CLASSIFYING:', url);
  console.log('📝 Title:', title);
  console.log('📄 Text to analyze:', text.substring(0, 200));
  
  let bestCategory = null;
  let bestSubCategory = null;
  let maxScore = 0;
  
  // Score each category
  for (const [categoryName, categoryData] of Object.entries(categoryKeywords)) {
    let categoryScore = 0;
    
    // Check main category keywords
    for (const keyword of categoryData.keywords) {
      const keywordLower = keyword.toLowerCase();
      
      // Priority 1: Exact domain match (highest weight)
      if (urlLower.includes(keywordLower)) {
        categoryScore += 200;
      }
      // Priority 2: Match in title
      else if (titleLower.includes(keywordLower)) {
        categoryScore += 50;
      }
      // Priority 3: Match in page content (lowest weight)
      else if (contentLower.includes(keywordLower)) {
        categoryScore += 10;
      }
    }
    
    // Check subcategories
    let bestSubCategoryScore = 0;
    let bestSubCategoryName = null;
    
    for (const [subCatName, subKeywords] of Object.entries(categoryData.subCategories)) {
      let subScore = 0;
      for (const keyword of subKeywords) {
        const keywordLower = keyword.toLowerCase();
        
        // Priority 1: Exact domain match (highest weight)
        if (urlLower.includes(keywordLower)) {
          subScore += 300;
        }
        // Priority 2: Match in title
        else if (titleLower.includes(keywordLower)) {
          subScore += 100;
        }
        // Priority 3: Match in page content (lowest weight - avoid false positives)
        else if (contentLower.includes(keywordLower)) {
          subScore += 5;
        }
      }
      
      if (subScore > bestSubCategoryScore) {
        bestSubCategoryScore = subScore;
        bestSubCategoryName = subCatName;
      }
    }
    
    // Total score = category score + best subcategory score
    const totalScore = categoryScore + bestSubCategoryScore;
    
    if (totalScore > 0) {
      console.log(`   ${categoryName}: score=${totalScore} (cat=${categoryScore}, sub=${bestSubCategoryScore}, subCat=${bestSubCategoryName})`);
    }
    
    if (totalScore > maxScore) {
      maxScore = totalScore;
      bestCategory = categoryName;
      bestSubCategory = bestSubCategoryName;
    }
  }
  
  // Fallback to "Other" if no good match
  if (!bestCategory || maxScore < 5) {
    bestCategory = 'Other';
    bestSubCategory = 'Uncategorized';
  }
  
  console.log(`✅ WINNER: ${bestCategory} → ${bestSubCategory} (score: ${maxScore})`);
  
  return {
    mainFolder: bestCategory,
    subFolder: bestSubCategory || 'General',
    confidence: Math.min(maxScore / 100, 1.0) // Normalize to 0-1
  };
}

// Get or create folder hierarchy
async function getOrCreateFolderPath(mainFolderName, subFolderName) {
  return new Promise((resolve, reject) => {
    // Get fresh bookmark tree
    chrome.bookmarks.getTree((tree) => {
      if (!tree || !tree[0]) {
        reject(new Error('Bookmark tree not accessible'));
        return;
      }
      
      const bookmarksBar = tree[0].children.find(node => node.id === '1'); // Bookmarks Bar
      
      if (!bookmarksBar) {
        reject(new Error('Bookmarks bar not found'));
        return;
      }
      
      console.log('🔍 Searching for main folder:', mainFolderName);
      console.log('📚 Available folders in bookmarks bar:', bookmarksBar.children.filter(n => !n.url).map(n => n.title));
      
      // Find or create main folder (case-insensitive)
      let mainFolder = bookmarksBar.children.find(node => 
        node.title && node.title.toLowerCase() === mainFolderName.toLowerCase() && !node.url
      );
      
      if (!mainFolder) {
        console.log('📁 Main folder not found, creating:', mainFolderName);
        chrome.bookmarks.create({
          parentId: bookmarksBar.id,
          title: mainFolderName
        }, (created) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }
          console.log('✅ Main folder created:', created.id);
          createSubFolder(created.id);
        });
      } else {
        console.log('✅ Main folder found:', mainFolder.id);
        createSubFolder(mainFolder.id);
      }
      
      function createSubFolder(parentId) {
        console.log('🔍 Searching for subfolder:', subFolderName, 'in parent:', parentId);
        
        chrome.bookmarks.getChildren(parentId, (children) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }
          
          console.log('📚 Available subfolders:', children.filter(n => !n.url).map(n => n.title));
          
          let subFolder = children.find(node => 
            node.title && node.title.toLowerCase() === subFolderName.toLowerCase() && !node.url
          );
          
          if (!subFolder) {
            console.log('📁 Creating subfolder:', subFolderName);
            chrome.bookmarks.create({
              parentId: parentId,
              title: subFolderName
            }, (created) => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
              }
              console.log('✅ Subfolder created:', created.id);
              resolve(created.id);
            });
          } else {
            console.log('✅ Subfolder found:', subFolder.id);
            resolve(subFolder.id);
          }
        });
      }
    });
  });
}

// Export for use in background script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { classifyBookmark, getOrCreateFolderPath };
}
