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
        path: `${__dirname}/content/blog`, // This should point to the directory where your markdown files are located.
      },
    },
    `gatsby-transformer-remark`,
  ],
}
