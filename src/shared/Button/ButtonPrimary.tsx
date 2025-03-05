import Button, { ButtonProps } from "shared/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
                                                       className = "",
                                                       disabled = false,
                                                       ...args
                                                     }) => {
  return (
      <Button
          className={`
        ttnc-ButtonPrimary 
        ${
              disabled
                  ? "opacity-50 cursor-not-allowed bg-slate-400 dark:bg-slate-700"
                  : "bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl"
          }
        ${className}
      `}
          disabled={disabled} // Pass the disabled prop to the base Button component
          {...args}
      />
  );
};

export default ButtonPrimary;