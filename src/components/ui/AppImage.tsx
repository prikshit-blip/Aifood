import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import FastImage, { ImageStyle, Priority, ResizeMode, Source } from 'react-native-fast-image';

export type AppImageSource = number | { uri: string } | Source;

interface AppImageProps {
  tintColor?: string;
  source: AppImageSource | null | undefined;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  resizeMode?: ResizeMode;
  priority?: Priority;
  cache?: 'immutable' | 'web' | 'cacheOnly';
  defaultSource?: number; // require('...') only for RN defaultSource
  placeholderSource?: AppImageSource; // shown while loading
  errorSource?: AppImageSource; // shown on error
  showLoading?: boolean;
  onPress?: () => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: () => void;
  accessibilityLabel?: string;
}

const AppImage: React.FC<AppImageProps> = ({
  source,
  style,
  containerStyle,
  tintColor="black",
  resizeMode = FastImage.resizeMode.cover,
  priority = FastImage.priority.normal,
  cache = 'web',
  defaultSource,
  placeholderSource,
  errorSource,
  showLoading = true,
  onPress,
  onLoadStart,
  onLoadEnd,
  onError,
  accessibilityLabel,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const finalSource = useMemo<Source | undefined>(() => {
    if (hasError && errorSource) {
      return normalizeSource(errorSource, priority, cache);
    }
    const effective = isLoading && placeholderSource ? placeholderSource : source;
    if (!effective) return undefined;
    return normalizeSource(effective, priority, cache);
  }, [hasError, errorSource, isLoading, placeholderSource, source, priority, cache]);

  const handleLoadStart = () => {
    setHasError(false);
    setIsLoading(true);
    onLoadStart && onLoadStart();
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
    onLoadEnd && onLoadEnd();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError && onError();
  };

  const ImageElement = (
    <FastImage
      style={style as ImageStyle}
      source={finalSource}
      resizeMode={resizeMode}
      defaultSource={defaultSource}
      onLoadStart={handleLoadStart}
      onLoadEnd={handleLoadEnd}
      onError={handleError}
      tintColor={tintColor}
      accessibilityLabel={accessibilityLabel}
      accessible={!!accessibilityLabel}
    />
  );

  if (onPress) {
    return (
      <Pressable style={[styles.container, containerStyle]} onPress={onPress} hitSlop={8}>
        {ImageElement}
        {showLoading && isLoading ? (
          <ActivityIndicator style={StyleSheet.absoluteFill} />
        ) : null}
      </Pressable>
    );
  }

  return (
    <View style={[styles.container, containerStyle] as StyleProp<ViewStyle>}>
      {ImageElement}
      {showLoading && isLoading ? <ActivityIndicator style={StyleSheet.absoluteFill} /> : null}
    </View>
  );
};

function normalizeSource(src: AppImageSource, priority: Priority, cache: 'immutable' | 'web' | 'cacheOnly'): Source {
  if (typeof src === 'number') {
    return src as unknown as Source;
  }
  const uri = 'uri' in (src as any) ? (src as any).uri : undefined;
  if (!uri) {
    return src as Source;
  }
  return {
    uri,
    priority,
    cache,
  } as Source;
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});

export default AppImage;


