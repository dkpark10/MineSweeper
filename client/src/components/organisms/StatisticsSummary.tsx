import styled from 'styled-components';
import { HeaderText, InlineText } from '../atoms/Text';
import TextWrapper from '../molecules/TextWrapper';
import { PieData } from '../molecules/NivoPie'

const ItemContainer = styled.div<{ height: string }>`
  width:100%;
  height: ${({ height }) => height};
  border-radius:8px;
  padding:20px;
  box-shadow: 4px 4px 14px -2px rgb(245,234,232);
  margin-bottom:2.0rem;
`;

interface IStatisticsSummary {
  gameCountPerLevel: PieData[];
  best: number[];
  winCount: number[];
}

export default function StatisticsSummary({ gameCountPerLevel, best, winCount }: IStatisticsSummary) {

  return (
    <>
      <ItemContainer
        height={'none'}
      >
        <TextWrapper
          width={'100%'}
          textAlign={'left'}
        >
          <div style={{ margin: '20px 0' }}>
            <HeaderText
              size={'1.15rem'}
              value={`Easy`}
              isColor={true}
              margin={'0 0'}
            />
            <InlineText
              size={'1.0rem'}
              value={`total : ${gameCountPerLevel[0].value} win : ${winCount[0]} best : ${best[0]}`}
              isColor={false}
            />
          </div>
          <div style={{ margin: '20px 0' }}>
            <HeaderText
              size={'1.15rem'}
              value={`Normal`}
              isColor={true}
              margin={'0 0'}
            />
            <InlineText
              size={'1rem'}
              value={`total : ${gameCountPerLevel[1].value} win : ${winCount[1]} best : ${best[1]}`}
              isColor={false}
            />
          </div>
          <div style={{ margin: '20px 0' }}>
            <HeaderText
              size={'1.15rem'}
              value={`Hard`}
              isColor={true}
              margin={'0 0'}
            />
            <InlineText
              size={'1.0'}
              value={`total : ${gameCountPerLevel[2].value} win : ${winCount[2]} best : ${best[2]}`}
              isColor={false}
            />
          </div>
        </TextWrapper>
      </ItemContainer>
    </>
  )
}
