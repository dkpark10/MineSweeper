export interface ITheme {
  mainColor: string;
  fontColor: string;
  grayBackGround: string;
  HeaderFont: string;
  BodyFont: string;
  mainContentWidth: string;
}

const Theme: ITheme = {
  mainColor: '#1033E3',
  fontColor: '#383640',
  grayBackGround: '#e0e0e0',
  HeaderFont: `'Roboto', sans-serif'`,
  BodyFont: `'Tajawal', sans-serif'`,
  mainContentWidth: '824px'
}

export default Theme;