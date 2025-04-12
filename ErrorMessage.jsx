import { AlertCircle } from "lucide-react"

export default function ErrorMessage({ message }) {
  if (!message) return null

  return (
    <div className="w-full max-w-md mx-auto mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start">
      <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
      <p>{message}</p>
    </div>
  )
}
