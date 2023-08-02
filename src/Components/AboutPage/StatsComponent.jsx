

const stats = [
    {
        count:"5K"  ,
        label:"Active Students",
    },
    {
        count:"10+"  ,
        label:"Mentors",
    },
    {
        count:"200+"  ,
        label:"Courses",
    },
    {
        count:"50+"  ,
        label:"Awards",
    },
]

function StatsComponent(){
    return (
        <div className="gap-5 max-w-maxContent w-11/12 mx-auto text-center max-h-[254px] h-[254px] flex lg:flex-row  items-center justify-center">
            <div className="sm:flex lg:flex-row statsComponent lg:gap-[200px] md:gap-[100px] gap-[50px]">

         { 
            stats.map((stat , index)=>{
                return (
                    <div key={index} className="" >
                        <h1 className="font-bold text-2xl">{stat.count}</h1>
                        <h2 className="font-semibold text-richblack-500"> {stat.label}</h2>
                    </div>
                )
            })
        }
        </div>
        </div>
    )
}

export default StatsComponent;