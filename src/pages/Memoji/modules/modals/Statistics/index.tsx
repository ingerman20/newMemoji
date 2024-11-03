import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { Modal } from '../../../../../components/Modal';
import {
  clearResults,
  closeStatisticsModal,
} from '../../../redux/features/gameplay/gameplaySlice';
import { StatisticsTableHeader } from './Table/Header';
import { StatisticsModalBody } from './Table/Body';
import { useCallback } from 'react';
import { Button } from '../../../../../components/Button';

/**
 * Таблица результатов
 */
export const StatisticsModal = () => {
  const { statisticsModal } = useAppSelector((state) => state.memoji);
  const dispatch = useAppDispatch();

  const closeModal = useCallback(
    () => dispatch(closeStatisticsModal()),
    [dispatch]
  );

  const handleReset = () => {
    dispatch(clearResults());
  };

  if (!statisticsModal) {
    return null;
  }

  return (
    <Modal onClose={closeModal} style={{ color: 'var(--color-4)' }}>
      <h3 style={{ margin: '20px' }}>Результаты</h3>
      <StatisticsTableHeader />
      <StatisticsModalBody />
      <Button style={{ margin: '20px' }} onClick={handleReset}>
        Сбросить результаты
      </Button>
    </Modal>
  );
};
