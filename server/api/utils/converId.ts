export function convertId(doc: any) {
  const { _id, ...rest } = doc;
  return {
    id: _id.toString(),
    ...rest
  };
}