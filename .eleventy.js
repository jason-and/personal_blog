const markdownIt = require("markdown-it");
const markdownItWikilinks = require("markdown-it-wikilinks");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // Configure Markdown processing
  const mdOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };

  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  const md = markdownIt(mdOptions)
    .use(
      markdownItWikilinks({
        uriSuffix: "",
        makeAllLinksAbsolute: true,
        postProcessPageName: (pageName) => {
          return pageName.toLowerCase().replace(/\s/g, "-");
        },
      }),
    )
    .use(markdownItAnchor);

  eleventyConfig.setLibrary("md", md);

  // Pass through copy for images and CSS
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");

  //for adding quarto content at a later time
  //eleventyConfig.addPassthroughCopy({
  //  "src/_quarto_output/**/*.html": "posts/quarto/",
  //  "src/_quarto_output/**/*.css": "assets/css/",
  //  "src/_quarto_output/**/*.js": "assets/js/",
  //  "src/_quarto_output/**/*.png": "assets/images/",
  //  "src/_quarto_output/**/*.jpg": "assets/images/"
  //});
  //

  // Add date filters
  // Add this to your .eleventy.js file
  eleventyConfig.addFilter("dateDisplay", function (dateStr) {
    if (!dateStr) return "";

    try {
      // Handle YYYY-MM-DD format specifically
      if (typeof dateStr === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        const [year, month, day] = dateStr
          .split("-")
          .map((num) => parseInt(num, 10));
        // Create date with local timezone (months are 0-based in JS)
        const date = new Date(year, month - 1, day);

        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }

      // Handle other date formats
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "";

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      console.error("Date error:", e);
      return "";
    }
  });

  eleventyConfig.addFilter("convertToDate", function (dateStr) {
    if (!dateStr) return new Date();

    // Handle YYYY-MM-DD format
    if (typeof dateStr === "string" && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateStr
        .split("-")
        .map((part) => parseInt(part, 10));
      return new Date(year, month - 1, day);
    }

    // Default case
    return new Date(dateStr);
  });

  eleventyConfig.addCollection("publishedPosts", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("posts")
      .sort(function (a, b) {
        return b.date - a.date;
      })
      .filter((post) => post.data.status === "published");
  });

  //  "publishedPostsByCreationDate",
  //  function (collectionApi) {
  //    return collectionApi
  //      .getFilteredByTag("publishedPosts")
  //      .sort((a, b) => {
  //        // Handle different field names for creation date
  //        const dateA =
  //          a.data.created || a.data["created date"] || a.data.date || a.date;
  //        const dateB =
  //          b.data.created || b.data["created date"] || b.data.date || b.date;
  //
  //        // Convert to Date objects for comparison (handles various formats)
  //        return new Date(dateA) - new Date(dateB);
  //      })
  //      .reverse(); // Most recent first
  //  },
  //);
  //
  // Create a filtered collection of modified content (excluding pages)
  eleventyConfig.addCollection(
    "contentByModifiedDate",
    function (collectionApi) {
      return collectionApi
        .getAll()
        .filter((item) => {
          // First check if the item has a data object
          if (!item.data) return false;

          // Skip items explicitly marked as page
          if (item.data.type === "page") return false;

          // Skip items without a title (like "Oops! Not Found")
          if (!item.data.title) return false;

          // Skip drafts
          if (item.data.status === "draft") return false;

          // Only include items with a valid modified date
          if (!item.data.modified) return false;

          // Try to create a valid date
          const modifiedDate = new Date(item.data.modified);
          if (isNaN(modifiedDate.getTime())) return false;

          return true;
        })
        .sort((a, b) => {
          // Sort by modified date
          const dateA = new Date(a.data.modified);
          const dateB = new Date(b.data.modified);
          return dateB - dateA; // Most recent first
        });
    },
  );

  // Add collection for backlinks
  eleventyConfig.addCollection("backlinks", function (collection) {
    const backlinks = {};
    collection.getAll().forEach((item) => {
      // Skip if no content
      if (!item.template.frontMatter.content) return;

      // Find all wikilinks in the content
      const matches =
        item.template.frontMatter.content.matchAll(/\[\[(.*?)\]\]/g);
      for (const match of matches) {
        const linkedTitle = match[1].toLowerCase().replace(/\s/g, "-");
        if (!backlinks[linkedTitle]) {
          backlinks[linkedTitle] = [];
        }
        backlinks[linkedTitle].push({
          url: item.url,
          title: item.data.title,
        });
      }
    });
    return backlinks;
  });

  // Configure directory structure
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
  };
};
