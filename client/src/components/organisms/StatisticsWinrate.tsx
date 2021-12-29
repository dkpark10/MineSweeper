import styled from 'styled-components';
import { HeaderText } from '../atoms/index';
import { MyResponsiveBar } from '../molecules/index';

const ItemContainer = styled.div<{ height: string }>`
  width:100%;
  height: ${({ height }) => height};
  border-radius:8px;
  padding:20px;
  box-shadow: 4px 4px 14px -2px rgb(245,234,232);
  margin-bottom:2.0rem;
`;

export default function StatisticsWinrate({ winRate }: { winRate: number[] }) {

  return (
    <>
      <ItemContainer
        height={'450px'}
      >
        <HeaderText
          size={'1.15rem'}
          value={'WinRate'}
          isColor={true}
          margin={'0 0'}
        />
        <MyResponsiveBar data={[{
          level: 'easy',
          easy: winRate[0]
        }, {
          level: 'normal',
          normal: winRate[1]
        }, {
          level: 'hard',
          hard: winRate[2]
        }]} />
      </ItemContainer>
    </>
  )
}