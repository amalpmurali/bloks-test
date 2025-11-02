import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmailOption {
  value: string;
  label: string;
  avatar?: string;
}

interface EmailMultiSelectProps {
  placeholder?: string;
  options: EmailOption[];
  value: EmailOption[];
  onChange: (value: EmailOption[]) => void;
  containerClassName?: string;
  inputClassName?: string;
}

export function EmailMultiSelect({
  placeholder = "Recipients",
  options = [],
  value = [],
  onChange,
  containerClassName,
  inputClassName,
}: EmailMultiSelectProps) {
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<EmailOption[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on input value and exclude already selected options
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredOptions([]);
    } else {
      const filtered = options.filter(
        (option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
          !value.some((v) => v.value === option.value)
      );
      setFilteredOptions(filtered);
    }
  }, [inputValue, options, value]);

  // Click outside to close options
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() !== "") {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Add email on Enter if it looks like an email
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();

      // Simple email validation
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);

      if (isValidEmail) {
        const newOption: EmailOption = {
          value: inputValue,
          label: inputValue,
        };

        onChange([...value, newOption]);
        setInputValue("");
      }
    }
    // Remove the last tag on Backspace if input is empty
    else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      const newValue = [...value];
      newValue.pop();
      onChange(newValue);
    }
  };

  const handleSelectOption = (option: EmailOption) => {
    onChange([...value, option]);
    setInputValue("");
    setShowOptions(false);
    inputRef.current?.focus();
  };

  const handleRemoveOption = (optionToRemove: EmailOption) => {
    onChange(value.filter((option) => option.value !== optionToRemove.value));
  };

  const handleAddManualEmail = () => {
    if (inputValue.trim() !== "") {
      // Simple email validation
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);

      if (isValidEmail) {
        const newOption: EmailOption = {
          value: inputValue,
          label: inputValue,
        };

        onChange([...value, newOption]);
        setInputValue("");
        setShowOptions(false);
      }
    }
  };

  return (
    <div className={cn("relative", containerClassName)}>
      <div className="flex flex-wrap items-center gap-1">
        {value.map((option) => (
          <div
            key={option.value}
            className="flex items-center gap-1.5 bg-muted text-muted-foreground text-sm rounded-full pl-3 pr-2 py-1"
          >
            <span>{option.label}</span>
            <button
              type="button"
              onClick={() => handleRemoveOption(option)}
              className="text-muted-foreground hover:text-foreground rounded-full"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={() => inputValue.trim() !== "" && setShowOptions(true)}
          placeholder={value.length === 0 ? placeholder : ""}
          className={cn("flex-1 outline-none min-w-[120px]", inputClassName)}
        />
      </div>

      {showOptions && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 z-50 w-full mt-1 bg-background rounded-md border shadow-md max-h-60 overflow-auto"
        >
          {filteredOptions.length > 0 ? (
            <div>
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center px-3 py-2 hover:bg-muted cursor-pointer"
                  onClick={() => handleSelectOption(option)}
                >
                  {option.avatar && (
                    <div className="w-6 h-6 rounded-full bg-muted-foreground mr-2" />
                  )}
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          ) : (
            inputValue.trim() !== "" && (
              <div
                className="flex items-center justify-between px-3 py-2 hover:bg-muted cursor-pointer"
                onClick={handleAddManualEmail}
              >
                <span>{`Add "${inputValue}"`}</span>
                <span className="text-sm text-muted-foreground">Enter ↵</span>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
