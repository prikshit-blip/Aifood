import React, { useState, useMemo, useCallback, Suspense } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import { useTheme } from '../../hooks/useTheme';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import AppText from '../../components/ui/AppText';
import AppTextInput from '../../components/ui/AppTextInput';
import AppButton from '../../components/ui/AppButton';
import ScreenHeader from '../../components/ui/ScreenHeader';
import { ICONS } from '../../assests';
import FastImage from 'react-native-fast-image';
import createStyles from './styles';

type GiftScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Gift'>;

interface GiftCardOption {
  id: string;
  title: string;
  imageUrl?: string;
  backgroundColor?: string;
}

/**
 * Loading fallback component for Suspense
 */
const LoadingFallback: React.FC = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors?.primary || '#FF6B35'} />
    </View>
  );
};

/**
 * Gift Card Option Component
 * Memoized for performance optimization
 */
const GiftCardOptionItem = React.memo<{
  card: GiftCardOption;
  isSelected: boolean;
  onPress: (id: string) => void;
  styles: ReturnType<typeof createStyles>;
}>(({ card, isSelected, onPress, styles }) => {
  const handlePress = useCallback(() => {
    onPress(card.id);
  }, [card.id, onPress]);

  return (
    <TouchableOpacity
      style={[
        styles.giftCardOption,
        isSelected && styles.giftCardOptionSelected,
        card.backgroundColor && { backgroundColor: card.backgroundColor },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Select ${card.title} gift card`}
      accessibilityState={{ selected: isSelected }}
    >
      <View style={styles.giftCardImageContainer}>
        <View style={styles.giftCardImagePlaceholder} />
      </View>
      <AppText
        style={[
          styles.giftCardOptionText,
          isSelected && styles.giftCardOptionTextSelected,
        ]}
      >
        {card.title}
      </AppText>
    </TouchableOpacity>
  );
});

GiftCardOptionItem.displayName = 'GiftCardOptionItem';

/**
 * Amount Button Component
 * Memoized for performance optimization
 */
const AmountButton = React.memo<{
  amount: string;
  isSelected: boolean;
  onPress: (amount: string) => void;
  styles: ReturnType<typeof createStyles>;
}>(({ amount, isSelected, onPress, styles }) => {
  const handlePress = useCallback(() => {
    onPress(amount);
  }, [amount, onPress]);

  return (
    <TouchableOpacity
      style={[
        styles.amountButton,
        isSelected && styles.amountButtonSelected,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Select amount ${amount}`}
      accessibilityState={{ selected: isSelected }}
    >
      <AppText
        style={[
          styles.amountButtonText,
          isSelected && styles.amountButtonTextSelected,
        ]}
      >
        {amount}
      </AppText>
    </TouchableOpacity>
  );
});

AmountButton.displayName = 'AmountButton';

/**
 * Input Icon Component
 * Memoized for performance optimization
 */
const InputIcon = React.memo<{
  source: any;
  style: any;
}>(({ source, style }) => {
  if (!source) return null;

  return (
    <FastImage
      source={source}
      style={style}
      resizeMode={FastImage.resizeMode.contain}
      defaultSource={ICONS.userBig} // Fallback icon
    />
  );
});

InputIcon.displayName = 'InputIcon';

const GiftScreen: React.FC = () => {
  const navigation = useNavigation<GiftScreenNavigationProp>();
  const { colors, spacing, borderRadius } = useTheme();
  const { handleError, handleAsyncError } = useErrorHandler('GiftScreen');

  // State for form inputs
  const [selectedGiftCard, setSelectedGiftCard] = useState<string>('gift-card');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [toName, setToName] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gift card options - memoized to prevent unnecessary re-renders
  const giftCardOptions: GiftCardOption[] = useMemo(
    () => [
      {
        id: 'gift-card',
        title: 'Gift Card',
        backgroundColor: '#FFF5E6',
      },
      {
        id: 'happy-birthday',
        title: 'Happy Birthday',
        backgroundColor: '#FFF5E6',
      },
      {
        id: 'happy-anniversary',
        title: 'Happy Anniversary',
        backgroundColor: '#FFF5E6',
      },
      {
        id: 'best-wishes',
        title: 'Best Wishes',
        backgroundColor: '#FFF5E6',
      },
    ],
    []
  );

  // Predefined amounts - memoized
  const predefinedAmounts = useMemo(() => ['$50', '$100', '$150', '$200'], []);

  // Styles - memoized with proper dependencies
  const styles = useMemo(
    () => {
      if (!colors || !spacing || !borderRadius) {
        return null;
      }
      return createStyles(colors, spacing, borderRadius);
    },
    [colors, spacing, borderRadius]
  );

  // Memoized callbacks to prevent unnecessary re-renders
  const handleGiftCardSelect = useCallback(
    (id: string) => {
      try {
        setSelectedGiftCard(id);
      } catch (error) {
        handleError(error, 'Failed to select gift card');
      }
    },
    [handleError]
  );

  const handleAmountSelect = useCallback(
    (amount: string) => {
      try {
        setSelectedAmount(amount);
        setCustomAmount('');
      } catch (error) {
        handleError(error, 'Failed to select amount');
      }
    },
    [handleError]
  );

  const handleCustomAmountChange = useCallback(
    (text: string) => {
      try {
        // Only allow numeric input
        const numericValue = text.replace(/[^0-9]/g, '');
        setCustomAmount(numericValue);
        if (numericValue) {
          setSelectedAmount('');
        }
      } catch (error) {
        handleError(error, 'Failed to update custom amount');
      }
    },
    [handleError]
  );

  const handleAddToCart = useCallback(async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Validate required fields
      if (!fromName?.trim()) {
        // TODO: Show error toast
        console.warn('From name is required');
        return;
      }

      if (!fromEmail?.trim() || !fromEmail.includes('@')) {
        // TODO: Show error toast
        console.warn('Valid from email is required');
        return;
      }

      if (!toName?.trim()) {
        // TODO: Show error toast
        console.warn('To name is required');
        return;
      }

      if (!toEmail?.trim() || !toEmail.includes('@')) {
        // TODO: Show error toast
        console.warn('Valid to email is required');
        return;
      }

      const amount = selectedAmount || customAmount;
      if (!amount) {
        // TODO: Show error toast
        console.warn('Please select or enter an amount');
        return;
      }

      // Prepare cart data
      const cartData = {
        selectedGiftCard,
        amount,
        from: {
          name: fromName.trim(),
          email: fromEmail.trim(),
        },
        to: {
          name: toName.trim(),
          email: toEmail.trim(),
        },
        message: message?.trim() || '',
      };

      // TODO: Implement actual API call
      await handleAsyncError(
        async () => {
          // Simulate API call
          await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
          console.log('Add to cart:', cartData);
          // TODO: Navigate to cart or show success message
        },
        'Failed to add gift card to cart'
      );
    } catch (error) {
      handleError(error, 'Failed to add to cart');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isSubmitting,
    fromName,
    fromEmail,
    toName,
    toEmail,
    selectedAmount,
    customAmount,
    selectedGiftCard,
    message,
    handleError,
    handleAsyncError,
  ]);

  // Early return if theme is not available
  if (!colors || !spacing || !borderRadius || !styles) {
    return (
      <SafeAreaView edges={['top']} style={styles?.container}>
        <LoadingFallback />
      </SafeAreaView>
    );
  }

  // Get icon sources with null checks
  const userIcon = ICONS?.user;
  const mailIcon = ICONS?.mailBig;
  const descriptionIcon = ICONS?.description;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Fixed Header */}
      <ScreenHeader title="Buy a Gift Card" />

      {/* Scrollable Content */}
      <Suspense fallback={<LoadingFallback />}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Select a Gift Card Section */}
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>Select a Gift Card</AppText>
            <View style={styles.giftCardGrid}>
              {giftCardOptions?.map((card) => (
                <GiftCardOptionItem
                  key={card.id}
                  card={card}
                  isSelected={selectedGiftCard === card.id}
                  onPress={handleGiftCardSelect}
                  styles={styles}
                />
              ))}
            </View>
          </View>

          {/* Select Amount Section */}
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>Select Amount</AppText>
            <AppTextInput
              placeholder="Enter Tip Amount"
              value={customAmount}
              onChangeText={handleCustomAmountChange}
              keyboardType="numeric"
              containerStyle={styles.amountInput}
              editable={!isSubmitting}
            />
            <View style={styles.predefinedAmountsContainer}>
              {predefinedAmounts?.map((amount) => (
                <AmountButton
                  key={amount}
                  amount={amount}
                  isSelected={selectedAmount === amount}
                  onPress={handleAmountSelect}
                  styles={styles}
                />
              ))}
            </View>
          </View>

          {/* From Section */}
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>From</AppText>
            <AppTextInput
              placeholder="Name"
              value={fromName}
              onChangeText={(text) => setFromName(text)}
              leftIcon={userIcon ? <InputIcon source={userIcon} style={styles.inputIcon} /> : null}
              containerStyle={styles.inputContainer}
              editable={!isSubmitting}
            />
            <AppTextInput
              placeholder="Email"
              value={fromEmail}
              onChangeText={(text) => setFromEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon={mailIcon ? <InputIcon source={mailIcon} style={styles.inputIcon} /> : null}
              containerStyle={styles.inputContainer}
              editable={!isSubmitting}
            />
          </View>

          {/* To Section */}
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>To</AppText>
            <AppTextInput
              placeholder="Name"
              value={toName}
              onChangeText={(text) => setToName(text)}
              leftIcon={userIcon ? <InputIcon source={userIcon} style={styles.inputIcon} /> : null}
              containerStyle={styles.inputContainer}
              editable={!isSubmitting}
            />
            <AppTextInput
              placeholder="Email"
              value={toEmail}
              onChangeText={(text) => setToEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon={mailIcon ? <InputIcon source={mailIcon} style={styles.inputIcon} /> : null}
              containerStyle={styles.inputContainer}
              editable={!isSubmitting}
            />
            <AppTextInput
              placeholder="Message"
              value={message}
              onChangeText={(text) => setMessage(text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              leftIcon={
                descriptionIcon ? (
                  <InputIcon source={descriptionIcon} style={styles.inputIcon} />
                ) : null
              }
              containerStyle={StyleSheet.flatten([
                styles.inputContainer,
                styles.messageInputContainer,
              ])}
              editable={!isSubmitting}
            />
          </View>

          {/* Add to Cart Button */}
        
        </ScrollView>
        <View style={styles.addToCartButtonContainer}>
         <AppButton
            title="ADD TO CART"
            onPress={handleAddToCart}
            variant="primary"
            style={styles.addToCartButton}
            textStyle={styles.addToCartButtonText}
            disabled={isSubmitting}
            loading={isSubmitting}
          />
         </View>
      </Suspense>
    </SafeAreaView>
  );
};

// Loading container styles
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GiftScreen;
