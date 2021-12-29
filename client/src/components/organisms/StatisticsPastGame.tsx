import styled from 'styled-components';
import {
  PostWrapper
} from '../atoms/index';

import {
  HeaderText,
} from '../atoms/index';

import {
  TextWrapper
} from '../molecules/index';

const ItemContainer = styled.div<{ height: string }>`
  width:100%;
  height: ${({ height }) => height};
  border-radius:8px;
  padding:20px;
  box-shadow: 4px 4px 14px -2px rgb(245,234,232);
  margin-bottom:2.0rem;
`;

export default function StatisticsPastGame({ pastGame }) {

  const pastGameContentFontSize = '1.0rem' as const;
  const pastGameHeaderFontSize = '1.1rem' as const;
  const pastGameHeader: JSX.Element[] = [
    {
      align: 'left',
      value: ''
    }, {
      align: 'left',
      value: 'Level',
    }, {
      align: 'center',
      value: 'Record',
    }, {
      align: 'center',
      value: 'Success',
    }, {
      align: 'left',
      value: 'Date',
    }].map((ele, idx) => {

      const { align, value } = ele;
      return (
        <>
          <TextWrapper
            textAlign={align}
            fontSize={pastGameHeaderFontSize}
            value={value}
          />
        </>
      )
    })

  return (
    <>
      <ItemContainer
        height={'none'}
      >
        <HeaderText
          size={'1.15rem'}
          value={'PastGame'}
          isColor={true}
          margin={'20px 0'}
        />
        <PostWrapper
          backgroundColor={'none'}
          grid_Template_Columnn={'repeat(5, 1fr)'}
        >
          {pastGameHeader}
        </PostWrapper>
        {pastGame.map((ele, idx) => {
          return (
            <PostWrapper
              key={idx}
              backgroundColor={'none'}
              grid_Template_Columnn={'repeat(5, 1fr)'}
            >
              <TextWrapper
                textAlign={'left'}
                fontSize={pastGameContentFontSize}
                value={String(idx)}
                bold={true}
                isColor={true}
              />
              <TextWrapper
                textAlign={'left'}
                fontSize={pastGameContentFontSize}
                value={ele.level}
              />
              <TextWrapper
                textAlign={'center'}
                fontSize={pastGameContentFontSize}
                value={String(ele.record)}
              />
              <TextWrapper
                textAlign={'center'}
                fontSize={pastGameContentFontSize}
                value={String(ele.success)}
              />
              <TextWrapper
                textAlign={'left'}
                fontSize={pastGameContentFontSize}
                value={ele.date}
              />
            </PostWrapper>
          )
        })}
      </ItemContainer>
    </>
  )
}
