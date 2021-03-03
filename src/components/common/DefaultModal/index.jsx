import React from "react";

import { AiOutlineClose } from "react-icons/ai";

const DefaultModal = ({ children, closeBtn, onClose }) => {
  onClose = onClose ? onClose : () => {};

  return (
    <div className="fixed z-20 top-0 bottom-0 right-0 left-0 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50"
      />
      <div
        style={{
          width: "400px",
        }}
        className="bg-white px-8 py-6 z-0"
      >
        {closeBtn ? (
          <div className="flex justify-end">
            <AiOutlineClose
              size={20}
              onClick={onClose}
              style={{ cursor: "pointer" }}
            />
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default DefaultModal;
