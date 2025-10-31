import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface AppTextInputProps extends Omit<TextInputProps, 'style'> {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
}

const ICON_TOUCH_SIZE = 40;

const AppTextInput: React.FC<AppTextInputProps> = ({
  containerStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  onPressLeftIcon,
  onPressRightIcon,
  editable = true,
  ...textInputProps
}) => {
  const { colors: themeColors } = useTheme();

  const colors = themeColors as {
    primary?: string;
    primary_text?: string;
    text?: string;
    box_background?: string;
  };

  const backgroundColor = colors.box_background || '#F8F9FA';
  const textColor = colors.text || '#000000';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, opacity: editable ? 1 : 0.6 },
        containerStyle,
      ]}
    >
      {leftIcon ? (
        onPressLeftIcon ? (
          <Pressable style={styles.icon} onPress={onPressLeftIcon} hitSlop={8}>
            {leftIcon}
          </Pressable>
        ) : (
          <View style={styles.icon}>{leftIcon}</View>
        )
      ) : null}

      <TextInput
        {...textInputProps}
        editable={editable}
        style={[
          styles.input,
          { color: textColor },
          leftIcon && { paddingLeft: 0 },
          rightIcon && { paddingRight: 0 },
          inputStyle,
        ]}
        placeholderTextColor="#999999"
      />

      {rightIcon ? (
        onPressRightIcon ? (
          <Pressable style={styles.icon} onPress={onPressRightIcon} hitSlop={8}>
            {rightIcon}
          </Pressable>
        ) : (
          <View style={styles.icon}>{rightIcon}</View>
        )
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  icon: {
    width: ICON_TOUCH_SIZE,
    height: ICON_TOUCH_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppTextInput;


