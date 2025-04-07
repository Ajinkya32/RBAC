import { useState } from "react";

const useCreateTeamDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return {
    isOpen,
    setIsOpen,
    onOpen,
    onClose,
  };
};

export default useCreateTeamDialog;
