export default function ErrorPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800">500</h1>
          <p className="text-2xl text-gray-600 mt-4">Internal Server Error</p>
          <p className="mt-4 text-gray-500">
            Sorry, something went wrong on our end.
          </p>
          <a href="/" className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go back home
          </a>
        </div>
      </div>
    );
  }
  