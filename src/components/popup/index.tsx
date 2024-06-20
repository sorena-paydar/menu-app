import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';
import CloseIcon from '@mui/icons-material/Close';

import Styles from './popup.module.scss';
import { IconButton } from '@mui/material';

interface Props {
  open: boolean;
  children: ReactNode;
  title?: string;
  onClose: () => void;
}

export const Popup = ({ open, children, title, onClose }: Props) => {
  if (!open) return <span />;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 bg-gray-900 bg-opacity-50 flex items-end justify-center">
      <div
        className="fixed bottom-0 left-0 right-0 top-0"
        onClick={handleOverlayClick}
      ></div>

      <div
        className={classnames(
          'bg-white shadow-lg w-full max-w-md overflow-hidden transform transition-all duration-300 ease-in-out',
          Styles.Popup,
        )}
      >
        <div className="px-4 py-2 flex justify-between items-center">
          <Typography variant="h6">{title}</Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
