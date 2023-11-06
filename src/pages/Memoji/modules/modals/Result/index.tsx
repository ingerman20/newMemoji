import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { Modal } from '../../../../../components/Modal';
import { GameStatus, ResultStatus } from '../../../data/enums';
import { closeResultModal } from '../../../redux/features/gameplay/gameplaySlice';

/**
 * Модальное окно с результатом игры
 */
export const ResultModal = () => {
  const { resultStatus, resultModal, gameStatus } = useAppSelector(
    (state) => state.memoji
  );

  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(closeResultModal());

  if (gameStatus !== GameStatus.STOP || !resultModal) {
    return null;
  }

  return (
    <Modal onClose={closeModal}>
      <div>
        {resultStatus === ResultStatus.WIN
          ? 'Победа'
          : resultStatus === ResultStatus.LOSE
          ? 'Проигрыш'
          : ''}
      </div>
    </Modal>
  );
};
