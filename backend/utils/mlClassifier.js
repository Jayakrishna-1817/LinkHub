const natural = require('natural');
const TfIdf = natural.TfIdf;
const tokenizer = new natural.WordTokenizer();

// Define category keywords for automatic classification
const categoryKeywords = {
  'Operating Systems': ['operating system', 'os ', ' os', 'linux', 'unix', 'windows', 'kernel', 'process', 'thread', 'memory management', 'scheduling', 'file system', 'operating systems'],
  'Computer Networks': ['computer networks', 'networking', 'tcp', 'ip protocol', 'http protocol', 'network protocol', 'router', 'switch', 'osi model', 'network security', 'computer networking'],
  'Data Structures': ['dsa', 'data structures', 'data structure', 'algorithms', 'algorithm', 'array', 'linked list', 'tree', 'graph', 'stack', 'queue', 'sorting', 'searching', 'heap', 'hash', 'hashing', 'binary tree', 'bst', 'recursion', 'dynamic programming', 'dp', 'greedy', 'backtracking', 'time complexity', 'space complexity', 'big o'],
  'Database Management': ['dbms', 'database', 'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'query', 'normalization', 'acid', 'transactions'],
  'Artificial Intelligence': ['ai', 'artificial intelligence', 'machine learning', 'deep learning', 'neural network', 'nlp', 'computer vision', 'ml'],
  'React': ['react js', 'react.js', 'reactjs', 'react tutorial', 'react course', 'react basics', 'react hooks', 'react component', 'jsx', 'redux', 'nextjs', 'next.js', 'state management', 'props', 'virtual dom'],
  'JavaScript': ['javascript', 'js', 'typescript', 'node', 'nodejs', 'npm', 'async', 'promise', 'callback', 'es6', 'vanilla js'],
  'Python': ['python', 'django', 'flask', 'pandas', 'numpy', 'pip', 'anaconda', 'jupyter', 'pytest'],
  'Java': ['java', 'spring', 'hibernate', 'maven', 'gradle', 'jvm', 'servlet', 'jsp'],
  'C Programming': ['c programming', 'c language', 'pointers', 'malloc', 'struct', 'gcc'],
  'C++': ['c++', 'cpp', 'object oriented', 'templates', 'stl', 'boost'],
  'Web Development': ['html', 'css basics', 'css tutorial', 'css course', 'css3', 'css styling', 'frontend', 'backend', 'fullstack', 'web design', 'website', 'responsive', 'bootstrap', 'tailwind', 'sass', 'scss'],
  'DevOps': ['docker', 'kubernetes', 'ci/cd', 'deployment', 'devops', 'jenkins', 'aws', 'azure', 'cloud', 'container'],
  'Mobile Development': ['mobile', 'ios', 'android', 'react native', 'flutter', 'swift', 'kotlin', 'app development'],
  'Cyber Security': ['security', 'cybersecurity', 'hacking', 'penetration testing', 'encryption', 'vulnerability', 'firewall', 'authentication'],
  'Cloud Computing': ['cloud', 'aws', 'azure', 'gcp', 'serverless', 'lambda', 's3', 'ec2', 'iaas', 'paas', 'saas'],
  'Software Engineering': ['software engineering', 'agile', 'scrum', 'sdlc', 'testing', 'debugging', 'version control', 'git'],
  'Blockchain': ['blockchain', 'cryptocurrency', 'bitcoin', 'ethereum', 'smart contract', 'web3', 'nft', 'defi'],
  'Interview Preparation': ['interview', 'interview guide', 'interview preparation', 'job interview', 'interview questions', 'coding interview', 'technical interview', 'interview tips', 'interview prep'],
  'Salesforce': ['salesforce', 'salesforce crm', 'apex', 'visualforce', 'lightning', 'salesforce admin', 'salesforce developer'],
  'Career & Jobs': ['career', 'job', 'resume', 'portfolio', 'hiring', 'recruitment', 'job search', 'career guide', 'internship', 'intern', 'job application', 'application', 'developer position', 'software position', 'fresher', 'entry level']
};

// Source-specific keywords for detection
const sourceKeywords = {
  'ChatGPT': ['chatgpt', 'openai', 'gpt', 'chat.openai.com', 'generative ai'],
  'YouTube': ['youtube', 'youtu.be', 'video', 'watch'],
  'GitHub': ['github', 'repository', 'repo', 'git'],
  'Medium': ['medium.com', 'blog post'],
  'Stack Overflow': ['stackoverflow', 'stack overflow'],
  'GeeksforGeeks': ['geeksforgeeks', 'gfg'],
  'W3Schools': ['w3schools'],
  'MDN': ['mdn', 'mozilla developer'],
  'LeetCode': ['leetcode'],
  'HackerRank': ['hackerrank'],
  'CodePen': ['codepen'],
  'Dev.to': ['dev.to'],
  'Reddit': ['reddit'],
  'Twitter': ['twitter', 'x.com']
};

// Calculate similarity score between text and category
function calculateCategoryScore(text, keywords) {
  const lowerText = text.toLowerCase();
  let score = 0;
  
  keywords.forEach(keyword => {
    const keywordLower = keyword.toLowerCase();
    
    // For short keywords (2-3 chars), use word boundary matching
    if (keyword.length <= 3) {
      const wordBoundaryRegex = new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      const matches = lowerText.match(wordBoundaryRegex);
      if (matches) {
        score += matches.length * 3; // Higher weight for short exact matches
      }
    } else {
      // For longer keywords, use contains matching
      if (lowerText.includes(keywordLower)) {
        const occurrences = (lowerText.match(new RegExp(keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        score += occurrences * (keyword.length > 10 ? 3 : 2);
      }
    }
  });
  
  return score;
}

// Predict the best category for the link
function predictCategory(title, description, tags = []) {
  // Prioritize title heavily, as it contains the main topic
  const titleLower = title.toLowerCase();
  const scores = {};
  
  // Calculate scores for each category
  Object.keys(categoryKeywords).forEach(category => {
    // Give title 5x more weight than description
    const titleScore = calculateCategoryScore(title, categoryKeywords[category]) * 5;
    const descScore = calculateCategoryScore(description, categoryKeywords[category]);
    scores[category] = titleScore + descScore;
  });
  
  // Find category with highest score
  let bestCategory = 'General';
  let maxScore = 0;
  
  Object.entries(scores).forEach(([category, score]) => {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category;
    }
  });
  
  // Special handling: Check if title starts with a clear topic indicator
  const titleWords = titleLower.split(/\s+/).slice(0, 5); // First 5 words
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (titleWords.some(word => word.includes(keyword.toLowerCase()))) {
        // If found in first 5 words, boost this category significantly
        scores[category] = (scores[category] || 0) + 100;
        if (scores[category] > maxScore) {
          maxScore = scores[category];
          bestCategory = category;
        }
      }
    }
  }
  
  // Return results sorted by score
  const sortedResults = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([category, score]) => ({ category, score, confidence: (score / (maxScore || 1)) * 100 }));
  
  return {
    predictedCategory: bestCategory,
    confidence: maxScore > 0 ? Math.min((maxScore / 10) * 100, 100) : 0,
    topCategories: sortedResults
  };
}

