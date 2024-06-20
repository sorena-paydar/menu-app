import { useState } from 'react';

interface Props {
  initialState?: boolean;
}

export function useToggle({ initialState = false }: Props) {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((prevState) => !prevState);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}
