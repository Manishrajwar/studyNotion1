import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import GetAvgRating  from "../../utils/avgRating";
import RatingStars from "../Common/RatingStars"

function Course_Card({course , height}){

    const [avgReviewCount , setAvgReviewCount] = useState(0);
    useEffect(()=>{
 const count = GetAvgRating(course.ratingAndReviews);
  setAvgReviewCount(count);
    },[course])

    return (
       <div>
        <Link to={`/courses/${course._id}`} >
        <div>
            <div>
                <img src={`${course?.thumbnail}`} alt="" className={`${height} w-full rounded-xl object-cover`} />

            </div>
            <div>
                <p>{course?.courseName}</p>
                <p>{course?.instrutor?.firstName} {course?.instrutor?.lastName}</p>
                <div>
                    <span>{avgReviewCount || 0}</span>
                    <RatingStars Review_Count={avgReviewCount}  />
                    <span>{course?.ratingAndReviews?.length} Ratings</span>
                </div>
                <p>{course?.price}</p>
            </div>
        </div>
        </Link>
       </div>
    )
}

export default Course_Card;