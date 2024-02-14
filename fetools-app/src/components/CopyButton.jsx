"use client"

import React from "react";

import ToastWithTitle from "./ToastWithTitle"
import { MdContentCopy } from "react-icons/md";


function CopyButton({ onCopy }) {

  const textToCopy = onCopy();

  const handleCopy = () => {
    if (navigator.clipboard && textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(
        () => {

        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    }
  };

  return (
    <ToastWithTitle onClickfun={handleCopy} copiedCode={textToCopy} buttonType={'copy'}>
      <MdContentCopy/>
    </ToastWithTitle>
  );
}

export default CopyButton;

/*
  const { toast } = useToast()
  toast({
    title: "Code Copied to Clipboard",
    description: `${textToCopy}`,
  })
*/ 