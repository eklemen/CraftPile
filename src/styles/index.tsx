const colors = {
  primary: {
    '50': '#015dc7',
    '100': '#064b9b',
    '200': '#083971',
    '300': '#082649',
    '400': '#041426',
    '500': '#02080f',
    '600': '#02080f',
    '700': '#02080f',
    '800': '#02080f',
    '900': '#02080f',
  },
  secondary: {
    '50': '#f7bab6',
    '100': '#f09c96',
    '200': '#e67f78',
    '300': '#da645c',
    '400': '#d3453c',
    '500': '#c23e35',
    '600': '#a93e37',
    '700': '#913d37',
    '800': '#7a3a36',
    '900': '#653633',
  },
};

const fontConfig = {
  Montserrat: {
    100: {
      normal: 'Montserrat_300Light',
    },
    200: {
      normal: 'Montserrat_300Light',
    },
    300: {
      normal: 'Montserrat_300Light',
    },
    400: {
      normal: 'Montserrat_400Regular',
    },
    500: {
      normal: 'Montserrat_400Regular',
    },
    600: {
      normal: 'Montserrat_400Regular',
    },
    700: {
      normal: 'Montserrat_700Bold',
    },
    800: {
      normal: 'Montserrat_700Bold',
    },
  },
  Nunito: {
    100: {
      normal: 'Nunito_300Light',
    },
    200: {
      normal: 'Nunito_300Light',
    },
    300: {
      normal: 'Nunito_300Light',
    },
    400: {
      normal: 'Nunito_400Regular',
    },
    500: {
      normal: 'Nunito_400Regular',
    },
    600: {
      normal: 'Nunito_400Regular',
    },
    700: {
      normal: 'Nunito_700Bold',
    },
    800: {
      normal: 'Nunito_700Bold',
    },
  },
};
const fonts = {
  heading: 'Montserrat',
  body: 'Nunito',
  mono: 'Montserrat',
};

export const themeOverrides = {
  colors,
  fontConfig,
  fonts,
};
