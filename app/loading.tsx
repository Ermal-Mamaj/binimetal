export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        <p className="text-lg font-medium text-gray-700">Duke u ngarkuar...</p>
      </div>
    </div>
  )
}
