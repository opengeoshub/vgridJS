import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '0bc'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'a95'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '55c'),
            routes: [
              {
                path: '/docs',
                component: ComponentCreator('/docs', '3fd'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/api-reference',
                component: ComponentCreator('/docs/api-reference', '9cc'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/api-reference/hierarchy',
                component: ComponentCreator('/docs/api-reference/hierarchy', '4d7'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/api-reference/indexing',
                component: ComponentCreator('/docs/api-reference/indexing', 'fba'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/api-reference/miscellaneous',
                component: ComponentCreator('/docs/api-reference/miscellaneous', 'd4c'),
                exact: true
              },
              {
                path: '/docs/motivation',
                component: ComponentCreator('/docs/motivation', '1a1'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/technical/cell-area',
                component: ComponentCreator('/docs/technical/cell-area', '558'),
                exact: true
              },
              {
                path: '/docs/technical/dggs',
                component: ComponentCreator('/docs/technical/dggs', 'eab'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/technical/index-encoding',
                component: ComponentCreator('/docs/technical/index-encoding', '0bf'),
                exact: true
              },
              {
                path: '/docs/technical/platonic-solids',
                component: ComponentCreator('/docs/technical/platonic-solids', 'f20'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/docs/technical/the-pentagon-that-could',
                component: ComponentCreator('/docs/technical/the-pentagon-that-could', '5a4'),
                exact: true,
                sidebar: "sidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '070'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
