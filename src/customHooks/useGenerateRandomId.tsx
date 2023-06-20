const useGenerateRandomId = () => {
    const randomNumber = Math.random() * 1000000; // 
    const randomId = Math.floor(randomNumber).toString(); // 
    return randomId;
};
  
export default useGenerateRandomId;