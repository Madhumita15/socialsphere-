import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface DynamicInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  register: UseFormRegister<T>;
  error?: string;
  required: boolean;
  loading: boolean;
  placeholder: string;
}