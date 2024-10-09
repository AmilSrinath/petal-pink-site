import Label from "components/Label/Label";
import React, { FC, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import Radio from "shared/Radio/Radio";

interface Props {
  isActive: boolean;
  onOpenActive: () => void;
  onCloseActive: () => void;
  setValidPaymentMethod: (isValid: boolean) => void;
}

const PaymentMethod: FC<Props> = ({ isActive, onOpenActive, onCloseActive, setValidPaymentMethod }) => {
  const [methodActive, setMethodActive] = useState<"Credit-Card" | "Internet-banking" | "Wallet">("Credit-Card");
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: "",
    nameOnCard: "",
    expirationDate: "",
    cvc: "",
  });

  // Validate Credit Card Details
  const validateCreditCard = () => {
    let tempErrors = {
      cardNumber: "",
      nameOnCard: "",
      expirationDate: "",
      cvc: "",
    };
    let isValid = true;

    if (!/^\d{16}$/.test(cardNumber)) {
      tempErrors.cardNumber = "Card number must be 16 digits.";
      isValid = false;
    }

    if (nameOnCard.trim() === "") {
      tempErrors.nameOnCard = "Name on card is required.";
      isValid = false;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
      tempErrors.expirationDate = "Expiration date must be in MM/YY format.";
      isValid = false;
    }

    if (!/^\d{3}$/.test(cvc)) {
      tempErrors.cvc = "CVC must be 3 digits.";
      isValid = false;
    }

    setErrors(tempErrors);
    setValidPaymentMethod(isValid);
    return isValid;
  };

  // Handle Save Button Click
  const handleSave = () => {
    if (methodActive === "Credit-Card" && validateCreditCard()) {
      onCloseActive();
    } else if (methodActive !== "Credit-Card") {
      setValidPaymentMethod(true);
      onCloseActive();
    }
  };

  // Render Internet Banking Method
  const renderInternetBanking = () => {
    const active = methodActive === "Internet-banking";
    return (
        <div className="flex items-start space-x-4 sm:space-x-6">
          <Radio
              className="pt-3.5"
              name="payment-method"
              id="Internet-banking"
              defaultChecked={active}
              onChange={() => setMethodActive("Internet-banking")}
          />
          <div className="flex-1">
            <label
                htmlFor="Internet-banking"
                className="flex items-center space-x-4 sm:space-x-6"
            >
              <div
                  className={`p-2.5 rounded-xl border-2 ${
                      active
                          ? "border-slate-600 dark:border-slate-300"
                          : "border-gray-200 dark:border-slate-600"
                  }`}
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6"
                >
                  <path
                      d="M3 12h4v4h2v-6h8v4h2v-4h2M7 16h2m-2-4h4v2h-4v-2zM12 8v2h2m4-2v4m-6 0h4v-2h-4"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                  />
                  <rect x="10" y="4" width="10" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/>
                  <rect x="3" y="14" width="7" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="6.5" cy="16" r="0.75" fill="currentColor"/>
                  <line x1="3" y1="15" x2="10" y2="15" stroke="currentColor" stroke-width="1.5"/>
                  <line x1="3" y1="17" x2="10" y2="17" stroke="currentColor" stroke-width="1.5"/>
                </svg>
              </div>
              <p className="font-medium">Cash on Delivery</p>
            </label>
          </div>
        </div>
    );
  };

  return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl">
        <div className="p-6 flex flex-col sm:flex-row items-start">
        <span className="hidden sm:block">
          <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M3.92969 15.8792L15.8797 3.9292"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.1013 18.2791L12.3013 17.0791"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.793 15.5887L16.183 13.1987"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.60127 10.239L10.2413 3.599C12.3613 1.479 13.4213 1.469 15.5213 3.569L20.4313 8.479C22.5313 10.579 22.5213 11.639 20.4013 13.759L13.7613 20.399C11.6413 22.519 10.5813 22.529 8.48127 20.429L3.57127 15.519C1.47127 13.419 1.47127 12.369 3.60127 10.239Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M2 21.9985H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
          <div className="sm:ml-8">
            <h3 className="text-slate-700 dark:text-slate-400 flex">
              <span className="uppercase tracking-tight">PAYMENT METHOD</span>
            </h3>
          </div>
          <ButtonSecondary
              sizeClass="py-2 px-4"
              fontSize="text-sm font-medium"
              className="bg-slate-50 dark:bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg"
              onClick={onOpenActive}
          >
            Change
          </ButtonSecondary>
        </div>
        <div className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-6 ${isActive ? "block" : "hidden"}`}>
          <div className="flex items-start space-x-4 sm:space-x-6">
            <Radio
                className="pt-3.5"
                name="payment-method"
                id="Credit-Card"
                defaultChecked={methodActive === "Credit-Card"}
                onChange={() => setMethodActive("Credit-Card")}
            />
            <div className="flex-1">
              <label
                  htmlFor="Credit-Card"
                  className="flex items-center space-x-4 sm:space-x-6"
              >
                <div
                    className={`p-2.5 rounded-xl border-2 ${
                        methodActive === "Credit-Card" ? "border-slate-600 dark:border-slate-300" : "border-gray-200 dark:border-slate-600"
                    }`}
                >
                <span className="hidden sm:block">
                  <svg
                      className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M3.92969 15.8792L15.8797 3.9292"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M11.1013 18.2791L12.3013 17.0791"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M13.793 15.5887L16.183 13.1987"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3.60127 10.239L10.2413 3.599C12.3613 1.479 13.4213 1.469 15.5213 3.569L20.4313 8.479C22.5313 10.579 22.5213 11.639 20.4013 13.759L13.7613 20.399C11.6413 22.519 10.5813 22.529 8.48127 20.429L3.57127 15.519C1.47127 13.419 1.47127 12.369 3.60127 10.239Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M2 21.9985H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                </div>
                <p className="font-medium">Debit / Credit Card</p>
              </label>

              <div className={`mt-6 mb-4 space-y-3 sm:space-y-5 ${methodActive === "Credit-Card" ? "block" : "hidden"}`}>
                <div className="max-w-lg">
                  <Label className="text-sm">Card number</Label>
                  <Input className="mt-1.5" type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                  {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                </div>
                <div className="max-w-lg">
                  <Label className="text-sm">Name on Card</Label>
                  <Input className="mt-1.5" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} />
                  {errors.nameOnCard && <p className="text-red-500 text-sm">{errors.nameOnCard}</p>}
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="sm:w-2/3">
                    <Label className="text-sm">Expiration date (MM/YY)</Label>
                    <Input className="mt-1.5" placeholder="MM/YY" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                    {errors.expirationDate && <p className="text-red-500 text-sm">{errors.expirationDate}</p>}
                  </div>
                  <div className="flex-1">
                    <Label className="text-sm">CVC</Label>
                    <Input className="mt-1.5" placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} />
                    {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {renderInternetBanking()}
          <ButtonPrimary onClick={handleSave}>
            Save and next to Shipping
          </ButtonPrimary>
        </div>
      </div>
  );
};

export default PaymentMethod;
