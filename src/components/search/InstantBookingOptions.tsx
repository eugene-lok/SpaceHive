// src/components/booking/InstantBookingOptions.tsx - SIMPLE SOLUTION
import React, { useRef, useEffect, useCallback } from 'react';
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

  // SIMPLE: Fixed heights
  const COMPONENT_HEIGHT = screenHeight * 0.75; // Fixed height that works everywhere
  const COLLAPSED_POSITION = 0; // Stay where positioned
  
  // SIMPLE: When expanded, move up just enough to show more content 
  // but keep handle visible below summary + safe area
  const EXPANDED_MOVE_UP = screenHeight * 0.35; // Move up by 35% of screen
  
  // SIMPLE: Ensure last card is above navbar
  const BOTTOM_PADDING = bottomNavHeight + insets.bottom + 30;

  useEffect(() => {
    const toValue = isExpanded ? -EXPANDED_MOVE_UP : COLLAPSED_POSITION;
    lastOffset.current = toValue;
    
    Animated.spring(translateY, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [isExpanded, EXPANDED_MOVE_UP]);

  // Scroll to selected location card
  const scrollToLocation = useCallback((locationId: number) => {
    if (!flatListRef.current) return;
    
    const selectedIndex = locations.findIndex(location => location.id === locationId);
    if (selectedIndex === -1) return;

    flatListRef.current.scrollToIndex({
      index: selectedIndex,
      animated: true,
      viewPosition: 0,
    });
  }, [locations]);

  useEffect(() => {
    if (selectedLocationId !== undefined) {
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
      // SIMPLE: Constrain movement between collapsed and expanded positions
      const constrainedDy = Math.max(-EXPANDED_MOVE_UP - lastOffset.current, Math.min(-lastOffset.current, gestureState.dy));
      translateY.setValue(constrainedDy);
    },
    onPanResponderRelease: (_, gestureState) => {
      const threshold = -EXPANDED_MOVE_UP / 2;
      const currentOffset = lastOffset.current + gestureState.dy;
      
      let shouldExpand = false;
      
      if (Math.abs(gestureState.vy) > 0.5) {
        shouldExpand = gestureState.vy < 0;
      } else {
        shouldExpand = currentOffset < threshold;
      }
      
      const finalPosition = shouldExpand ? -EXPANDED_MOVE_UP : COLLAPSED_POSITION;
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

  // Handle scroll errors gracefully
  const handleScrollToIndexFailed = useCallback((info: any) => {
    console.log('Scroll to index failed:', info);
    if (flatListRef.current) {
      const offset = info.index * 200;
      flatListRef.current.scrollToOffset({ 
        offset, 
        animated: true 
      });
    }
  }, []);

  return (
    <Animated.View style={[styles.container, { height: COMPONENT_HEIGHT }, containerStyle]}>
      {/* Handle - Always accessible */}
      <View style={styles.handleContainer} {...handlePanResponder.panHandlers}>
        <View style={styles.handle} />
      </View>
      
      <View style={styles.header}>
        <View style={styles.resultCount}>
          <Text style={styles.resultText}>{locations.length} venues</Text>
        </View>
      </View>
      
      {/* FlatList with proper bottom padding */}
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
        contentContainerStyle={{ paddingBottom: BOTTOM_PADDING }}
        scrollEnabled={true}
        bounces={false}
        onScrollToIndexFailed={handleScrollToIndexFailed}
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
    bottom: -(screenHeight * 0.25), // SIMPLE: Position so 75% is visible when collapsed
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
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