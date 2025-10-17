export const UploadImage = ({
  handleFileUpload,
  isLoading,
  fileName,
  getResultText,
}: {
  handleFileUpload: any;
  isLoading: boolean;
  fileName: string;
  getResultText: any;
}) => {
  return (
    <section
      id="uploader"
      className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-2xl border border-indigo-200"
    >
      <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Upload Your Chest X-Ray
      </h3>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-indigo-500 transition duration-200">
        {/* SVG Icon */}
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>

        <label
          htmlFor="file-upload"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          <span className="cursor-pointer relative bg-white rounded-md font-semibold text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            Click to upload an image
          </span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            accept="image/png, image/jpeg"
            className="sr-only"
            onChange={handleFileUpload}
            disabled={isLoading}
          />
        </label>
        <p className="mt-1 text-xs text-gray-500">
          {fileName || "PNG, JPG, or JPEG (Max 10MB)"}
        </p>
      </div>

      {/* Analysis Result Display */}
      <div className="mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-300">
        <p className="font-semibold text-gray-800">
          Analysis Result: {getResultText()}
        </p>
      </div>
    </section>
  );
};
