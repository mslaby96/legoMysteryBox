import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SendFigure } from "../../shared/Api";
import { useAppStateContext } from "../../AppContext/AppContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

interface MyInputTypes {
  firstName: string;
  surname: string;
  phoneNumber: number;
  email: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  state: string;
  zipCode: number;
}

const ShipmentDetails = () => {
  const { appState, dispatchAppState } = useAppStateContext();

  let navigate = useNavigate();

  yup.setLocale({
    mixed: {
      required: "This field is required",
      notType: "This field is required",
    },
    string: {
      matches: "Provide a valid phone number",
    },
  });

  let schema = yup.object({
    firstName: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup
      .string()
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
      )
      .required(),
    dateOfBirth: yup.date().required().min(new Date(1900, 0, 1)),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zipCode: yup.number().required(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<MyInputTypes>({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) =>
    SendFigure(appState.selectedFigure, data)
      .then(() => navigate("/", { replace: true }))
      .catch((err) => toast.error(err));

  return (
    <div className="shipmentDetails">
      <h1>SHIPPING DETAILS</h1>

      <form
        id="shipment-form"
        onSubmit={handleSubmit(onSubmit)}
        className="shipmentDetails-form-container"
      >
        <div className="shipmentDetails-input-container">
          <div className="shipmentDetails-form-input">
            <input {...register("firstName")} placeholder="Name" />
            {errors.firstName && (
              <p className="shipmentDetails-form-error">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="shipmentDetails-form-input">
            <input {...register("surname")} placeholder="Surname" />
            {errors.surname && (
              <p className="shipmentDetails-form-error">
                {errors.surname.message}
              </p>
            )}
          </div>
        </div>
        <input {...register("phoneNumber")} placeholder="Phone Number" />
        {errors.phoneNumber && (
          <p className="shipmentDetails-form-error">
            {errors.phoneNumber.message}
          </p>
        )}
        <input {...register("email")} placeholder="Email" />
        {errors.email && (
          <p className="shipmentDetails-form-error">{errors.email.message}</p>
        )}
        <input
          type="date"
          {...register("dateOfBirth")}
          placeholder="Date Of Birth"
        />
        {errors.dateOfBirth && (
          <p className="shipmentDetails-form-error">
            {errors.dateOfBirth.message}
          </p>
        )}
        <input {...register("address")} placeholder="Address" />
        {errors.address && (
          <p className="shipmentDetails-form-error">{errors.address.message}</p>
        )}
        <input {...register("city")} placeholder="City" />
        {errors.city && (
          <p className="shipmentDetails-form-error">{errors.city.message}</p>
        )}
        <div className="shipmentDetails-input-container">
          <div className="shipmentDetails-form-input">
            <input {...register("state")} placeholder="State" />
            {errors.state && (
              <p className="shipmentDetails-form-error">
                {errors.state.message}
              </p>
            )}
          </div>
          <div className="shipmentDetails-form-input">
            <input {...register("zipCode")} placeholder="Zip Code" />
            {errors.zipCode && (
              <p className="shipmentDetails-form-error">
                {errors.zipCode.message}
              </p>
            )}
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ShipmentDetails;
