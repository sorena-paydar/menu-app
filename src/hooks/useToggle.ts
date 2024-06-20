import { useCallback, useState } from 'react';

export function useToggle(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prevState) => !prevState), []);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}
