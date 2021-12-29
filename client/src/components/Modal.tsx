import '../styles/Modal.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Reducers';
import { gameReset, setRecordTime } from '../reducers/Game';
import { useEffect } from 'react';
import axiosApi, { Response } from '../modules/API';

interface ModalProps{
  levelInfo: string;
}

const GameModal = ({ levelInfo }: ModalProps) => {

  const dispatch = useDispatch();

  const { extraCell, takenTime, userId } = useSelector((state: RootState) => ({
    extraCell: state.game.isGameOver,
    takenTime: state.game.takenTime,
    userId: state.login.id
  }));

  const isGameSuccess = extraCell === 0 ? true : false;

  useEffect(() => {

    if (takenTime !== -1 && userId && userId !== '') {

      console.log(isGameSuccess);
      axiosApi.post(`http://localhost:8080/api/auth/game`, {
        id: userId,
        record: takenTime / 1000,
        success: isGameSuccess,
        level: levelInfo
      })
        .then((res: Response) => { ; });
    }
    dispatch(gameReset(false));

    return () => localStorage.setItem('difficulty', levelInfo);
  }, [isGameSuccess, takenTime, userId, dispatch, levelInfo]);

  const gameRestart = () => {
    dispatch(gameReset(true));
    dispatch(setRecordTime(-1));
  }

  return (
    <>
      <div className={extraCell <= 0 ? 'modal' : 'modal hidden'}>
        <div className='modal-overlay'></div>
        <div className='modal-content'>
          <div> Time : {takenTime / 1000}</div>
          <div> Level : {levelInfo}</div>
          <button className='closemodal' onClick={gameRestart}>Close</button>
        </div>
      </div>
    </>
  );
}

export default GameModal;