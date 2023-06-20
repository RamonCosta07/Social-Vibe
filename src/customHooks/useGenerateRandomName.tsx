const useGenerateRandomName = (originalName: string): string  => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = originalName.split('.').pop();
    const randomName = `${randomString}-${timestamp}.${fileExtension}`;
    return randomName;
}
  
export default useGenerateRandomName;