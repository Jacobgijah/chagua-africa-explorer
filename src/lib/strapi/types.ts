export type StrapiCollectionResponse<T> = {
  data: Array<StrapiEntity<T>>;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

// Strapi v4: { id, attributes: {...} }
// Strapi v5: { id, ...fields }
export type StrapiEntity<T> =
  | { id: number; attributes: T }
  | ({ id: number } & T);

export function entityAttrs<T>(entity: StrapiEntity<T>): T {
  // v4 -> entity.attributes, v5 -> entity itself
  return (entity as any).attributes ?? (entity as any);
}
