import { useSelector } from "react-redux"
import IconButton from "../../Common/IconButton";

function RenderTotalAmount(){
    const {total , cart} = useSelector((state)=>state.cart);

    const handleBuyCourse = ()=>{
 const courses = cart.map((course)=>course._id);
 console.log(courses);

//  todo:api integrated -> payment gateway
    }

    return (
        <div>
         <p>Total:</p>
         <p>Rs {total} </p>

         <IconButton text={'Buy Now'} onclick={handleBuyCourse} customClasses={'w-full justify-center'} />
        </div>
    )
}

export default RenderTotalAmount