import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  closeSettingsModal,
  setNewSetName,
  setNewTime,
  setPairsCount,
  setTimeForShowCards,
} from '../../../../redux/features/gameplay/gameplaySlice';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { SetTypes } from '../../../../data/enums';
import { cardsSets } from '../../../../data/options';

import styles from './index.module.css';
import { Button } from '../../../../../../components/Button';
import { Input } from '../../../../../../components/Input';
import { Select } from '../../../../../../components/Select';
import { yupResolver } from '@hookform/resolvers/yup';

interface ISettings {
  defaultTime: number;
  pairsCount: number;
  timeForShowCards: number;
  setName: SetTypes;
}

const schema = yup
  .object({
    defaultTime: yup
      .number()
      .min(5, 'Минимальное время - 5 секунд')
      .max(300, 'Максимальное время игры - 300 секунд')
      .required('Укажите время игры!'),
    timeForShowCards: yup
      .number()
      .min(0, 'Минимальное время показа карточек - 0 сек.')
      .max(10, 'Максимальное время показа карточек - 10 сек.')
      .required('Укажите время показа карточек!'),
    pairsCount: yup
      .number()
      .min(4, 'Минимальное количество пар - 4')
      .max(20, 'Максимальное количество пар - 20')
      .required('Укажите количество пар!'),
    setName: yup.mixed<SetTypes>().oneOf(Object.values(SetTypes)).required(),
  })
  .required();

export const SettingsForm = () => {
  const dispatch = useAppDispatch();
  const { defaultTime, pairsCount, setName, timeForShowCards } = useAppSelector(
    (state) => state.memoji
  );

  /**
   * Сохраняем настройки
   */
  const handleSaveSettings = (data: ISettings) => {
    dispatch(setNewTime(Number(data.defaultTime)));
    dispatch(setTimeForShowCards(Number(data.timeForShowCards)));
    dispatch(setPairsCount(Number(data.pairsCount)));
    dispatch(setNewSetName(data.setName));
    dispatch(closeSettingsModal());
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISettings>({
    defaultValues: {
      defaultTime,
      pairsCount,
      setName,
      timeForShowCards,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ISettings> = (data) => handleSaveSettings(data);
  const onReject = (e: unknown) => console.log(e);

  return (
    <form onSubmit={handleSubmit(onSubmit, onReject)} className={styles.form}>
      <h3 style={{ margin: 0, marginBottom: '20px', userSelect: 'none' }}>
        Настройки игры
      </h3>

      <Controller
        control={control}
        name="defaultTime"
        render={({ field }) => (
          <Input
            {...field}
            title="Время, сек"
            type="number"
            placeholder="Время"
            error={
              errors.defaultTime && (
                <span className={styles.error}>
                  {errors.defaultTime?.message}
                </span>
              )
            }
          />
        )}
      />

      <Controller
        name="pairsCount"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            title="Количество пар"
            type="number"
            placeholder="Количество пар"
            error={
              errors.pairsCount && (
                <span className={styles.error}>
                  {errors.pairsCount?.message}
                </span>
              )
            }
          />
        )}
      />

      <Controller
        name="timeForShowCards"
        control={control}
        render={({ field }) => {
          return (
            <Input
              {...field}
              title="Время показа карточек, сек"
              type="number"
              placeholder="Время показа карточек, сек"
              error={
                errors.timeForShowCards && (
                  <span className={styles.error}>
                    {errors.timeForShowCards?.message}
                  </span>
                )
              }
            />
          );
        }}
      />

      <Controller
        control={control}
        name="setName"
        render={({ field }) => (
          <Select {...field} title="Набор карточек" options={cardsSets} />
        )}
      />

      <Button style={{ marginTop: '20px' }} type="submit">
        Сохранить настройки
      </Button>
    </form>
  );
};
