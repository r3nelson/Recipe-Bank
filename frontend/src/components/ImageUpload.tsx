type ImageUploadProps = {
  file: File | null;
  setFile: (file: File | null) => void;
};

export default function ImageUpload({ file, setFile }: ImageUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="border mt-2 bg-gray-300">
      <label>
        {file ? `Image: ${file.name}` : "Upload Image"}
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
}
