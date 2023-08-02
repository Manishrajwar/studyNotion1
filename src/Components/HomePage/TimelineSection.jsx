import logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "../../assets/Images/TimelineImage.png";

function TimelineSection() {
  const timeline = [
    {
      Logo: logo1,
      heading: "Leadership",
      Description: "Fully commited to the success company",
    },
    {
      Logo: logo2,
      heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: logo3,
      heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: logo4,
      heading: "Solve the problem",
      Description: "code your way to a solution",
    },
  ];

  return (
    <div className="w-full flex lg:flex-row flex-col  timelineSection gap-10 items-center ">
      {/* left part */}
      <div className="flex flex-col timelineLogoSection  lg:w-[45%]">
        {timeline.map((element, index) => {
          return (
            <div key={index} className="flex gap-4">
              {/* left */}
              <div>
                <div className="w-12 h-12 bg-[#FFFFFF] rounded-full flex items-center justify-center">
                  <img loading="lazy" src={element.Logo} alt="" />
                </div>
                <div
                  className={` ${
                    index === 3
                      ? ""
                      : "h-14 w-1 text-black  mx-auto border-r-2 border-dotted"
                  } `}
                ></div>
              </div>

              {/* right */}
              <div className="flex flex-col w-[80%]">
                <h3 className="font-bold text-lg">{element.heading}</h3>
                <p className="text-sm">{element.Description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* right part */}
      <div className="relative timelineRight lg:w-[45%]  shadow-blue-200">
        <img loading="lazy" style={{
            boxShadow:
              "15px 15px 0px 5px white , -8px -11px 30px -14px   rgb(173, 216, 230)",
          }}
          src={TimelineImage}
          alt="TimelineImage"
          className="shadow-white object-fit object-cover h-fit"
        />

        <div className="absolute left-[50%]  translate-x-[-50%] translate-y-[-50%] bg-caribbeangreen-700 flex timelineImageText lg:flex-row flex-col text-white uppercase py-10">
          {/* left */}
          <div className="flex gap-5 items-center timelineImageTextLine lg:border-r border-caribbeangreen-300 px-7">
            <p className="text-3xl font-bold">10</p>
            <p className="text-caribbeangreen-300 text-sm">
              Years of Experience
            </p>
          </div>
          {/* right */}
          <div className="flex gap-5 items-center px-7">
            <p className="text-3xl font-bold">250</p>
            <p className="text-caribbeangreen-300 text-sm">Types of Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSection;
