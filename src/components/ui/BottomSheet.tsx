import React, { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import {
  View,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import createStyles from './BottomSheet.styles';

export interface BottomSheetProps {
  /** Whether the bottom sheet is visible */
  isVisible: boolean;
  /** Callback when the bottom sheet should be closed */
  onClose: () => void;
  /** Content to render inside the bottom sheet */
  children: React.ReactNode;
  /** Height of the bottom sheet (0-1 as percentage of screen, or number in pixels) */
  height?: number | string;
  /** Whether to show the backdrop overlay */
  showBackdrop?: boolean;
  /** Backdrop opacity (0-1) */
  backdropOpacity?: number;
  /** Whether to allow swipe down to dismiss */
  enableSwipeToDismiss?: boolean;
  /** Whether to show a drag handle at the top */
  showDragHandle?: boolean;
  /** Custom container style */
  containerStyle?: StyleProp<ViewStyle>;
  /** Custom content style */
  contentStyle?: StyleProp<ViewStyle>;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Whether to close on backdrop press */
  closeOnBackdropPress?: boolean;
  /** Callback when sheet starts opening */
  onOpenStart?: () => void;
  /** Callback when sheet finishes opening */
  onOpenEnd?: () => void;
  /** Callback when sheet starts closing */
  onCloseStart?: () => void;
  /** Callback when sheet finishes closing */
  onCloseEnd?: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  height = 0.7, // 70% of screen height by default
  showBackdrop = true,
  backdropOpacity = 0.5,
  enableSwipeToDismiss = true,
  showDragHandle = true,
  containerStyle,
  contentStyle,
  animationDuration = 300,
  closeOnBackdropPress = true,
  onOpenStart,
  onOpenEnd,
  onCloseStart,
  onCloseEnd,
}) => {
  const { colors, spacing, borderRadius } = useTheme();
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Update slideAnim initial value when screenHeight changes
  useEffect(() => {
    if (!isVisible) {
      slideAnim.setValue(screenHeight);
    }
  }, [screenHeight, isVisible, slideAnim]);

  const styles = useMemo(
    () => createStyles(colors, spacing, borderRadius),
    [colors, spacing, borderRadius]
  );

  // Handle dimension changes (orientation, etc.)
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenHeight(window.height);
      // Reset animation values on dimension change
      if (!isVisible) {
        slideAnim.setValue(window.height);
      }
    });

    return () => {
      subscription?.remove();
    };
  }, [isVisible, slideAnim]);

  // Calculate bottom sheet height with validation
  const sheetHeight = useMemo(() => {
    let calculatedHeight: number;

    if (typeof height === 'string') {
      // Percentage like "70%"
      const cleaned = height.replace('%', '').trim();
      const percentage = parseFloat(cleaned);
      
      if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
        console.warn(`Invalid height percentage: ${height}. Using default 70%.`);
        calculatedHeight = screenHeight * 0.7;
      } else {
        calculatedHeight = screenHeight * (percentage / 100);
      }
    } else if (height > 0 && height <= 1) {
      // Decimal like 0.7
      calculatedHeight = screenHeight * height;
    } else if (height > screenHeight) {
      // Pixel value exceeds screen height
      console.warn(`Height ${height}px exceeds screen height ${screenHeight}px. Using screen height.`);
      calculatedHeight = screenHeight * 0.9; // 90% as safe fallback
    } else if (height <= 0) {
      // Invalid pixel value
      console.warn(`Invalid height: ${height}. Using default 70%.`);
      calculatedHeight = screenHeight * 0.7;
    } else {
      // Valid pixel value
      calculatedHeight = height;
    }

    // Ensure minimum height of 100px
    return Math.max(calculatedHeight, 100);
  }, [height, screenHeight]);

  // Handle closing animation
  const handleClose = useCallback(() => {
    if (!isVisible) return;
    
    // Stop any ongoing animation
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
    
    onCloseStart?.();
    const animation = Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]);
    
    animationRef.current = animation;
    animation.start(({ finished }) => {
      if (finished) {
        panY.setValue(0);
        onCloseEnd?.();
        onClose();
      }
      animationRef.current = null;
    });
  }, [isVisible, animationDuration, screenHeight, onCloseStart, onCloseEnd, onClose, slideAnim, backdropAnim, panY]);

  // Handle opening animation
  const handleOpen = useCallback(() => {
    if (!isVisible) return;
    
    // Stop any ongoing animation
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
    
    onOpenStart?.();
    panY.setValue(0);
    const animation = Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]);
    
    animationRef.current = animation;
    animation.start(({ finished }) => {
      if (finished) {
        onOpenEnd?.();
      }
      animationRef.current = null;
    });
  }, [isVisible, animationDuration, onOpenStart, onOpenEnd, slideAnim, backdropAnim, panY]);

  // Pan responder for swipe to dismiss
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => enableSwipeToDismiss,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return enableSwipeToDismiss && gestureState.dy > 0;
        },
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy > 0) {
            panY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          const swipeThreshold = sheetHeight * 0.3; // 30% of sheet height
          if (gestureState.dy > swipeThreshold && enableSwipeToDismiss) {
            handleClose();
          } else {
            // Spring back to original position
            Animated.spring(panY, {
              toValue: 0,
              useNativeDriver: true,
              tension: 65,
              friction: 11,
            }).start();
          }
        },
      }),
    [enableSwipeToDismiss, sheetHeight, handleClose]
  );

  // Animate when visibility changes
  useEffect(() => {
    if (isVisible) {
      handleOpen();
    } else {
      // Reset position when not visible
      slideAnim.setValue(screenHeight);
      backdropAnim.setValue(0);
      panY.setValue(0);
    }
  }, [isVisible, handleOpen, screenHeight, slideAnim, backdropAnim, panY]);

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, []);

  // Backdrop opacity animation (memoized)
  const backdropOpacityValue = useMemo(
    () =>
      backdropAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, backdropOpacity],
      }),
    [backdropAnim, backdropOpacity]
  );

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={styles.modalContainer}>
        {/* Backdrop */}
        {showBackdrop && (
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: backdropOpacityValue,
              },
            ]}
          >
            {closeOnBackdropPress && (
              <TouchableWithoutFeedback onPress={handleClose}>
                <View style={styles.backdropTouchable} />
              </TouchableWithoutFeedback>
            )}
          </Animated.View>
        )}

        {/* Bottom Sheet */}
        <Animated.View
          style={[
            styles.sheetContainer,
            containerStyle,
            {
              height: sheetHeight,
              transform: [
                {
                  translateY: Animated.add(slideAnim, panY),
                },
              ],
            },
          ]}
          {...(enableSwipeToDismiss ? panResponder.panHandlers : {})}
        >
          {/* Drag Handle */}
          {showDragHandle && (
            <View style={styles.dragHandleContainer}>
              <View style={styles.dragHandle} />
            </View>
          )}

          {/* Content */}
          <View style={[styles.content, contentStyle]}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomSheet;

