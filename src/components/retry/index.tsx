import { Button } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

export const Retry = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <Button
        onClick={() => window.location.reload()}
        variant="contained"
        endIcon={<ReplayIcon />}
      >
        Retry
      </Button>
    </div>
  );
};
