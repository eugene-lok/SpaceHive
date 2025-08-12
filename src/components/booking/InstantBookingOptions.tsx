// src/components/booking/InstantBookingOptions.tsx
import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  FlatList, 
  Dimensions, 
  Animated,
  PanResponder,
} from 'react-native';
import { Location } from '../../types/instantBooking';
import InstantBookingCard from './InstantBookingCard';

const { height: screenHeight } = Dimensions.get('window');

interface InstantBookingOptionsProps {
  locations: Location[];
  onLocationPress: (location: Location) => void;
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

const InstantBookingOptions: React.FC<InstantBookingOptionsProps> = ({
  locations,
  onLocationPress,
  isExpanded,
  onExpandedChange,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);

  // Heights and positioning
  const VISIBLE_COLLAPSED_HEIGHT = screenHeight / 3; // Only 1/3 visible when collapsed
  const FULL_COMPONENT_HEIGHT = screenHeight * 0.85; // Full component height when expanded
  const SUMMARY_HEIGHT = 80; // Approximate summary + safe area height
  
  // Calculate how far up it can scroll (to meet bottom of summary)
  const MAX_SCROLL_UP = -(screenHeight - VISIBLE_COLLAPSED_HEIGHT - SUMMARY_HEIGHT);

  useEffect(() => {
    const toValue = isExpanded ? MAX_SCROLL_UP : 0;
    lastOffset.current = toValue;
    Animated.spring(translateY, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [isExpanded, translateY, MAX_SCROLL_UP]);

  // ONLY handle responds to pan gestures
  const handlePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > 5;
    },
    onPanResponderGrant: () => {
      translateY.setOffset(lastOffset.current);
      translateY.setValue(0);
    },
    onPanResponderMove: (_, gestureState) => {
      // Constrain movement: 0 (collapsed) to MAX_SCROLL_UP (expanded)
      const constrainedDy = Math.max(MAX_SCROLL_UP - lastOffset.current, Math.min(-lastOffset.current, gestureState.dy));
      translateY.setValue(constrainedDy);
    },
    onPanResponderRelease: (_, gestureState) => {
      const threshold = MAX_SCROLL_UP / 2;
      const currentOffset = lastOffset.current + gestureState.dy;
      
      let shouldExpand = false;
      
      if (Math.abs(gestureState.vy) > 0.5) {
        shouldExpand = gestureState.vy < 0; // Negative velocity = upward
      } else {
        shouldExpand = currentOffset < threshold;
      }
      
      const finalPosition = shouldExpand ? MAX_SCROLL_UP : 0;
      lastOffset.current = finalPosition;
      
      translateY.flattenOffset();
      Animated.spring(translateY, {
        toValue: finalPosition,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start(() => {
        onExpandedChange(shouldExpand);
      });
    },
  });

  const containerStyle = {
    transform: [{ translateY }],
  };

  return (
    <Animated.View style={[styles.container, { height: FULL_COMPONENT_HEIGHT }, containerStyle]}>
      {/* Handle - ONLY this responds to drag gestures */}
      <View style={styles.handleContainer} {...handlePanResponder.panHandlers}>
        <View style={styles.handle} />
      </View>
      
      <View style={styles.header}>
        <View style={styles.resultCount}>
          <Text style={styles.resultText}>{locations.length} venues</Text>
        </View>
      </View>
      
      {/* FlatList - NO pan handlers, only scrolls content */}
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <InstantBookingCard
            location={item}
            onPress={onLocationPress}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
        bounces={false}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // Position so only bottom 1/3 is visible initially
    bottom: -(screenHeight * 0.85 - screenHeight / 3), // Hide top portion, show only bottom 1/3
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  handleContainer: {
    paddingVertical: 12,
    alignItems: 'center',
    // Increase touch area for better UX
    paddingHorizontal: 50,
  },
  handle: {
    width: 80,
    height: 4,
    backgroundColor: '#D1D1D6',
    borderRadius: 2,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  resultCount: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  listContent: {
    paddingBottom: 120, // Space for bottom navigation
  },
});

export default InstantBookingOptions;