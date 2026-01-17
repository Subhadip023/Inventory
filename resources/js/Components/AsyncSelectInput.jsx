import AsyncSelect from 'react-select/async';

const AsyncSelectInput = ({
  loadOptions,
  value = null,
  onChange,
  placeholder = 'Select...',
  isMulti = false,
  isClearable = true,
  isDisabled = false,
  defaultOptions = true,
  cacheOptions = true,
  className = '',
  styles = {},
}) => {
  return (
    <AsyncSelect
      cacheOptions={cacheOptions}
      defaultOptions={defaultOptions}
      loadOptions={loadOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isMulti={isMulti}
      isClearable={isClearable}
      isDisabled={isDisabled}
      className={className}
      styles={styles}
    />
  );
};

export default AsyncSelectInput;
