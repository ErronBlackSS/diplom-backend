export async function findAsync<T>(
  arr: T[],
  asyncCallback: (t: T) => Promise<boolean>,
): Promise<T | undefined> {
  const promises = arr.map(asyncCallback);
  const results = await Promise.all(promises);
  const index = results.findIndex((result) => result);
  return arr[index];
}
