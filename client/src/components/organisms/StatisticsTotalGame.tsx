import styled from 'styled-components';
import { HeaderText } from '../atoms/index';
import MyResponsivePie, { PieData } from '../molecules/NivoPie'

const ItemContainer = styled.div<{ height: string }>`
  width:100%;
  height: ${({ height }) => height};
  border-radius:8px;
  padding:20px;
  box-shadow: 4px 4px 14px -2px rgb(245,234,232);
  margin-bottom:2.0rem;
`;

interface IStatisticsTotalGame {
  totalGame: number;
  gameCountPerLevel: PieData[];
}

export default function StatisticsTotalGame({ totalGame, gameCountPerLevel }: IStatisticsTotalGame) {

  return (
    <>
      <ItemContainer
        height={'450px'}
      >
        <HeaderText
          size={'1.15rem'}
          value={`TotalGame : ${totalGame}`}
          isColor={true}
          margin={'0 0px'}
        />
        <MyResponsivePie data={gameCountPerLevel} />
      </ItemContainer>
    </>
  )
}