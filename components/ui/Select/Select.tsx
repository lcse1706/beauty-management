import { ComponentProps, forwardRef, Ref } from 'react';
import './select.css';

interface SelectProps {
  label: string;
  options: string[];
  register?: any;
}

export const Select = forwardRef((props: ComponentProps<'select'> & SelectProps, ref: Ref<HTMLSelectElement>) => {
  const options = props.options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <div className={`flex flex-col space-y-2 ${props.className} select`}>
      <label className="text-sm font-medium text-gray-300">{props.label}</label>
      <select
        ref={ref}
        defaultValue="Choose here"
        {...props.register}
        className="border rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
      >
        <option value="" disabled hidden>
          Choose here
        </option>
        {options}
      </select>
    </div>
  );
});

Select.displayName = 'forwardRed (Select)';
