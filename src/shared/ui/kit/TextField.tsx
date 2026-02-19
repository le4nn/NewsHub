import React from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = TextInputProps & {
  leftIcon?: React.ComponentProps<typeof MaterialIcons>['name'];
  rightIcon?: React.ComponentProps<typeof MaterialIcons>['name'];
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
};

export function TextField({ leftIcon, rightIcon, onRightIconPress, containerStyle, style, ...props }: Props) {
  return (
    <View style={[styles.row, containerStyle]}>
      {leftIcon ? <MaterialIcons name={leftIcon} size={20} color="#9AA0A6" style={styles.leftIcon} /> : null}
      <TextInput style={[styles.input, style]} placeholderTextColor="#9AA0A6" {...props} />
      {rightIcon ? (
        <Pressable onPress={onRightIconPress} hitSlop={10}>
          <MaterialIcons name={rightIcon} size={20} color="#9AA0A6" />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  leftIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#111' },
});
