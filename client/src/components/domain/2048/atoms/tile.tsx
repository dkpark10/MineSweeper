import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Tween, Timeline } from 'react-gsap';
import tileData from '../../../../utils/2048/tile_color';
import { AnimationTile } from '../../../../utils/2048/animation_calcul';

interface Props {
  data: AnimationTile;
  newValue: number;
}

const DefaultTile = styled.div`
  width:65px;
  height:65px;
  border-radius:5px;
  text-align:center;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const BackgroundTile = styled(DefaultTile)`
  position:relative;
  background: '#272626';
  box-shadow: inset 3px 3px 24px #1f1e1e,
              inset -3px -3px 16px #2f2e2e;
`;

const RealTile = styled(DefaultTile) <{ value: number }>`
  z-index: 1;
  position:absolute;
  background: ${({ value }) => tileData[value].backColor};
  box-shadow: ${({ value }) => tileData[value].shadow};
  & {
    color:white;
    font-size:${({ value }) => tileData[value].fontSize};
    font-weight:bold;
  }
`;

export default function Tile({
  data,
  newValue,
}: Props): JSX.Element {
  const [active, setActive] = useState<boolean>(true);
  const {
    x, y, isDelete, isNew, value,
  } = data;
  const ref = useRef(null);

  useEffect(() => {
    setActive(true);
    return (() => {
      ref.current = null;
    });
  }, [x, y, value, isDelete, isNew]);

  return (
    <BackgroundTile
      className='cell'
    >
      {value !== 0 && active && (
        <Timeline
          target={(
            <RealTile
              className='hidden'
              value={value}
              ref={ref}
            >
              {value}
            </RealTile>
          )}
        >
          <Tween
            opacity={isDelete === true ? 0 : 1}
            to={{
              x: x * 71,
              y: y * 71,
            }}
            duration={0.2}
            onCompelete={() => setActive(isDelete === true)}
          />
        </Timeline>
      )}
      {isNew && newValue !== 0 && (
        <Timeline
          target={(
            <RealTile
              className='new_tile'
              value={newValue}
            >
              {newValue}
            </RealTile>
          )}
        >
          <Tween to={{ scaleX: 1.2, scaleY: 1.2 }} duration={0.1} />
          <Tween to={{ scaleX: 1.0, scaleY: 1.0 }} duration={0.1} />
        </Timeline>
      )}
    </BackgroundTile>
  );
}
