export const Hero = () => {
  return (
    <section className="text-center pt-10 pb-16">
      <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
        Instant Pneumonia Detection from X-Rays
      </h2>
      <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
        Leverage Deep Learning (CNN) to quickly analyze chest X-ray images and
        assist in early diagnosis.
      </p>
      <div className="mt-10 flex justify-center">
        <a
          href="#uploader"
          className="px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-lg"
        >
          Start Analysis Now
        </a>
      </div>
    </section>
  );
};
