import { forwardRef, Ref } from 'react';

interface SelectProps {
  label: string;
  options: string[];
}

//TODO: Przy pierwszym renderze nie wyswietla defaultValue

const Select = forwardRef((props: SelectProps, ref: Ref<HTMLSelectElement>) => {
  const options = props.options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <label className="label input">
      {props.label}
      <select ref={ref} defaultValue="Choose here">
        <option value="" disabled hidden>
          Choose here
        </option>
        {options}
      </select>
    </label>
  );
});

export default Select;
