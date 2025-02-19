/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, onPause, onPlay }) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={onPause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={onPlay} />
  );

export default PlayPause;
