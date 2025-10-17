export const Features = () => {
  return (
    <section className="text-center pt-4 pb-10">
      <h3 className="text-3xl font-bold text-gray-800 mb-10">Key Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Feature 1: Instant Analysis */}
        <div className="p-6 border rounded-lg shadow-md bg-white">
          {/* <span className="text-4xl font-bold text-indigo-600">⚡️</span> */}
          <h4 className="mt-3 text-xl font-semibold text-gray-900">
            Rapid, Instant Analysis
          </h4>
          <p className="mt-2 text-gray-600">
            Upload any chest X-ray image and receive a preliminary diagnosis in
            seconds, accelerating the decision-making process.
          </p>
        </div>

        {/* Feature 2: High Confidence/Accuracy */}
        <div className="p-6 border rounded-lg shadow-md bg-white">
          {/* <span className="text-4xl font-bold text-indigo-600">🧠</span> */}
          <h4 className="mt-3 text-xl font-semibold text-gray-900">
            High-Confidence AI Model
          </h4>
          <p className="mt-2 text-gray-600">
            Powered by a **Convolutional Neural Network** (CNN) trained on a
            large dataset for robust and reliable image classification.
          </p>
        </div>

        {/* Feature 3: Accessibility/Ease of Use */}
        <div className="p-6 border rounded-lg shadow-md bg-white">
          {/* <span className="text-4xl font-bold text-indigo-600">📲</span> */}
          <h4 className="mt-3 text-xl font-semibold text-gray-900">
            Universal Accessibility
          </h4>
          <p className="mt-2 text-gray-600">
            Use the application seamlessly from any modern web browser or mobile
            device—no complex software installation required.
          </p>
        </div>
      </div>
    </section>
  );
};
