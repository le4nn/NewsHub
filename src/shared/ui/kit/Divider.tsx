import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  label?: string;
};

export function Divider({ label = 'или' }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.text}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  line: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  text: { marginHorizontal: 10, color: '#9AA0A6', fontSize: 12 },
});
