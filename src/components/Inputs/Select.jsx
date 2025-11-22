import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";


const Select = ({ id, label, options = [], value, onChange, selectClass=true, isInputDiffer = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const rootRef = useRef(null);
  const optionRefs = useRef([]);
  const baseId = id || (label ? label.toString().replace(/\s+/g, "-").toLowerCase() : "select");
  const pluralizeSeater = (number) => `${number} Seater`; // simple JSX helper

  // Normalize to { value, label } for rendering in JSX, but keep numeric value for backend
  const normalizedOptions = options.map((opt) => {
    if (opt && typeof opt === "object" && "value" in opt && "label" in opt) return opt;
    if (typeof opt === "number") {
      const text = label === "seatingCapacity" ? pluralizeSeater(opt) : String(opt);
      return { value: opt, label: text };
    }
    return { value: opt, label: String(opt) };
  }); // [web:3][web:11]

  // Close when clicking outside
  useEffect(() => {
    const onDocMouseDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsOpen(false);
        setHighlightIndex(-1);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const handleSelect = (opt) => {
    onChange(opt.value); // pass numeric/string value only
    setIsOpen(false);
    setHighlightIndex(-1);
    setSearchTerm("");
  };

  // Search by label; also allow exact numeric match on value
  const filteredOptions = normalizedOptions.filter((opt) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase().trim();
    if (opt.label.toLowerCase().includes(term)) return true;
    if (typeof opt.value === "number" && term === String(opt.value)) return true;
    return false;
  }); // [web:3][web:11]

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Tab":
        setIsOpen(false);
        return;
      case "Escape":
        setIsOpen(false);
        setHighlightIndex(-1);
        setSearchTerm("");
        e.preventDefault();
        return;
      case " ":
      case "Enter":
        e.preventDefault();
        if (isOpen && highlightIndex >= 0) handleSelect(filteredOptions[highlightIndex]);
        else setIsOpen(true);
        return;
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setHighlightIndex((i) =>
          filteredOptions.length ? (i + 1) % filteredOptions.length : -1
        );
        return;
      case "ArrowUp":
        e.preventDefault();
        setIsOpen(true);
        setHighlightIndex((i) =>
          filteredOptions.length ? (i <= 0 ? filteredOptions.length - 1 : i - 1) : -1
        );
        return;
      default:
    }
  }; // [web:3]

  // Auto-scroll highlighted option into view
  useEffect(() => {
    if (highlightIndex >= 0 && optionRefs.current[highlightIndex]) {
      optionRefs.current[highlightIndex].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightIndex]); // [web:9]

  let selectLabel = "";
  switch (label) {
    case "carType":
      selectLabel = "Car Type";
      break;
    case "transmission":
      selectLabel = "Transmission Type";
      break;
    case "seatingCapacity":
      selectLabel = "Seating Capacity";
      break;
    case "fuleType":
      selectLabel = "Fule Type";
      break;
    case "airConditioning":
      selectLabel = "Is Air Condition Available?";
      break;
    default:
      selectLabel = label ? label.charAt(0).toUpperCase() + label.slice(1) : "";
  }

  // Find the display label for the current numeric value
  const selectedOpt =
    normalizedOptions.find((o) => o.value === value) || null; // [web:3]

  return (
    <div className="w-full relative" ref={rootRef}>
      {label && (
        <label htmlFor={baseId} className={`${isInputDiffer ? 'text-secondary-700' : 'text-md'} text-secondary-300 font-semibold`}>
          {selectLabel}
        </label>
      )}

      <div
        id={baseId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${baseId}-listbox`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen((o) => !o)}
        className={` ${!isInputDiffer ? 'bg-gray-100 px-5 py-4 focus:outline focus:outline-2 focus:outline-netural-500 focus:bg-white' : 'py-1 text-sm'} scrollbar-hide rounded-md mt-1 cursor-pointer flex justify-between items-center transition `}
      >
        {isOpen ? (
          <input
            autoFocus
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900"
            placeholder={`Search ${selectLabel || "option"}`}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className={value === null ? "text-gray-900" : "text-gray-500"}>
            {selectedOpt ? selectedOpt.label : `Select ${selectLabel || "option"}`}
          </span>
        )}
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div
          id={`${baseId}-listbox`}
          role="listbox"
          tabIndex={-1}
          className={`absolute top-[120%] scrollbar-hide z-10 mt-2 w-fit bg-white rounded-xl p-2 flex flex-col gap-1 shadow-lg border border-gray-200 max-h-80 overflow-auto`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, index) => (
              <div
                key={opt.value}
                id={`${baseId}-opt-${index}`}
                role="option"
                aria-selected={value === opt.value}
                ref={(el) => (optionRefs.current[index] = el)}
                onMouseDown={() => handleSelect(opt)}
                className={`px-4 py-2 cursor-pointer scrollbar-hide flex ${isInputDiffer ?  'justify-start text-nowrap items-center gap-3 min-w-[150px]' : 'justify-between items-center'} rounded-lg transition ${highlightIndex === index ? "bg-blue-100" : "hover:bg-blue-50"
                  }`}
              >
                <span>{opt.label}</span>
                {value === opt.value && <Check className="w-4 h-4 text-blue-600" />}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
