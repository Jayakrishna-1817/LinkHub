const axios = require('axios');
const cheerio = require('cheerio');

// Extract metadata from URL
async function extractLinkMetadata(url) {
  try {
    const metadata = {
      title: '',
      description: '',
      thumbnail: '',
      source: 'other',
      tags: [],
      additionalInfo: {}
    };

    // Detect source from URL
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      metadata.source = 'youtube';
      return await extractYouTubeMetadata(url, metadata);
    } else if (url.includes('github.com')) {
      metadata.source = 'github';
      return await extractGitHubMetadata(url, metadata);
    } else if (url.includes('medium.com')) {
      metadata.source = 'medium';
    } else if (url.includes('twitter.com') || url.includes('x.com')) {
      metadata.source = 'twitter';
    } else if (url.includes('stackoverflow.com')) {
      metadata.source = 'stackoverflow';
    } else if (url.includes('reddit.com')) {
      metadata.source = 'reddit';
    }

    // Generic metadata extraction
    return await extractGenericMetadata(url, metadata);
  } catch (error) {
    console.error('Metadata extraction error:', error.message);
    return {
      title: url,
      description: '',
      thumbnail: '',
      source: 'other',
      tags: [],
      additionalInfo: {}
    };
  }
}

// Extract YouTube metadata
async function extractYouTubeMetadata(url, metadata) {
  try {
    // Use YouTube oEmbed API (official, won't get rate limited)
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    
    console.log('🎥 Fetching YouTube metadata via oEmbed...');
    const response = await axios.get(oembedUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkHubBot/1.0)'
      }
    });

    if (response.data) {
      metadata.title = response.data.title || 'YouTube Video';
      metadata.description = ''; // oEmbed doesn't provide description
      metadata.thumbnail = response.data.thumbnail_url || '';
      
      console.log('✅ YouTube oEmbed success:', { 
        title: metadata.title,
        titleLength: metadata.title?.length 
      });

      // Extract tags from title
      const titleText = (metadata.title || '').toLowerCase();
      const techKeywords = ['react', 'javascript', 'python', 'java', 'node', 'angular', 'vue', 'typescript', 'css', 'html', 'docker', 'kubernetes', 'aws', 'azure', 'ai', 'ml', 'dsa', 'algorithm', 'data structure'];
      
      metadata.tags = techKeywords.filter(keyword => titleText.includes(keyword));
    }

    return metadata;
  } catch (error) {
    console.error('❌ YouTube oEmbed failed:', error.message);
    
    // Fallback: Try direct scraping with minimal headers
    try {
      console.log('🔄 Trying fallback scraping...');
      const response = await axios.get(url, {
        timeout: 8000,
        headers: { 
          'User-Agent': 'Mozilla/5.0 (compatible; LinkHubBot/1.0)'
        }
      });
      
      const html = response.data;
      const $ = cheerio.load(html);

      metadata.title = $('meta[property="og:title"]').attr('content') || 
                       $('meta[name="title"]').attr('content') ||
                       $('title').text().replace(' - YouTube', '') ||
                       '';
      
      // Try to extract from JSON in page
      if (!metadata.title || metadata.title.length < 5) {
        const titleMatch = html.match(/"title":"([^"]+)"/);
        if (titleMatch && titleMatch[1]) {
          metadata.title = titleMatch[1].replace(/\\u0026/g, '&').replace(/\\"/g, '"');
        }
      }

      metadata.description = $('meta[property="og:description"]').attr('content') || '';
      metadata.thumbnail = $('meta[property="og:image"]').attr('content') || '';

      console.log('✅ Fallback scraping result:', { 
        title: metadata.title,
        titleLength: metadata.title?.length 
      });
    } catch (fallbackError) {
      console.error('❌ Fallback also failed:', fallbackError.message);
    }

    return metadata;
  }
}

// Extract GitHub metadata
async function extractGitHubMetadata(url, metadata) {
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const $ = cheerio.load(response.data);

    metadata.title = $('meta[property="og:title"]').attr('content') || 
                     $('title').text() || 'GitHub Repository';
    metadata.description = $('meta[property="og:description"]').attr('content') || '';
    metadata.thumbnail = $('meta[property="og:image"]').attr('content') || '';

    // Extract programming languages
    const topics = [];
    $('[data-octo-click="topic"]').each((i, elem) => {
      topics.push($(elem).text().trim());
    });
    metadata.tags = topics;

    return metadata;
  } catch (error) {
    return metadata;
  }
}

// Extract generic metadata
async function extractGenericMetadata(url, metadata) {
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 5000
    });
    const $ = cheerio.load(response.data);

    metadata.title = $('meta[property="og:title"]').attr('content') || 
                     $('meta[name="title"]').attr('content') ||
                     $('title').text() || 
                     url;
    
    metadata.description = $('meta[property="og:description"]').attr('content') || 
                          $('meta[name="description"]').attr('content') || '';
    
    metadata.thumbnail = $('meta[property="og:image"]').attr('content') || '';

    return metadata;
  } catch (error) {
    metadata.title = url;
    return metadata;
  }
}

module.exports = {
  extractLinkMetadata
};
