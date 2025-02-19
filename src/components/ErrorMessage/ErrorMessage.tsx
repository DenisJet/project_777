import { TriangleIcon } from "lucide-react";

export default function ErrorMessage({ error }: { error: string }) {
  return (
    <div
      className="mb-4 flex w-full items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <TriangleIcon className="size-4 text-red-500" />
      <span className="sr-only">Error</span>
      <div>{error}</div>
    </div>
  );
}
