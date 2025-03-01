import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoiseBackground from '@/components/partials/noise-background';
import Week from '@/components/partials/week';
import { Accordion } from '@animatereactnative/accordion';

export default function Home() {
  return (
    <SafeAreaView className='flex-1'>
      <NoiseBackground />
      <Week />
    </SafeAreaView>
  );
}
