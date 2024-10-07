import Label from "components/Label/Label";
import React, { FC, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";

interface Props {
  isActive: boolean;
  onOpenActive: () => void;
  onCloseActive: () => void;
  setValidShippingAddress: (isValid: boolean) => void;
}

const ShippingAddress: FC<Props> = ({ isActive, onOpenActive, onCloseActive, setValidShippingAddress }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [aptSuite, setAptSuite] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Sri Lanka");
  const [stateProvince, setStateProvince] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    stateProvince: "",
  });

  const validate = () => {
    let tempErrors = {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      stateProvince: "",
    };
    let isValid = true;

    if (!firstName.trim()) {
      tempErrors.firstName = "First name is required.";
      isValid = false;
    }

    if (!lastName.trim()) {
      tempErrors.lastName = "Last name is required.";
      isValid = false;
    }

    if (!address.trim()) {
      tempErrors.address = "Address is required.";
      isValid = false;
    }

    if (!city.trim()) {
      tempErrors.city = "City is required.";
      isValid = false;
    }

    if (!stateProvince.trim()) {
      tempErrors.stateProvince = "State/Province is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    setValidShippingAddress(isValid);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onCloseActive();
    }
  };

  return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl">
        <div className="p-6 flex flex-col sm:flex-row items-start">
        <span className="hidden sm:block">
          <svg className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.14008 6.75L5.34009 8.55L7.14008 10.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.8601 6.75L18.6601 8.55L16.8601 10.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="uppercase tracking-tight">SHIPPING ADDRESS</span>
            </h3>
          </div>
          <ButtonSecondary sizeClass="py-2 px-4 " fontSize="text-sm font-medium" className="bg-slate-50 dark:bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg" onClick={onOpenActive}>
            Change
          </ButtonSecondary>
        </div>
        <div className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${isActive ? "block" : "hidden"}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
            <div>
              <Label className="text-sm">First name</Label>
              <Input className="mt-1.5" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div>
              <Label className="text-sm">Last name</Label>
              <Input className="mt-1.5" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>
          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
            <div className="flex-1">
              <Label className="text-sm">Address</Label>
              <Input className="mt-1.5" value={address} onChange={(e) => setAddress(e.target.value)} />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            <div className="sm:w-1/3">
              <Label className="text-sm">Apt, Suite</Label>
              <Input className="mt-1.5" value={aptSuite} onChange={(e) => setAptSuite(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
            <div>
              <Label className="text-sm">City</Label>
              <Input className="mt-1.5" value={city} onChange={(e) => setCity(e.target.value)} />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
            <div>
              <Label className="text-sm">Country</Label>
              <Select className="mt-1.5" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="Sri Lanka">Sri Lanka</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
            <div>
              <Label className="text-sm">State/Province</Label>
              <Input className="mt-1.5" value={stateProvince} onChange={(e) => setStateProvince(e.target.value)} />
              {errors.stateProvince && <p className="text-red-500 text-sm">{errors.stateProvince}</p>}
            </div>
          </div>
          <ButtonPrimary onClick={handleSubmit}>Save and next to Payment</ButtonPrimary>
        </div>
      </div>
  );
};

export default ShippingAddress;
