require('dotenv').config({
  path: `.env`,
})


/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: 'blog',
    description: 'Ramblings of Jakob Serlier',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`, // This points to the directory where your markdown files are located.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Specify that you want to highlight Python specifically (although it will highlight other languages too if they're present)
              languages: ["python"],

              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              inlineCodeMarker: null,

              // This lets you set up language aliases.
              aliases: {},

              // Additional settings can be added as per your requirements.
            },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
}
