import { useState } from "react";
import { HomePageExplore } from "../../data/homepage-explore";
import HighlightText from "./HighlightText";
import { BsFillPersonFill } from "react-icons/bs";
import { GiFamilyTree } from "react-icons/gi";

function ExploreMore() {
  const tabsName = [
    "Free",
    "New to coding",
    "Most Popular",
    "Skill paths",
    "Career paths",
  ];

  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
  const setMyCard = (value) => {
    setCurrentTab(tabsName[value]);
    setCourses(HomePageExplore[value]);
  };

  return (
    <div className="w-full flex flex-col items-center mb-10 gap-5">
      <div className="flex flex-col gap-[8px] items-center">
        <p className="text-[36px]">
          Unlock the <HighlightText text={"Power of Code"} />{" "}
        </p>
        <p className="text-richblack-300">
          Learn to Build Anything You Can Imagine
        </p>
      </div>

      {/* this is for nav bar */}
      <div>
        <div className="flex flex-wrap gap-3 translate-y-14 bg-richblack-800 px-4 py-2 rounded-full">
          {tabsName.map((tab , index) => {
            return (
              <div key={index}
                onClick={() =>{ 
                    setCurrentTab(tab);
                 let cards = HomePageExplore.filter((course)=> course.tag === tab);
                 setCourses(cards[0].courses);
                 setCurrentCard(cards[0].courses[0].heading);
                 
                }}
                className={`${
                  currentTab === tab ? "bg-richblack-900" : ""
                }  rounded-full px-5 py-2 cursor-pointer`}
              >
                {tab}
              </div>
            );
          })}
        </div>
      </div>
      {/* /three cards */}
      <div className="lg:flex gap-10 translate-y-36 exploreMoreCards">
        {courses.map((card , index) => {
          return (
          
            <div key={index} onClick={()=>setCurrentCard(card.heading)}  className={`flex ${currentCard===card.heading?('bg-white shadow-lg bg-yellow text-black'):('')}  flex-col gap-14 bg-richblack-800 lg:w-[28%]  lg:max-w-1/3 p-5 cursor-pointer`} style={currentCard === card.heading ? { boxShadow:"10px 10px 0px 5px rgba(255, 214, 10, 1) "} : {}}>
              <div className="flex flex-col gap-2">
                <p className="font-bold text-2xl">{card.heading}</p>
                <p className="text-richblack-400 w-[90%]">{card.description}</p>
              </div>

              <div className="flex flex-col gap-4">
                {/* for line */}
                <div className="w-full h-[1px] border-t-2 border-richblack-50 border-dashed"></div>
                {/* two icons with text */}
                <div className={`flex justify-between ${currentCard===card.heading?('text-blue-500'):('')}`}>
                  {/* left part */}
                  <div className="flex gap-2 items-center">
                    <BsFillPersonFill />
                    <p>{card.level}</p>
                  </div>
                  {/* rigth part */}
                  <div className="flex gap-2 items-center">
                    <GiFamilyTree />
                    <p>{card.lessionNumber} Lessons</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExploreMore;
