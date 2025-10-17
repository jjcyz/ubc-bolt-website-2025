import { ButtonProps } from "../types";

function Button({ text, onClick, outline, type = 'button' }: ButtonProps) {
  const baseClasses = "bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full cursor-pointer text-sm font-semibold font-inter uppercase tracking-wide transition-all duration-200 flex items-center gap-2 whitespace-nowrap hover:bg-white/30";
  const outlineClasses = outline ? "bg-white/10 backdrop-blur-md text-white hover:bg-white/20" : "bg-white/30 backdrop-blur-md text-white hover:bg-white/40";

  return (
    <button
      type={type}
      className={`${baseClasses} ${outlineClasses}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
