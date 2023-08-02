import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import {AiFillStar ,AiOutlineStar} from "react-icons/ai"
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../reducer/slices/cartSlice";


function RenderCartCourses() {
    const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  return (
    <div>
      {cart.map((course, index) => {
        return (
          <div key={index}>
            <div>
              <img src={course?.thumbnail} alt="" />
              <div>
                <p>{course?.courseName}</p>
                <p>{course?.category?.name}</p>
                <div>
                    {/* todo: make api call  */}
                    <span>4.8</span>
                    <ReactStars count={5} size={false} edit={false} activeColor='#ffd700'
                    emptyIcon={<AiOutlineStar/>}
                    fullIcon={<AiFillStar/>}  />

                    <span>{course?.ratingAndReviews?.length} Ratings</span>
                </div>
              </div>
            </div>

             <div>
                <button onClick={()=>dispatch(removeFromCart(course._id))}>
                 <RiDeleteBin6Line/>
                 <span>Remove</span>
                </button>

                <p>Rs {course?.price}</p>
             </div>
          </div>
        );
      })}
    </div>
  );
}

export default RenderCartCourses;
