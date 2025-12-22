'use client';

/**
 * Button Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button text content
 * @param {React.ReactNode} props.icon - Optional icon element
 * @param {string} props.variant - Button variant: 'primary', 'secondary', 'outline'
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.type - Button type: 'button', 'submit', 'reset'
 */
export default function Button({
  children,
  icon,
  variant = 'primary',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) {
  const baseStyles = `
    min-w-[154px] min-h-[44px]
    px-[18px] py-[10px]
    rounded-[50px]
    border border-[#DADADA7A]
    backdrop-blur-[4px]
    flex items-center justify-center
    gap-2
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    cursor-pointer
  `;

  const variantStyles = {
    primary: 'bg-white/10 text-white hover:bg-white/20',
    secondary: 'bg-[#1a3a2a]/80 text-white hover:bg-[#1a3a2a]',
    outline: 'bg-transparent text-white hover:bg-white/10',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={{
        backdropFilter: 'blur(4px)',
      }}
      {...props}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
}

