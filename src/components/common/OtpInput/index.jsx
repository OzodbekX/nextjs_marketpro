import ReactOtpInput from "react-otp-input";

const OtpInput = ({ value, onChange }) => {
  value = value || "";
  onChange = onChange ? onChange : () => {};

  return (
    <ReactOtpInput
      value={value}
      onChange={onChange}
      containerStyle={{
        display: "flex",
        justifyContent: "space-between",
      }}
      inputStyle={{
        boxSizing: "content-box",
        fontSize: "32px",
        padding: "6px 12px",
        borderWidth: "1px",
      }}
    />
  );
};

export default OtpInput;
