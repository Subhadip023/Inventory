import Select from "react-select";

export default function TaxMultiSelect({
    label = "Select Tax",
    options = [],
    value = [],
    onChange,
    error = null,
    placeholder = "Select taxes...",
    isMulti = true, 
}) {

    const selectedValues = options.filter(option =>
        value.includes(option.value)
    );

    return (
        <div className="my-4">
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <Select
                isMulti={isMulti}
                options={options}
                value={selectedValues}
                onChange={(selectedOptions) => {
                    const values = selectedOptions
                        ? selectedOptions.map(o => o.value)
                        : [];
                    onChange(values);
                }}
                placeholder={placeholder}
                classNamePrefix="react-select"
            />

            {error && (
                <p className="text-sm text-red-600 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}
