import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

type Props = ViewProps;

export function Card({ style, ...props }: Props) {
  return <View style={[styles.card, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
  },
});
