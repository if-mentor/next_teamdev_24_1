export type SearchFormProps = {
  searchAction: (formData: FormData) => Promise<void>;
  placeholder?: string;
  disabled?: boolean;
};
