const colors: string[] = [
  '#8063db', '#DB4851', '#58a4db', '#dbcd42',
  '#47db9b', '#be51db', '#dc766e', '#DB244a',
  '#a0db42', '#DB3BDA', '#8144db', '#dba160',
  '#4b63db', '#dbd643', '#39aedb', '#bc44db', 'dba15a',
];

const colors2: string[] = [
  '#8080ff', '#8178d0', '#1d2951', '#000080',
  '#101d6b', '#01ffff', '#4683b7', '#0147ab',
  '#0d52db', '79f6fc', '#588bae', '#57a0d3',
  '#1035ac', '#003152', '#008ecc', '87cdee', '42e0d1',
];

const colors3: string[] = [
  '#add8e6', '#89cff0', '#00ffef', '#0abab5',
  '#00b7eb', '#6495ed', '#007fff', '#4666ff',
  '#42b0f5', '#4169e1', '#0072bb', '#0067a5',
  '#0047ab', '#0f4d92', '#000080', '#191970', 'black',
];

const topShadow = 'inset 13px 13px 18px';
const bottomShadow = 'inset -3px -3px 12px';

const shadow: string[] = [
  `${topShadow} #89abb6,
   ${bottomShadow} #d1ffff;`,
  `${topShadow} #6ca4be,
   ${bottomShadow} #a6faff;`,
  `${topShadow} #00c9bd,
   ${bottomShadow} #00ffff;`,
  `${topShadow} #08938f,
   ${bottomShadow} #0ce1db;`,
  `${topShadow} #0091ba,
   ${bottomShadow} #00ddff;`,
  `${topShadow} #4f76bb,
   ${bottomShadow} #79b4ff;`,
  `${topShadow} #0064c9,
   ${bottomShadow} #009aff;`,
  `${topShadow} #3751c9,
   ${bottomShadow} #557bff;`,
  `${topShadow} #348bc2,
   ${bottomShadow} #50d5ff;`,
  `${topShadow} #3353b2,
   ${bottomShadow} #4f7fff;`,
  `${topShadow} #005a94,
   ${bottomShadow} #008ae2;`,
  `${topShadow} #005182,
   ${bottomShadow} #007dc8;`,
  `${topShadow} #003887,
   ${bottomShadow} #0056cf;`,
  `${topShadow} #0c3d73,
   ${bottomShadow} #125db1;`,
  `${topShadow} #000065,
   ${bottomShadow} #00009b;`,
  `${topShadow} #141458,
   ${bottomShadow} #1e1e88;`,
  'black',
];

const fontSize: string[] = [
  '2.0rem', '2.0rem', '2.0rem', '2.0rem',
  '2.0rem', '2.0rem', '1.75rem', '1.75rem',
  '1.75rem', '1.5rem', '1.5rem', '1.5rem',
  '1.5rem', '1.25rem', '1.25rem', '1.25rem', '1.25rem'];

interface ColorTile {
  [key: string]: {
    backColor: string;
    fontSize: string;
    shadow: string;
  }
}

export default colors3.reduce((acc: ColorTile, ele, idx) => {
  const key = String(2 ** (idx + 1));
  acc[key] = {
    backColor: ele,
    fontSize: fontSize[idx],
    shadow: shadow[idx],
  };

  return acc;
}, {});
