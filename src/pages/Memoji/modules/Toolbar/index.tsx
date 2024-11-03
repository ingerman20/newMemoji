import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { GameStatus } from '../../data/enums';
import {
  openSettingsModal,
  openStatisticsModal,
} from '../../redux/features/gameplay/gameplaySlice';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded';

import styles from './index.module.css';

export const Toolbar = ({ initNewGame }: { initNewGame: () => void }) => {
  const dispatch = useAppDispatch();
  const { gameStatus } = useAppSelector((state) => state.memoji);

  return (
    <div className={styles.root}>
      <button
        className={styles.button}
        onClick={() => dispatch(openSettingsModal())}
      >
        <SettingsIcon fontSize={'large'} />
        <span className={styles.buttonCaption}>Настройки</span>
      </button>
      {gameStatus !== GameStatus.NONE && (
        <button className={styles.button} onClick={initNewGame}>
          <PlayArrowIcon fontSize={'large'} />
          <span className={styles.buttonCaption}>
            {gameStatus !== GameStatus.STOP ? 'Начать снова' : 'Новая игра'}
          </span>
        </button>
      )}
      <button
        className={styles.button}
        onClick={() => dispatch(openStatisticsModal())}
      >
        <EmojiEventsIcon fontSize={'large'} />
        <span className={styles.buttonCaption}>Результаты</span>
      </button>
    </div>
  );
};
