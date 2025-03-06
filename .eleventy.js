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
  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Create a filtered collection of only published posts
  eleventyConfig.addCollection("publishedPosts", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("posts")
      .filter((post) => post.data.status === "published")
        });

// Create a filtered collection of only published posts
  eleventyConfig.addCollection("publishedPostsByCreationDate", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("publishedPosts")
      .sort((a, b) => {
        return new Date(a.data.created) - new Date(b.data.created);
      })
      .reverse(); // Most recent first


  // Create a filtered collection of modified content
  eleventyConfig.addCollection(
    "contentByModifiedDate",
    function (collectionApi) {
      return collectionApi
        .getAll()
        .filter((post) => post.data.status !== "draft")
        .sort((a, b) => {
          return new Date(a.data.modified) - new Date(b.data.modified);
        })
        .reverse(); // Most recent first
    },
  );

  // Create a filtered collection of photography
  eleventyConfig.addCollection("photography", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("photography")
      .filter((post) => post.data.status === "published")
      .reverse(); // Most recent first
  });

  // Add collection for tagged content
  //eleventyConfig.addCollection("tagList", function(collection) {
  //  const tagSet = new Set();
  //  collection.getAll().forEach(item => {
  //    if (item.data.tags) {
  //      item.data.tags.forEach(tag => tagSet.add(tag));
  //    }
  //  });
  //  return Array.from(tagSet).sort();
  //});

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
