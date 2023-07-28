import Qrcode from "qrcode";

export const generateQrCode = (data = "") => {
  return Qrcode.toDataURL(JSON.stringify(data), { errorCorrectionLevel: "H" });
};
