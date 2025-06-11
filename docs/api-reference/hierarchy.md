# Hierarchy

The A5 tiling system supports subdividing the world all the way from a single cell for the whole planet to milimeter-scale leaf cells.

The cells are arranged in a logical hierarchy, with each cell having an integer resolution. Each cell has exactly 4 child cells, at the next resolution level, and one parent cell at the previous resolution level.

Naturally the single resolution 0 cell, representing the whole world has no parent and similarly leaf cells no children.

### getResolution

Returns the resolution of an A5 cell

```ts
function getResolution(index: bigint): number;
```

#### Parameters

- `index` **(bigint)** A5 cell identifier

#### Return value

- **(number)** The resolution level of the cell

### cellToParent

Returns the parent cell of an A5 cell. 

```ts
function cellToParent(index: bigint, parentResolution?: number): bigint;
```

#### Parameters

- `index` **(bigint)** A5 cell identifier
- `parentResolution` **(number, optional)** By default one level coarser than input resolution.

#### Return value

- **(bigint)** The parent cell identifier

### cellToChildren

Returns the child cells of an A5 cell.

```ts
function cellToChildren(index: bigint, childResolution?: number): bigint[];
```

#### Parameters

- `index` **(bigint)** A5 cell identifier
- `childResolution` **(number, optional)** By default one level finer than input resolution.

#### Return value

- **(bigint[])** Array of child cell identifiers
