/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `celiagomezdev`,
        icon: `src/images/favicon.png`,
      },
    },
    `gatsby-plugin-sass`
  ],
}
