import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-900 text-white px-4 sm:px-6 lg:px-8">
      {/* Text Section */}
      <div className="flex flex-col items-center text-center md:w-1/2 space-y-4 max-w-lg">
        <p className="text-yellow-500 text-sm font-semibold uppercase">Hello!</p>
        <h1 className="text-4xl sm:text-5xl font-bold">I'm Tank Prasad Awasthi</h1>
        <p className="text-yellow-500 text-lg sm:text-xl font-semibold">Engineer</p>
        <p className="text-gray-400 text-base sm:text-lg">A Full Stack Developer</p>
        <a
          href="/resume.pdf"
          download="Tank_Prasad_Awasthi_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-yellow-500 text-black font-semibold py-2 px-8 rounded-full hover:bg-yellow-600 transition"
        >
          Resume
        </a>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-yellow-500 shadow-xl">
          <Image
            src="/myphoto.png"
            alt="Tank Prasad Awasthi"
            layout="fill"
            objectFit="contain" // Ensures image is not zoomed or cropped
            priority
          />
        </div>
      </div>
    </div>
  );
}