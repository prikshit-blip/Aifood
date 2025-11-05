import React, { useMemo, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  ImageRequireSource,
  ImageURISource,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {
  ImageStyle,
  Priority,
  ResizeMode,
  Source,
} from 'react-native-fast-image';

// ========== Type Definitions ==========
export type ImageSourcePropType =
  | ImageURISource
  | ImageURISource[]
  | ImageRequireSource;

export type AppImageSource =
  | number // require('...')
  | string // URI string
  | ImageURISource // { uri: string }
  | ImageSourcePropType
  | Source;

export interface AppImageProps {
  /** Image source - can be URI string, require(), or ImageURISource */
  source: AppImageSource | null | undefined;
  /** Image style */
  style?: StyleProp<ImageStyle>;
  /** Container style */
  containerStyle?: StyleProp<ViewStyle>;
  /** Resize mode */
  resizeMode?: ResizeMode;
  /** Image priority */
  priority?: Priority;
  /** Cache strategy */
  cache?: 'immutable' | 'web' | 'cacheOnly';
  /** Default source (require() only) */
  defaultSource?: number;
  /** Placeholder shown while loading */
  placeholderSource?: AppImageSource;
  /** Error fallback image */
  errorSource?: AppImageSource;
  /** Show loading indicator */
  showLoading?: boolean;
  /** Loading indicator color */
  loadingColor?: string;
  /** Tint color (for icons) */
  tintColor?: string;
  /** Make image pressable */
  onPress?: () => void;
  /** Hit slop for pressable */
  hitSlop?: { top?: number; bottom?: number; left?: number; right?: number };
  /** Callback when load starts */
  onLoadStart?: () => void;
  /** Callback when load ends */
  onLoadEnd?: () => void;
  /** Callback on error */
  onError?: () => void;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
}

// ========== Helper Functions ==========
/**
 * Normalize various source types to FastImage Source format
 */
const normalizeSource = (
  src: AppImageSource | null | undefined,
  priority: Priority,
  cache: 'immutable' | 'web' | 'cacheOnly'
): Source | undefined => {
  if (!src) return undefined;

  // Handle number (require())
  if (typeof src === 'number') {
    return src as unknown as Source;
  }

  // Handle string (URI)
  if (typeof src === 'string') {
    return {
      uri: src,
      priority,
      cache,
    } as Source;
  }

  // Handle ImageURISource or object with uri
  if (typeof src === 'object' && src !== null) {
    // Check if it's already a Source with priority/cache
    if ('uri' in src && 'priority' in src) {
      return src as Source;
    }

    // Handle ImageURISource { uri: string }
    if ('uri' in src && typeof (src as any).uri === 'string') {
      return {
        uri: (src as any).uri,
        priority,
        cache,
      } as Source;
    }

    // Handle array (take first element)
    if (Array.isArray(src) && src.length > 0) {
      return normalizeSource(src[0], priority, cache);
    }

    // Try to use as Source directly
    return src as Source;
  }

  return undefined;
};

/**
 * Optimized AppImage Component
 * - Handles loading states
 * - Error fallbacks
 * - Placeholder support
 * - Pressable support
 * - Type-safe source handling
 */
const AppImage: React.FC<AppImageProps> = ({
  source,
  style,
  containerStyle,
  tintColor,
  resizeMode = FastImage.resizeMode.cover,
  priority = FastImage.priority.normal,
  cache = 'web',
  defaultSource,
  placeholderSource,
  errorSource,
  showLoading = true,
  loadingColor = '#999999',
  onPress,
  hitSlop,
  onLoadStart,
  onLoadEnd,
  onError,
  accessibilityLabel,
  testID,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [imageKey, setImageKey] = useState<number>(0); // Force re-render on source change

  // Normalize source to FastImage Source format
  const normalizedSource = useMemo<Source | undefined>(() => {
    if (!source) return undefined;

    // If error occurred and errorSource provided, use error source
    if (hasError && errorSource) {
      return normalizeSource(errorSource, priority, cache);
    }

    // If loading and placeholder provided, show placeholder
    if (isLoading && placeholderSource) {
      return normalizeSource(placeholderSource, priority, cache);
    }

    // Normalize the main source
    return normalizeSource(source, priority, cache);
  }, [source, hasError, errorSource, isLoading, placeholderSource, priority, cache]);

  // Reset error state when source changes
  React.useEffect(() => {
    if (source) {
      setHasError(false);
      setIsLoading(true);
      setImageKey((prev) => prev + 1);
    }
  }, [source]);

  // Handlers
  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    onLoadStart?.();
  }, [onLoadStart]);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
    onLoadEnd?.();
  }, [onLoadEnd]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  // Render loading indicator
  const renderLoadingIndicator = () => {
    if (!showLoading || !isLoading) return null;

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={loadingColor} />
      </View>
    );
  };

  // Render image element
  const imageElement = normalizedSource ? (
    <FastImage
      key={imageKey}
      style={style}
      source={normalizedSource}
      resizeMode={resizeMode}
      defaultSource={defaultSource}
      onLoadStart={handleLoadStart}
      onLoadEnd={handleLoadEnd}
      onError={handleError}
      tintColor={tintColor}
      accessibilityLabel={accessibilityLabel}
      accessible={!!accessibilityLabel}
      testID={testID}
    />
  ) : null;

  // If no source, return null or placeholder
  if (!normalizedSource && !placeholderSource) {
    return null;
  }

  // If pressable
  if (onPress) {
    return (
      <Pressable
        style={[styles.container, containerStyle]}
        onPress={onPress}
        hitSlop={hitSlop || 8}
        testID={testID ? `${testID}-pressable` : undefined}
      >
        {imageElement}
        {renderLoadingIndicator()}
      </Pressable>
    );
  }

  // Regular view
  return (
    <View
      style={[styles.container, containerStyle]}
      testID={testID}
    >
      {imageElement}
      {renderLoadingIndicator()}
    </View>
  );
};

// Memoize component for performance
const MemoizedAppImage = React.memo(AppImage);

// Styles
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});

export default MemoizedAppImage;
