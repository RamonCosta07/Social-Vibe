export interface IPostFormProps {
  onPost: (content: string, image?: File | null) => void;
}