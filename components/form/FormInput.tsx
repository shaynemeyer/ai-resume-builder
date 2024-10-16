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
};

function FormInput({
  label,
  name,
  type,
  defaultValue,
  placeholder,
  onChange,
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
        required
        onChange={onChange}
      />
    </div>
  );
}
export default FormInput;
