import snapshot from './snapshots/repositories.json';
import surfacesSnapshot from './snapshots/surfaces.json';

export const repositoriesAsOf = snapshot.asOf;
export const repositoriesSourceUrl = snapshot.sourceUrl;
export const repositories = snapshot.repositories;

export const surfacesAsOf = surfacesSnapshot.asOf;
export const surfacesSourceUrl = surfacesSnapshot.sourceUrl;
export const sameOriginSurfaces = surfacesSnapshot.surfaces;
export const featuredSurfaces = sameOriginSurfaces.filter(
  (surface) => surface.featured && !surface.excluded,
);
