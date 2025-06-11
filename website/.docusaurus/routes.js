import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
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
