import A5Preview from '/images/a5-preview.png';

# Introduction
  
A5 is implemented in TypeScript and is available as a [library](https://www.npmjs.com/package/a5-js), with [API documentation here](/docs/api-reference/). It is [open source](https://github.com/felixpalmer/a5) and licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0.txt).

<img src={A5Preview} style={{width: "100%", maxWidth: "800px"}}/>

## Benefits over alternative systems

Like other [DGGSs](/docs/technical/dggs), A5 can be used for indexing, spatial joins, and other spatial operations. The appropriate choice of DGGS will depend on the use case, the key strengths of A5 over other similar indexing systems are:

- Uniform cell sizes group spatial features without introducing bias due to unequal cell sizes.
- Very high resolution of 30mm² at final resolution level, encoded as a 64-bit integer. 
- Minimal distortion of cell areas across the globe.

## Geometric Construction

[DGGSs](/docs/technical/dggs) are generally based on a planar cell tiling which is applied to the sides of a [platonic solid](/docs/technical/platonic-solids), before being projected onto a sphere.

A5 is unique in that it uses a pentagonal tiling of a dodecahedron. The [pentagon chosen](/docs/technical/the-pentagon-that-could) for the tiling is equilateral, but not regular - unlike other common DGGSs which use regular polygons, for example [HTM](https://www.microsoft.com/en-us/research/wp-content/uploads/2005/09/tr-2005-123.pdf) uses triangles, [S2](https://s2geometry.io/) uses squares, and [H3](https://h3geo.org/) uses hexagons.

The benefit of choosing a dodecahedron is that it is the platonic solid with the lowest vertex curvature, and by this measure it is the most spherical of all the platonic solids. This is key for minimizing cell distortion as the process of projecting a platonic solid onto a sphere involves warping the cell geometry to force the vertex curvature to approach zero. Thus, the lower the original vertex curvature, the less distortion will be introduced by the projection.