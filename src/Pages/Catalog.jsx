import { useParams } from "react-router-dom";
import Footer from "../Components/Common/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../services/serverHelper";
import { categories } from "../services/api";
import { useSelector } from "react-redux";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import CourseSlider from "../Components/Catalog/CourseSlider";
import Course_Card from "../Components/Catalog/Course_Card";

function Catalog() {

    const {catalogName} = useParams();

    const {token} = useSelector((state)=>state.auth);

    const [catalogPageData , setCatalogPageData] = useState(null);
    const [categoryId , setCategoryId] = useState("");

    // fetch all category 
    useEffect(()=>{
      console.log("you run");
     const getCategoryDetails = async()=>{
        // all categories will get 
         const response = await makeAuthenticatedGETRequest(categories.CATEGORIES_API , token);
 console.log("response of showAllCategory" ,response);

         const category_id = response?.data.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()=== catalogName)[0];
         console.log("categoryid" , category_id._id);

         setCategoryId(category_id._id);

        }
        getCategoryDetails();
    } , [catalogName])


    useEffect(()=>{
     const getCategoryDetails = async()=>{
      console.log("i run ");
      try{
        const res = await getCatalogPageData(categoryId , token);
        console.log("res" , res);
        setCatalogPageData(res);
      }catch(error){
console.log(error);
      }
     }

     getCategoryDetails();
    },[categoryId])

  

  return (
    <div className="text-white">
      <div>
        <p>{`Home / Catalog `} 
        <span>{catalogPageData?.selectedCategory?.name}</span> </p>
        <p>{catalogPageData?.selectedCategory?.name}</p>
        <p>{catalogPageData?.selectedCategory?.description}</p>
      </div>

      <div>
        {/* section1  */}
        <section>
          <div>Courses to get you started</div>
          <div className="flex gap-x-3">
            <p>Most Popular </p>
            <p>New</p>
          </div>
          <div>

          <CourseSlider courses = {catalogPageData?.selectedCategory?.course} />
          </div>
        </section>

        {/* sction 2 */}
        <section>
          <p>Top Courses in {catalogPageData?.selectedCategory?.name} </p>
          <div>
          <CourseSlider courses = {catalogPageData?.differentCategory?.course} />
          </ div>
        </section>

        {/* section 3 */}
        <section>
            <p>Frequently Bought </p>
            <div className="py-8 ">

              <div className="grid grid-cols-1 lg:grid-cols-2 ">
{
  catalogPageData?.mostSellingCourses?.slice(0,4).map((course , index)=>(
    <Course_Card course={course} key={index} height={"h-[400px]"} />
  ))
}
              </div>

            </div>

        </section>

      </div>

      <Footer/>
    </div>
  );
}

export default Catalog;
