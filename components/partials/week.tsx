import { View } from 'react-native';
import React from 'react';
import { weekDays } from '@/utils/constants';
import Day from './day';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Week() {
  /**
   * === STATES ===
   */
  const { bottom } = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      keyboardShouldPersistTaps='handled'
    >
      <View style={{ marginBottom: bottom }}>
        {weekDays?.map((day) => (
          <Day day={day} key={`day-${day}`} />
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
}