// Extract keywords from text using TF-IDF
function extractKeywords(text, topN = 5) {
  const tfidf = new TfIdf();
  tfidf.addDocument(text);
  
  const keywords = [];
  tfidf.listTerms(0).slice(0, topN).forEach(item => {
    if (item.term.length > 2) {
      keywords.push(item.term);
    }
  });
  
  return keywords;
}

// Detect platform/source from URL and content
function detectSource(url, title, description) {
  const urlLower = url.toLowerCase();
  const combinedText = `${url} ${title} ${description}`.toLowerCase();
  
  // First check URL patterns (most reliable)
  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) return 'YouTube';
  if (urlLower.includes('github.com')) return 'GitHub';
  if (urlLower.includes('chat.openai.com') || urlLower.includes('chatgpt')) return 'ChatGPT';
  if (urlLower.includes('medium.com')) return 'Medium';
  if (urlLower.includes('stackoverflow.com')) return 'Stack Overflow';
  if (urlLower.includes('geeksforgeeks.org')) return 'GeeksforGeeks';
  if (urlLower.includes('w3schools.com')) return 'W3Schools';
  if (urlLower.includes('developer.mozilla.org') || urlLower.includes('mdn')) return 'MDN';
  if (urlLower.includes('leetcode.com')) return 'LeetCode';
  if (urlLower.includes('hackerrank.com')) return 'HackerRank';
  if (urlLower.includes('codepen.io')) return 'CodePen';
  if (urlLower.includes('dev.to')) return 'Dev.to';
  if (urlLower.includes('reddit.com')) return 'Reddit';
  if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) return 'Twitter';
  
  // Then check keywords in content
  for (const [source, keywords] of Object.entries(sourceKeywords)) {
    for (const keyword of keywords) {
      if (combinedText.includes(keyword.toLowerCase())) {
        return source;
      }
    }
  }
  
  // Try to extract domain name for unknown sources
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '').split('.')[0];
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  } catch (e) {
    return 'Other';
  }
}

