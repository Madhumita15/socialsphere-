"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { memo } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Textarea } from "./ui/textarea";

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

const DynamicInput = <T extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
  required,
  loading,
  placeholder,
}: DynamicInputProps<T>) => {
  return (
    <div className="space-y-2 ">
      <Label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">
        {required ? (
          <>
            {label}
            <span className="text-red-500 ml-1">*</span>
          </>
        ) : (
          label
        )}
      </Label>
      {type === "text" ? (
        <Input
          disabled={loading}
          placeholder={placeholder}
          type={type}
          {...register(name)}
          className="bg-zinc-900 border-zinc-700 text-white transition-all duration-200 
                           hover:border-zinc-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
        />
      ) : (
        <Textarea
          disabled={loading}
          placeholder={placeholder}
          rows={3}
          {...register(name)}
          className="bg-zinc-900 border-zinc-700 text-white transition-all duration-200 
                           hover:border-zinc-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

const MemoizedDynamicInput = memo(DynamicInput) as typeof DynamicInput;

export default MemoizedDynamicInput;
