// A more comprehensive representation of schema.org types and their common properties,
// including expected data types for validation.
export const schemaData = {
  "CreativeWork": {
    "properties": [
      { "name": "about", "type": "Text" },
      { "name": "author", "type": "Text" },
      { "name": "contributor", "type": "Text" },
      { "name": "dateCreated", "type": "Date" },
      { "name": "dateModified", "type": "Date" },
      { "name": "headline", "type": "Text" },
      { "name": "keywords", "type": "Text" },
      { "name": "publisher", "type": "Text" },
      { "name": "text", "type": "Text" },
      { "name": "version", "type": "Number" }
    ]
  },
  "Article": {
    "properties": [
      { "name": "articleBody", "type": "Text" },
      { "name": "articleSection", "type": "Text" },
      { "name": "wordCount", "type": "Number" },
      { "name": "author", "type": "Text" },
      { "name": "datePublished", "type": "Date" },
      { "name": "headline", "type": "Text" },
      { "name": "publisher", "type": "Text" }
    ]
  },
  "Book": {
    "properties": [
      { "name": "author", "type": "Text" },
      { "name": "bookEdition", "type": "Text" },
      { "name": "bookFormat", "type": "Text" },
      { "name": "illustrator", "type": "Text" },
      { "name": "isbn", "type": "Text" },
      { "name": "numberOfPages", "type": "Number" }
    ]
  },
  "Event": {
    "properties": [
      { "name": "name", "type": "Text" },
      { "name": "startDate", "type": "DateTime" },
      { "name": "endDate", "type": "DateTime" },
      { "name": "location", "type": "Text" },
      { "name": "performer", "type": "Text" },
      { "name": "offers", "type": "Text" },
      { "name": "eventStatus", "type": "Text" },
      { "name": "organizer", "type": "Text" }
    ]
  },
  "LocalBusiness": {
    "properties": [
      { "name": "name", "type": "Text" },
      { "name": "address", "type": "Text" },
      { "name": "telephone", "type": "Text" },
      { "name": "openingHours", "type": "Text" },
      { "name": "priceRange", "type": "Text" }
    ]
  },
  "Organization": {
    "properties": [
      { "name": "name", "type": "Text" },
      { "name": "url", "type": "URL" },
      { "name": "logo", "type": "URL" },
      { "name": "address", "type": "Text" },
      { "name": "contactPoint", "type": "Text" },
      { "name": "email", "type": "Email" },
      { "name": "telephone", "type": "Text" }
    ]
  },
  "Person": {
    "properties": [
      { "name": "name", "type": "Text" },
      { "name": "email", "type": "Email" },
      { "name": "telephone", "type": "Text" },
      { "name": "url", "type": "URL" },
      { "name": "jobTitle", "type": "Text" },
      { "name": "affiliation", "type": "Text" },
      { "name": "birthDate", "type": "Date" }
    ]
  },
  "Product": {
    "properties": [
      { "name": "name", "type": "Text" },
      { "name": "image", "type": "URL" },
      { "name": "description", "type": "Text" },
      { "name": "brand", "type": "Text" },
      { "name": "sku", "type": "Text" },
      { "name": "mpn", "type": "Text" },
      { "name": "offers", "type": "Text" }
    ]
  },
  "Recipe": {
    "properties": [
      { "name": "name", "type": "Text" },
      { "name": "recipeIngredient", "type": "Text" },
      { "name": "recipeInstructions", "type": "Text" },
      { "name": "cookTime", "type": "Text" },
      { "name": "prepTime", "type": "Text" },
      { "name": "totalTime", "type": "Text" },
      { "name": "recipeYield", "type": "Text" }
    ]
  },
  "WebSite": {
    "properties": [
      { "name": "name", "type": "Text" },
      { "name": "url", "type": "URL" },
      { "name": "potentialAction", "type": "Text" }
    ]
  },
  "FAQPage": {
    "properties": [
      { "name": "mainEntity", "type": "Text" }
    ]
  },
  "BreadcrumbList": {
    "properties": [
      { "name": "itemListElement", "type": "Text" },
      { "name": "itemListOrder", "type": "Text" },
      { "name": "numberOfItems", "type": "Number" }
    ]
  },
  "VideoObject": {
    "properties": [
      { "name": "name", "type": "Text" },
      { "name": "description", "type": "Text" },
      { "name": "thumbnailUrl", "type": "URL" },
      { "name": "uploadDate", "type": "Date" },
      { "name": "duration", "type": "Text" },
      { "name": "contentUrl", "type": "URL" }
    ]
  },
  "ImageObject": {
    "properties": [
      { "name": "name", "type": "Text" },
      { "name": "contentUrl", "type": "URL" },
      { "name": "caption", "type": "Text" },
      { "name": "exifData", "type": "Text" }
    ]
  }
};
