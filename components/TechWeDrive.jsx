import { tect_data } from '@/lib/data/techDrive'

const TechWeDrive = () => {
  return (
    <section className="mt-16">
      <svg
        className="w-full"
        height="119"
        viewBox="0 0 1624 119"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 59.5L541.333 29.75L1082.67 0L1624 59.5V119H1082.67H541.333H0V59.5Z"
          fill="#170A59"
        />
      </svg>
      <div className="bg-[#170A59] py-16 px-8 text-white -mt-12 md:-mt-6 ">
        <h2 className="px-5 mb-16 space-x-3 text-4xl ">
          Technology we Drive.
        </h2>
        <div className="container px-4 mx-auto">
          {tect_data.map((item, i) => (
            <div key={item.id} className="flex flex-col items-center gap-8 mb-16 md:flex-row">
              {i % 2 === 0 ? (
                <>
                  <img
                    src={item.img}
                    alt={item.headTxtBold}
                    width={384}
                    height={384}
                    className="rounded-lg shadow-lg fade-left"
                  />
                  <div className="space-y-4 md:ml-8 fade-right">
                    <h3 className="text-3xl font-bold">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                        {item.headTxtBold}
                      </span>{' '}
                      <span className="text-sky-50">{item.headTxtNormal}</span>
                    </h3>
                    <p className="text-lg text-sky-50">{item.content}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4 md:mr-8 fade-left">
                    <h3 className="text-3xl font-bold">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                        {item.headTxtBold}
                      </span>{' '}
                      <span className="text-sky-50">{item.headTxtNormal}</span>
                    </h3>
                    <p className="text-lg text-sky-50">{item.content}</p>
                  </div>
                  <img
                    src={item.img}
                    alt={item.headTxtBold}
                    width={384}
                    height={384}
                    className="rounded-lg shadow-lg fade-right"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <svg
        className="w-full -mt-12 rotate-180 md:-mt-5"
        height="119"
        viewBox="0 0 1624 119"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 59.5L541.333 29.75L1082.67 0L1624 59.5V119H1082.67H541.333H0V59.5Z"
          fill="#170A59"
        />
      </svg>
    </section>

  )
}

export default TechWeDrive
