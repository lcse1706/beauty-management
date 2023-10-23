import { ComponentProps, forwardRef, Ref } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
    label: string;
    type: string;
    register?: UseFormRegisterReturn<string>;
}

export const Input = forwardRef(
    (
        props: ComponentProps<'input'> & InputProps,
        ref: Ref<HTMLInputElement>,
    ) => {
        return (
            <div className={`flex flex-col space-y-2 ${props.className} input`}>
                <label className="text-sm font-medium text-gray-300">
                    {props.label}
                </label>
                <input
                    ref={ref}
                    type={props.type}
                    onChange={props.onChange}
                    value={props.value}
                    {...props.register}
                    className="text-black w-[300px] border rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
                />
            </div>
        );
    },
);

Input.displayName = 'forwardRef (Input)';
