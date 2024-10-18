import { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; // for form validation purpose only, not for UI validation (use Input's required prop)
};

function FormInput({
  label,
  name,
  type,
  defaultValue,
  placeholder,
  onChange,
  required = false,
}: FormInputProps) {
  return (
    <div className="mb-2">
      {label && (
        <Label htmlFor={name} className="capitalize">
          {label}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
    </div>
  );
}
export default FormInput;
