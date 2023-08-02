import {FiEdit} from "react-icons/fi"

function IconButton({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button disabled={disabled} onClick={onclick} type={type} className="bg-yellow-100 px-2 py-2 rounded-md text-black">
      {children ? (
        <>
          <span>{text} </span>
          <FiEdit/>
          {children}
        </>
      ) : (
        <div className="flex items-center gap-2">
            {text}
            <FiEdit/>
        </div>
      )}
    </button>
  );
}

export default IconButton;
