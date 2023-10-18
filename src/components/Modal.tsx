export default function Modal({
  children,
  show,
  setShowEditModal,
  className,
}: {
  children?: any
  show?: boolean
  setShowEditModal?: any
  className?: string
}) {
  function closeModal() {
    setShowEditModal(false)
  }
  return (
    show && (
      <>
        <div className="fixed z-10 left-0 top-0 w-full h-full bg-black opacity-80"></div>
        <div
          className={
            "fixed z-20 left-[10%] top-[35%] bg-white p-3 border border-solid border-[#888] w-4/5 max-h-[80%] rounded-lg overflow-auto " +
            className
          }
        >
          <span
            onClick={closeModal}
            className="text-gray-900 float-right -mt-3 text-4xl font-bold hover:text-primary-color hover:cursor-pointer focus:text-black focus:cursor-pointer"
          >
            &times;
          </span>
          {children}
        </div>
      </>
    )
  )
}
