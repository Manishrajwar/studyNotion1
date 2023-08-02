import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformationForm";
import CoursePublishForm from "./CoursePublishForm";
import CourseBuilderForm from "./CourseBuilderForm";
import React from "react";

function RenderStep() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "course Information",
    },
    {
      id: 2,
      title: "course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex flex-row justify-between ">
          {steps.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <div>
                  <div
                    className={`${
                      step === item.id
                        ? "bg-yellow-900 border-yellow-50 text-yellow-50  "
                        : "border-richblack-700 bg-richblack-800 text-richblack-300 "
                    } w-10 h-10 flex items-center justify-center rounded-full ${step > item.id?('bg-yellow-25'):('')} `}
                  >
                    {step > item.id ?  <FaCheck className="text-black" /> : item.id}
                  </div>
                </div>
                <div
                  className={` ${
                    item.id === 3
                      ? ""
                      : "w-full h-[1px] border mt-5 border-dashed border-b-white"
                  }  `}
                ></div>
              </React.Fragment>
            );
          })}
        </div>

        {/* down title  */}
        <div className="flex flex-row justify-between">
          {steps.map((item, index) => {
            return (
              <div key={index}>
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm  />}
      {
        step === 3 && <CoursePublishForm />
      }
    </div>
  );
}

export default RenderStep;
