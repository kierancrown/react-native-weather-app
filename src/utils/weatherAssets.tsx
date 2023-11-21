const assetsDir = '../assets';

const day = {
  1000: {
    icon: require(`${assetsDir}/lottie/clear-day.json`),
    background: ['#2F80ED', '#56CCF2'],
  },
  1003: {
    icon: require(`${assetsDir}/lottie/partly-cloudy-day.json`),
    background: ['#56CCF2', '#2F80ED'],
  },
  1006: {
    icon: require(`${assetsDir}/lottie/cloudy.json`),
    background: ['#707B7C', '#616161'],
  },
  1009: {
    icon: require(`${assetsDir}/lottie/overcast-day.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1030: {
    icon: require(`${assetsDir}/lottie/mist.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1063: {
    icon: require(`${assetsDir}/lottie/overcast-day-drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1066: {
    icon: require(`${assetsDir}/lottie/overcast-day-snow.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1069: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1072: {
    icon: require(`${assetsDir}/lottie/drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1087: {
    icon: require(`${assetsDir}/lottie/thunderstorms-day-extreme.json`),
    background: ['#1F2833', '#0B0C10'],
  },
  1114: {
    icon: require(`${assetsDir}/lottie/overcast-day-snow.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1117: {
    icon: require(`${assetsDir}/lottie/overcast-day-snow.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1135: {
    icon: require(`${assetsDir}/lottie/fog.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1147: {
    icon: require(`${assetsDir}/lottie/fog.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1150: {
    icon: require(`${assetsDir}/lottie/overcast-day-drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1153: {
    icon: require(`${assetsDir}/lottie/overcast-day-drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1168: {
    icon: require(`${assetsDir}/lottie/drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1171: {
    icon: require(`${assetsDir}/lottie/drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1180: {
    icon: require(`${assetsDir}/lottie/overcast-day-drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1183: {
    icon: require(`${assetsDir}/lottie/overcast-day-drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1186: {
    icon: require(`${assetsDir}/lottie/overcast-day-drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1189: {
    icon: require(`${assetsDir}/lottie/overcast-day-drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1192: {
    icon: require(`${assetsDir}/lottie/overcast-day-drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1195: {
    icon: require(`${assetsDir}/lottie/overcast-day-drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1198: {
    icon: require(`${assetsDir}/lottie/drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1201: {
    icon: require(`${assetsDir}/lottie/drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1204: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1207: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1210: {
    icon: require(`${assetsDir}/lottie/overcast-day-snow.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1213: {
    icon: require(`${assetsDir}/lottie/overcast-day-snow.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1216: {
    icon: require(`${assetsDir}/lottie/overcast-day-snow.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1219: {
    icon: require(`${assetsDir}/lottie/overcast-day-snow.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1222: {
    icon: require(`${assetsDir}/lottie/overcast-day-snow.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1225: {
    icon: require(`${assetsDir}/lottie/overcast-day-snow.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1237: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1240: {
    icon: require(`${assetsDir}/lottie/overcast-day-drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1243: {
    icon: require(`${assetsDir}/lottie/overcast-day-drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1246: {
    icon: require(`${assetsDir}/lottie/overcast-day-drizzle.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1249: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1252: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1255: {
    icon: require(`${assetsDir}/lottie/overcast-day-snow.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1258: {
    icon: require(`${assetsDir}/lottie/overcast-day-snow.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1261: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1264: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#BDC3C7', '#7F8C8D'],
  },
  1273: {
    icon: require(`${assetsDir}/lottie/thunderstorms-day-extreme.json`),
    background: ['#1F2833', '#0B0C10'],
  },
  1276: {
    icon: require(`${assetsDir}/lottie/thunderstorms-day-extreme.json`),
    background: ['#1F2833', '#0B0C10'],
  },
  1279: {
    icon: require(`${assetsDir}/lottie/thunderstorms-day-extreme.json`),
    background: ['#1F2833', '#0B0C10'],
  },
  1282: {
    icon: require(`${assetsDir}/lottie/thunderstorms-day-extreme.json`),
    background: ['#1F2833', '#0B0C10'],
  },
};
const night = {
  1000: {
    icon: require(`${assetsDir}/lottie/clear-night.json`),
    background: ['#001F3F', '#003366'],
  },
  1003: {
    icon: require(`${assetsDir}/lottie/partly-cloudy-night.json`),
    background: ['#003366', '#001F3F'],
  },
  1006: {
    icon: require(`${assetsDir}/lottie/cloudy.json`),
    background: ['#616161', '#707B7C'],
  },
  1009: {
    icon: require(`${assetsDir}/lottie/overcast-night.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1030: {
    icon: require(`${assetsDir}/lottie/mist.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1063: {
    icon: require(`${assetsDir}/lottie/overcast-night-drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1066: {
    icon: require(`${assetsDir}/lottie/overcast-night-snow.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1069: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1072: {
    icon: require(`${assetsDir}/lottie/drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1087: {
    icon: require(`${assetsDir}/lottie/thunderstorms-night-extreme.json`),
    background: ['#0B0C10', '#1F2833'],
  },
  1114: {
    icon: require(`${assetsDir}/lottie/overcast-night-snow.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1117: {
    icon: require(`${assetsDir}/lottie/overcast-night-snow.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1135: {
    icon: require(`${assetsDir}/lottie/fog.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1147: {
    icon: require(`${assetsDir}/lottie/fog.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1150: {
    icon: require(`${assetsDir}/lottie/overcast-night-drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1153: {
    icon: require(`${assetsDir}/lottie/overcast-night-drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1168: {
    icon: require(`${assetsDir}/lottie/drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1171: {
    icon: require(`${assetsDir}/lottie/drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1180: {
    icon: require(`${assetsDir}/lottie/overcast-night-drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1183: {
    icon: require(`${assetsDir}/lottie/overcast-night-drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1186: {
    icon: require(`${assetsDir}/lottie/overcast-night-drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1189: {
    icon: require(`${assetsDir}/lottie/overcast-night-drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1192: {
    icon: require(`${assetsDir}/lottie/overcast-night-drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1195: {
    icon: require(`${assetsDir}/lottie/overcast-night-drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1198: {
    icon: require(`${assetsDir}/lottie/drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1201: {
    icon: require(`${assetsDir}/lottie/drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1204: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1207: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1210: {
    icon: require(`${assetsDir}/lottie/overcast-night-snow.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1213: {
    icon: require(`${assetsDir}/lottie/overcast-night-snow.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1216: {
    icon: require(`${assetsDir}/lottie/overcast-night-snow.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1219: {
    icon: require(`${assetsDir}/lottie/overcast-night-snow.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1222: {
    icon: require(`${assetsDir}/lottie/overcast-night-snow.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1225: {
    icon: require(`${assetsDir}/lottie/overcast-night-snow.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1237: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1240: {
    icon: require(`${assetsDir}/lottie/overcast-night-drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1243: {
    icon: require(`${assetsDir}/lottie/overcast-night-drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1246: {
    icon: require(`${assetsDir}/lottie/overcast-night-drizzle.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1249: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1252: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1255: {
    icon: require(`${assetsDir}/lottie/overcast-night-snow.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1258: {
    icon: require(`${assetsDir}/lottie/overcast-night-snow.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1261: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1264: {
    icon: require(`${assetsDir}/lottie/sleet.json`),
    background: ['#7F8C8D', '#BDC3C7'],
  },
  1273: {
    icon: require(`${assetsDir}/lottie/thunderstorms-night-extreme.json`),
    background: ['#0B0C10', '#1F2833'],
  },
  1276: {
    icon: require(`${assetsDir}/lottie/thunderstorms-night-extreme.json`),
    background: ['#0B0C10', '#1F2833'],
  },
  1279: {
    icon: require(`${assetsDir}/lottie/thunderstorms-night-extreme.json`),
    background: ['#0B0C10', '#1F2833'],
  },
  1282: {
    icon: require(`${assetsDir}/lottie/thunderstorms-night-extreme.json`),
    background: ['#0B0C10', '#1F2833'],
  },
};

export {day, night};