// Suggest hierarchical folder structure
function suggestHierarchicalFolder(url, title, description, existingSource) {
  const detectedSource = detectSource(url, title, description);
  const contentPrediction = predictCategory(title, description);
  
  // If content detection has low confidence and title is too generic, use URL-based categorization
  let subFolder = contentPrediction.predictedCategory;
  
  // If detected as "General" or low confidence, try to extract better category from URL
  if (contentPrediction.confidence < 20 || !title || title.length < 10) {
    const urlLower = url.toLowerCase();
    
    // Try to detect programming language from URL
    if (urlLower.includes('java') && !urlLower.includes('javascript')) {
      subFolder = 'Java';
    } else if (urlLower.includes('python')) {
      subFolder = 'Python';
    } else if (urlLower.includes('javascript') || urlLower.includes('js')) {
      subFolder = 'JavaScript';
    } else if (urlLower.includes('react')) {
      subFolder = 'React';
    } else if (urlLower.includes('node')) {
      subFolder = 'JavaScript';
    } else if (urlLower.includes('compiler')) {
      subFolder = 'Programming Tools';
    } else if (urlLower.includes('editor') || urlLower.includes('ide')) {
      subFolder = 'Development Tools';
    } else {
      subFolder = 'General';
    }
  }
  
  return {
    mainFolder: detectedSource,
    subFolder: subFolder,
    confidence: Math.max(contentPrediction.confidence, 50)
  };
}

// Find or suggest the best matching folder from existing folders
async function findBestFolder(folders, title, description, tags, source) {
  if (folders.length === 0) {
    return null;
  }
  
  const prediction = predictCategory(title, description, tags);
  
  // Try to find existing folder matching predicted category
  const matchingFolder = folders.find(folder => {
    const folderNameLower = folder.name.toLowerCase();
    const predictedLower = prediction.predictedCategory.toLowerCase();
    
    return folderNameLower.includes(predictedLower) || 
           predictedLower.includes(folderNameLower);
  });
  
  if (matchingFolder) {
    return {
      folder: matchingFolder,
      confidence: prediction.confidence,
      reason: `Matched with category: ${prediction.predictedCategory}`
    };
  }
  
  // If no match, suggest creating new folder
  return {
    folder: null,
    suggestedName: suggestFolderName(title, description, source),
    confidence: prediction.confidence,
    reason: `Suggested new folder based on content analysis`
  };
}

module.exports = {
  predictCategory,
  extractKeywords,
  detectSource,
  suggestHierarchicalFolder,
  findBestFolder,
  categoryKeywords,
  sourceKeywords
};
