import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/vgridjs/docs',
    component: ComponentCreator('/vgridjs/docs', 'e5d'),
    routes: [
      {
        path: '/vgridjs/docs',
        component: ComponentCreator('/vgridjs/docs', '87f'),
        routes: [
          {
            path: '/vgridjs/docs',
            component: ComponentCreator('/vgridjs/docs', '5bc'),
            routes: [
              {
                path: '/vgridjs/docs',
                component: ComponentCreator('/vgridjs/docs', '963'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/vgridjs/docs/api-reference',
                component: ComponentCreator('/vgridjs/docs/api-reference', '24b'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/vgridjs/docs/api-reference/hierarchy',
                component: ComponentCreator('/vgridjs/docs/api-reference/hierarchy', '9e3'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/vgridjs/docs/api-reference/indexing',
                component: ComponentCreator('/vgridjs/docs/api-reference/indexing', '2fe'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/vgridjs/docs/api-reference/miscellaneous',
                component: ComponentCreator('/vgridjs/docs/api-reference/miscellaneous', 'fe9'),
                exact: true
              },
              {
                path: '/vgridjs/docs/motivation',
                component: ComponentCreator('/vgridjs/docs/motivation', '436'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/vgridjs/docs/technical/cell-area',
                component: ComponentCreator('/vgridjs/docs/technical/cell-area', 'ee9'),
                exact: true
              },
              {
                path: '/vgridjs/docs/technical/dggs',
                component: ComponentCreator('/vgridjs/docs/technical/dggs', '2de'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/vgridjs/docs/technical/index-encoding',
                component: ComponentCreator('/vgridjs/docs/technical/index-encoding', '66c'),
                exact: true
              },
              {
                path: '/vgridjs/docs/technical/platonic-solids',
                component: ComponentCreator('/vgridjs/docs/technical/platonic-solids', 'b9a'),
                exact: true,
                sidebar: "sidebar"
              },
              {
                path: '/vgridjs/docs/technical/the-pentagon-that-could',
                component: ComponentCreator('/vgridjs/docs/technical/the-pentagon-that-could', '428'),
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
    path: '/vgridjs/',
    component: ComponentCreator('/vgridjs/', 'a7c'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
