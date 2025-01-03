import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useAppContext } from './AppContext';
import DatePickerInSheet from './DatePickerInSheet';

export default function BottomSheetAdd() {

  const { setBottomSheetVisible} = useAppContext();

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      setBottomSheetVisible(false);
    }
  }

  return (
    
      <BottomSheet
        snapPoints={['25%', '50%', '75%','100%']}
        index={3}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <DatePickerInSheet  />
        </BottomSheetView>
      </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});