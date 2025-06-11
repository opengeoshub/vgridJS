// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import {themes as prismThemes} from 'prism-react-renderer';
const lightCodeTheme = prismThemes.nightOwlLight;
const darkCodeTheme = prismThemes.nightOwl;

const {resolve} = require('path');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VgridJS',
  tagline: 'Vgrid DGGS JS',
  url: 'https://vgrid.vn',
  baseUrl: '/vgridjs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/images/vgrid.svg',
  organizationName: 'opengeoshub', // Usually your GitHub org/user name.
  projectName: 'vgridjs', // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../docs',
          sidebarPath: resolve('./src/docs-sidebar.js'),
          // Point to to the website directory in your repo.
          editUrl: 'https://github.com/opengeoshub/vgridjs/tree/master/website'
        },
        theme: {
          customCss: [
            resolve('./src/styles.css'),
            resolve('./node_modules/maplibre-gl/dist/maplibre-gl.css')
          ]
        }
      })
    ]
  ],

  plugins: [
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'VgridJS',
        logo: {
          alt: 'VgridJS Logo',
          src: 'images/vgrid.svg',
          srcDark: 'images/vgrid.svg'
        },
        items: [
          {
            to: '/docs',
            position: 'left',
            label: 'About'
          },
          {
            href: 'https://github.com/opengeoshub/vgridjs',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Resources',
            items: [
              {
                label: 'API Reference',
                to: '/docs/api-reference/'
              }
            ]
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/opengeoshub/vgridjs'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Vgrid contributors`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;
