import deviceInfoModule from 'react-native-device-info';
import haptics, {HapticFeedbackTypes} from 'react-native-haptic-feedback';

const triggerHaptic = async (type: HapticFeedbackTypes) => {
  const isSim = await deviceInfoModule.isEmulator();
  if (!isSim) {
    haptics.trigger(type);
  }
};

export {triggerHaptic, HapticFeedbackTypes};
