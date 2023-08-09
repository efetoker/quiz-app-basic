// add isWhite prop to change color of title
export default function PageTitle({ isWhite = false }) {
    return (
        <div className={`w-full flex justify-center text-4xl font-bold z-10 ${isWhite ? 'text-white' : 'text-[#374CB7]'}`}>
            Quiz App
        </div>
    )
  }