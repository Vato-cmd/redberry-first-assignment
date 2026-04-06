import { useEffect, useState } from "react";
import trash from "../../assets/trash.png";
import uploadicon from "../../assets/upload-icon.png";
import Button from "./Button";

export default function AvatarUpload({
  onChange,
  onRemove,
  error,
  file,
  disabled = false,
}) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="flex flex-col">
      <label className="text-[14px] mb-3 font-medium text-[#3D3D3D]">
        Upload Avatar
      </label>

      {!file && (
        <label
          className={`flex flex-col items-center justify-center h-35 cursor-pointer border-[1.5px] border-[#D1D1D1] rounded-lg bg-[#F8F8F8] text-center  
            ${error && "text-[#F4161A] border-[#F4161A]"}
            ${disabled ? "opacity-50 pointer-events-none" : "cursor-pointer"}
            `}
        >
          <img
            src={uploadicon}
            alt="upload icon"
            className="w-8.5 h-8.5 mb-2"
          />
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .webp"
            onChange={onChange}
            className="hidden"
            disabled={disabled}
          />

          <div className="text-[#4A4A4A]">
            <p className="text-[16px]">
              Drag and drop or{" "}
              <span className="text-[#281ED2] underline underline-offset-[25%] font-medium">
                Upload file
              </span>
            </p>

            <p className="mt-1.5 text-[12px] text-[#ADADAD]">
              JPG, PNG or WebP
            </p>
          </div>
        </label>
      )}

      {file && (
        <div
          className={`mt-2 flex items-center gap-3 rounded-lg border-[1.5px] p-3 h-35
        ${error ? "border-[#F4161A]" : "border-[#1DC31D]"} 
        ${disabled ? "opacity-50" : ""}`}
        >
          <img
            src={previewUrl}
            alt="Selected avatar preview"
            className="h-16 w-16 rounded-full object-cover"
          />
          <div className="flex flex-col flex-1">
            <p className="text-[12px] text-[#666666]">{file.name}</p>
            <p className="text-[12px] text-[#666666]">
              Size - {(file.size / (1024 * 1024)).toFixed(2)}MB
            </p>
            <label className="text-[12px] text-[#5950e6] font-semibold underline underline-offset-[25%] hover:text-[#2017bd] cursor-pointer">
              Change
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .webp"
                onChange={onChange}
                className="hidden"
                disabled={disabled}
              />
            </label>
          </div>
          <Button type="button" onClick={onRemove} className="w-10 h-10">
            <img src={trash} alt="trash bin" />
          </Button>
        </div>
      )}

      {error && <p className="text-[12px] text-[#F4161A]">{error}</p>}
    </div>
  );
}
