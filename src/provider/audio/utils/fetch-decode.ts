export async function fetchDecode(url: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return buffer;
}
