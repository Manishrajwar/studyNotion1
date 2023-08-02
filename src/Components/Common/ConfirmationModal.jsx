import IconButton from "./IconButton";

function ConfirmationModal({ modalData }) {
  return (
    <div className="text-black bg-[#766e6e] absolute top-[40%] left-[40%] px-5 py-5">
      <div className="flex gap-3 flex-col">
        <p className="text-lg font-bold text-center">{modalData.text1}</p>
        <p className="text-md font-semibold">{modalData.text2}</p>

        <div className="flex flex-row justify-evenly">
          <IconButton
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button className="border-2 rounded-lg " onClick={modalData?.btn2Handler}>
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
