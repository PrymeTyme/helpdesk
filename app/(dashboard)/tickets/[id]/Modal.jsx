import React from "react";

export default function Modal({ showModal, setShowModal, handleClick }) {
  const handleConfirmation = async () => {
    await handleClick();
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="bg-white w-full sm:max-w-md p-6 sm:p-10 rounded-lg shadow-lg">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-solid border-slate-200 pb-4">
                <h3 className="text-3xl font-semibold">Delete Ticket</h3>
                <button
                  className=" p-1 ml-auto bg-transparent border-0 text-black opacity-30 text-3xl leading-none font-semibold outline-none focus:outline-none hover:opacity-80"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    x
                  </span>
                </button>
              </div>
              {/* Body */}
              <div className="p-4 sm:p-6">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Do you really want to delete this ticket?
                </p>
              </div>
              {/* Footer */}
              <div className=" justify-center flex items-center sm:justify-end border-t border-solid border-slate-200 pt-4">
                <button
                  className="btn-primary background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-2"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
                <button
                  className="btn-primary font-bold uppercase text-sm px-6 py-2 outline-none focus:outline-none"
                  type="button"
                  onClick={handleConfirmation}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
