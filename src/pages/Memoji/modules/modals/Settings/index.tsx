import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { closeSettingsModal } from '../../../redux/features/gameplay/gameplaySlice';

import { Modal } from '../../../../../components/Modal';
import { SettingsForm } from './Form';

/**
 * Модальное окно настроек
 */
export const SettingsModal = () => {
  const { settingsModal } = useAppSelector((state) => state.memoji);

  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(closeSettingsModal());

  if (!settingsModal) {
    return null;
  }

  return (
    <Modal onClose={closeModal}>
      <SettingsForm />
    </Modal>
  );
};
