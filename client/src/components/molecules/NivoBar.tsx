import { ResponsiveBar, BarDatum } from '@nivo/bar'

export interface INivo<T> {
  data: T[];
}

export default function MyResponsiveBar({ data }: INivo<BarDatum>) {

  return (
    <>
      <ResponsiveBar
        data={data}
        keys={['easy', 'normal', 'hard']}
        indexBy="level"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.55}
        borderWidth={2}
        valueScale={{ type: 'linear' }}
        maxValue={100}
        colors={{ scheme: 'accent' }}
        indexScale={{ type: 'band', round: true }}
        theme={{
          fontSize: 14,
          "axis": {
            "ticks": {
              "line": {
                "stroke": "black",
                "strokeWidth": 8
              }
            }
          },
          grid: {
            "line": {
              "stroke": "#383640",
              "strokeWidth": 1
            }
          }
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: 'easy'
            },
            id: 'dots'
          },
          {
            match: {
              id: 'hard'
            },
            id: 'lines'
          }
        ]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
      />
    </>
  )
}
