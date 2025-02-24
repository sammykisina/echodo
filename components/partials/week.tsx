import { ScrollView, View } from 'react-native';
import React from 'react';
import { weekDays } from '@/utils/constants';
import Day from './day';
import { useAnimatedKeyboard } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function Week() {
  /**
   * === STATES ===
   */
  const { height } = useAnimatedKeyboard();

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      keyboardShouldPersistTaps='handled'
      // disableScrollOnKeyboardHide={true}
    >
      <View>
        {weekDays?.map((day) => (
          <Day day={day} key={`day-${day}`} />
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
}
