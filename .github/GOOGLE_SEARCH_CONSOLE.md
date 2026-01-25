# Google Search Console Setup

## Verification Token Setup

The `index.html` file includes a placeholder for Google Search Console verification:

```html
<meta name="google-site-verification" content="GOOGLE_VERIFICATION_TOKEN_HERE" />
```

## How to Add Your Verification Token

1. **Get Your Verification Token** from Google Search Console:
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Click "Add property"
   - Enter your site URL: `https://animeshkundu.github.io`
   - Choose "HTML tag" verification method
   - Copy the `content` value from the meta tag provided

2. **Update index.html**:
   - Find line 17 in `index.html`
   - Replace `GOOGLE_VERIFICATION_TOKEN_HERE` with your actual token
   - Example: `<meta name="google-site-verification" content="abc123xyz456..." />`

3. **Deploy**:
   - Commit and push the change
   - The verification token will be included in your production build
   - Return to Google Search Console and click "Verify"

## Existing SEO Setup

Your site already includes comprehensive SEO meta tags:
- ✅ Primary meta tags (title, description, keywords, author, robots)
- ✅ Open Graph tags for social sharing (Facebook, LinkedIn)
- ✅ Twitter Card tags for rich previews
- ✅ Canonical URL
- ✅ Schema.org structured data (Person, WebSite, SoftwareApplication, FAQPage)
- ✅ Sitemap reference
- ✅ AI crawler policy (ai.txt)

Once verified with Google Search Console, your site will be indexed and appear in Google search results.
