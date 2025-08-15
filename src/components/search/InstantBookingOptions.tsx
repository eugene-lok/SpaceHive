// src/components/booking/InstantBookingOptions.tsx - Updated with scroll-to-card
import React, { useRef, useEffect, useCallback, useState} from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  FlatList, 
  Dimensions, 
  Animated,
  PanResponder,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Location } from '../../types/instantBooking';
import InstantBookingCard from './InstantBookingCard';

const { height: screenHeight } = Dimensions.get('window');

interface InstantBookingOptionsProps {
  locations: Location[];
  selectedLocationId?: number;
  onLocationPress: (location: Location) => void;
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  summaryContainerHeight?: number; 
  bottomNavHeight?: number;
}

const InstantBookingOptions: React.FC<InstantBookingOptionsProps> = ({
  locations,
  selectedLocationId,
  onLocationPress,
  isExpanded,
  onExpandedChange,
  summaryContainerHeight = 100,
  bottomNavHeight = 80,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const dynamicBottomPadding = bottomNavHeight + insets.bottom + 20;

  // Heights and positioning
  const VISIBLE_COLLAPSED_HEIGHT = screenHeight / 2;
  const SAFE_TOP_MARGIN = insets.top + 60;
  const FULL_COMPONENT_HEIGHT = screenHeight - SAFE_TOP_MARGIN;
  const MAX_SCROLL_UP = -(FULL_COMPONENT_HEIGHT - VISIBLE_COLLAPSED_HEIGHT + SAFE_TOP_MARGIN);

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

  // NEW: Scroll to selected location card
  const scrollToLocation = useCallback((locationId: number) => {
    if (!flatListRef.current) return;
    
    const selectedIndex = locations.findIndex(location => location.id === locationId);
    if (selectedIndex === -1) return;

    // Fast animated scroll to bring selected card to top
    flatListRef.current.scrollToIndex({
      index: selectedIndex,
      animated: true,
      viewPosition: 0, // 0 = top of visible area
    });
  }, [locations]);

  // NEW: Effect to scroll when selectedLocationId changes
  useEffect(() => {
    if (selectedLocationId !== undefined) {
      // Small delay to ensure FlatList is ready
      setTimeout(() => {
        scrollToLocation(selectedLocationId);
      }, 100);
    }
  }, [selectedLocationId, scrollToLocation]);

  // Pan responder for drag gestures
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
      const constrainedDy = Math.max(MAX_SCROLL_UP - lastOffset.current, Math.min(-lastOffset.current, gestureState.dy));
      translateY.setValue(constrainedDy);
    },
    onPanResponderRelease: (_, gestureState) => {
      const threshold = MAX_SCROLL_UP / 2;
      const currentOffset = lastOffset.current + gestureState.dy;
      
      let shouldExpand = false;
      
      if (Math.abs(gestureState.vy) > 0.5) {
        shouldExpand = gestureState.vy < 0;
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
  
  const getContainerPosition = () => {
    return -(screenHeight * 0.85 - screenHeight / 2.5);
  };

  // NEW: Handle scroll errors gracefully
  const handleScrollToIndexFailed = useCallback((info: any) => {
    console.log('Scroll to index failed:', info);
    // Fallback: scroll to offset
    if (flatListRef.current) {
      const offset = info.index * 200; // Approximate card height
      flatListRef.current.scrollToOffset({ 
        offset, 
        animated: true 
      });
    }
  }, []);

  return (
    <Animated.View style={[styles.container, { height: FULL_COMPONENT_HEIGHT, bottom: getContainerPosition()}, containerStyle]}>
      {/* Handle - ONLY this responds to drag gestures */}
      <View style={styles.handleContainer} {...handlePanResponder.panHandlers}>
        <View style={styles.handle} />
      </View>
      
      <View style={styles.header}>
        <View style={styles.resultCount}>
          <Text style={styles.resultText}>{locations.length} venues</Text>
        </View>
      </View>
      
      {/* FlatList with ref and scroll functionality */}
      <FlatList
        ref={flatListRef}
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <InstantBookingCard
            location={item}
            isSelected={selectedLocationId === item.id}
            onPress={onLocationPress}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: dynamicBottomPadding}}
        scrollEnabled={true}
        bounces={false}
        // NEW: Handle scroll errors
        onScrollToIndexFailed={handleScrollToIndexFailed}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={10}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -(screenHeight * 0.85 - screenHeight / 2.5),
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
});

export default InstantBookingOptions;