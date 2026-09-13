import { Loader } from "@/components/status/Loader"

/**
 * Renders the loader shown while a page is loading.
 *
 * @returns The full-size loader.
 */
export default function Loading() {
  return (
    <div className="h-full w-full flex flex-col">
      <Loader />
    </div>
  )
}
