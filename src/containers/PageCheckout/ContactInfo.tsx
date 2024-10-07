import Label from "components/Label/Label";
import React, { FC, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";

interface Props {
  isActive: boolean;
  onOpenActive: () => void;
  onCloseActive: () => void;
  setValidContactInfo: (isValid: boolean) => void;
}

const ContactInfo: FC<Props> = ({ isActive, onOpenActive, onCloseActive, setValidContactInfo }) => {
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    phone1: "",
    phone2: "",
    email: "",
  });

  const validate = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    let tempErrors = {
      phone1: "",
      phone2: "",
      email: "",
    };

    if (!phoneRegex.test(phone1)) {
      tempErrors.phone1 = "Please enter a valid phone number (10 digits).";
      isValid = false;
    }

    if (!phoneRegex.test(phone2)) {
      tempErrors.phone2 = "Please enter a valid phone number (10 digits).";
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    setErrors(tempErrors);
    setValidContactInfo(isValid);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onCloseActive();
    }
  };

  return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row items-start p-6 ">
          <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
          </svg>
          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="uppercase tracking-tight">CONTACT INFO</span>
            </h3>
          </div>
          <ButtonSecondary
              sizeClass="py-2 px-4 "
              fontSize="text-sm font-medium"
              className="bg-slate-50 dark:bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg"
              onClick={onOpenActive}
          >
            Change
          </ButtonSecondary>
        </div>
        <div
            className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
                isActive ? "block" : "hidden"
            }`}
        >
          <div className="max-w-lg">
            <Label className="text-sm">Your phone number 1</Label>
            <Input
                className="mt-1.5"
                placeholder={"07XXXXXXXX"}
                type={"tel"}
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
            />
            {errors.phone1 && <p className="text-red-500 text-sm">{errors.phone1}</p>}
          </div>
          <div className="max-w-lg">
            <Label className="text-sm">Your phone number 2</Label>
            <Input
                className="mt-1.5"
                placeholder={"07XXXXXXXX"}
                type={"tel"}
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
            />
            {errors.phone2 && <p className="text-red-500 text-sm">{errors.phone2}</p>}
          </div>
          <div className="max-w-lg">
            <Label className="text-sm">Email address</Label>
            <Input
                className="mt-1.5"
                placeholder={"nimalrathnayaka@gmail.com"}
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <ButtonPrimary onClick={handleSubmit}>
            Save and next to Shipping
          </ButtonPrimary>
        </div>
      </div>
  );
};

export default ContactInfo;
