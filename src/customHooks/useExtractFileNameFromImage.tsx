function useExtractFileNameFromImageUrl(imageUrl: string): string | null {
  const urlWithoutParams = imageUrl.split("?")[0];
  const urlParts = urlWithoutParams.split("/");
  const fileName = urlParts[urlParts.length - 1];
  return fileName ? decodeURIComponent(fileName) : null;
}

export default useExtractFileNameFromImageUrl;
