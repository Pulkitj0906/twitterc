interface InputProps{
    placeholder?: string,
    value?: string,
    type?: string,
    disabled?: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    type,
    disabled,
    onChange
}) => {
  return (
      <input
          disabled={disabled}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={type}
          className="
          w-full
          p-2
          align-text-center
          e-4
          text-lg
          border-2
          border-neutral-800
          rounded-md
          outline-none
          text-white
          focus:border-sky-500
          focus:border-2
          transition
          disabled:
          ${disabled ? ' bg-neutral-900' : ' bg-black'}
          disabled:opacity-70
          disabled: cursor-not-allowed
          "
      />
  )
};

export default Input;
