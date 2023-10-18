export default function Loading() {
  return (
    <div className="absolute top-[calc(50%-4.5rem)] left-[calc(50%-4.5rem)]">
      <div
        className="text-primary-color inline-block h-36 w-36 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      <span className="animate-bounce text-gray-500 whitespace-nowrap absolute top-[calc(50%-12px)] left-[calc(50%-44px)] ">
        Cargando...
      </span>
    </div>
  )
}
