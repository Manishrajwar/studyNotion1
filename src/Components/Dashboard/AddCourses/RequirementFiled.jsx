import { useEffect, useState } from "react";

function RequirementField({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);


  useEffect(()=>{
  register(name , {
    required:true ,
    // validate:(value)=>value.length>0
  })
  },[])

  useEffect(()=>{
 setValue(name , requirementList);
  },[requirementList])

  const handleAddRequirement = () => {
    if(requirement) {
        setRequirementList([...requirementList, requirement]);
        //setRequirement("");
    }
}

const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
}

  return (
    <div className="text-black">
      <label htmlFor={name} className="text-white">
        {" "}
        {label} <sup>*</sup>{" "}
      </label>
      <div>
        <input
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50  "
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul className="flex flex-col gap-2 text-white "  >
          {requirementList.map( (requirement, index) => (
            <li key={index} className="flex items-center">
              <span>{requirement}</span>
              <button
                onClick={()=>handleRemoveRequirement(index)}
                className="text-xs pl-4  text-pure-greys-300"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
            <span className="text-white">
                {label} is required
            </span>
        )}
    </div>
  );
}

export default RequirementField;
