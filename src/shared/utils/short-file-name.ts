export function shortFileName(fileName: string): string {
  if (fileName.length > 20) {
    const ext = fileName.split('.').pop();
    const name = ext ? fileName.split(ext)[0] : fileName;
    return `${name.slice(0, 15)}...${name.slice(-6)}${ext || ''}`;
  }
  return fileName;
}
