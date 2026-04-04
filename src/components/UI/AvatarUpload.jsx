import { useEffect, useState } from "react";
import trash from "../../assets/trash.png";
import Button from "./Button";

export default function AvatarUpload({ onChange, onRemove, error, file }) {
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
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-medium text-[#0A0A0A]">
        Upload Avatar
      </label>

      {!file && (
        <label
          className={`flex items-center justify-center h-35 cursor-pointer border-[#D1D1D1] rounded-lg border-[1.5px] bg-[#F8F8F8] text-center  ${
            error && "border-red-500"
          }`}
        >
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .webp"
            onChange={onChange}
            className="hidden"
          />

          <div className="text-[#4A4A4A]">
            <p className="text-[16px]">
              Drag and drop or{" "}
              <span className="text-[#4F46E5] underline font-medium">
                Upload file
              </span>
            </p>

            <p className="mt-2 text-[14px] text-[#A0A0A0]">JPG, PNG or WebP</p>
          </div>
        </label>
      )}

      {file && (
        <div className="mt-2 flex items-center gap-3">
          <img
            src={previewUrl}
            alt="Selected avatar preview"
            className="h-16 w-16 rounded-full object-cover"
          />

          <p className="text-[12px] text-[#666666]">{file.name}</p>

          <Button type="button" onClick={onRemove} className="w-10 h-10">
            <img src={trash} alt="trash bin" />
          </Button>
        </div>
      )}

      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
