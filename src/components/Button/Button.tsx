import React from "react";
import { Button } from "@mui/material";

interface MyButtonProps {
  label: string;
  onClick: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ label, onClick }) => {
  return (
    <Button className="my-button" onClick={onClick}>
      {label}
    </Button>
  );
};

export default MyButton;
