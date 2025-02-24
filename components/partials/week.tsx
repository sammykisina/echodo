import { View } from 'react-native';
import React from 'react';
import { weekDays } from '@/utils/constants';
import Day from './day';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function Week() {
  /**
   * === STATES ===
   */

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      keyboardShouldPersistTaps='handled'
    >
      <View>
        {weekDays?.map((day) => (
          <Day day={day} key={`day-${day}`} />
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
}
