// add isWhite prop to change color of title
export default function PageTitle({ isWhite = false, isSmall = false }) {
    return (
        <div className={`w-full flex justify-center font-bold z-10 ${isWhite ? 'text-white' : 'text-[#374CB7]'} ${isSmall ? 'text-xl' : 'text-4xl'}`}>
            Quiz App
        </div>
    )
  }