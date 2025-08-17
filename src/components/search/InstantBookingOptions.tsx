// src/components/search/InstantBookingOptions.tsx
// Enhanced version with prominent draggable handle

import React, { useRef, useEffect, useCallback, useState } from 'react';
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
  
  // NEW: State to track when user is actively dragging
  const [isDragging, setIsDragging] = useState(false);
  
  // NEW: Animated value for handle styling during drag
  const handleScale = useRef(new Animated.Value(1)).current;
  const handleOpacity = useRef(new Animated.Value(1)).current;

  // Fixed heights
  const COMPONENT_HEIGHT = screenHeight * 0.75;
  const COLLAPSED_POSITION = 0;
  const EXPANDED_MOVE_UP = screenHeight * 0.35;
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

  // NEW: Animate handle to prominent state
  const animateHandleToActive = () => {
    Animated.parallel([
      Animated.spring(handleScale, {
        toValue: 1.2, // Scale up by 20%
        useNativeDriver: true,
        tension: 150,
        friction: 8,
      }),
      Animated.timing(handleOpacity, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // NEW: Animate handle back to normal state
  const animateHandleToNormal = () => {
    Animated.parallel([
      Animated.spring(handleScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 150,
        friction: 8,
      }),
      Animated.timing(handleOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

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

  // ENHANCED: Pan responder with handle visual feedback
  const handlePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > 5;
    },
    onPanResponderGrant: () => {
      // MODIFIED: Make handle prominent when user starts dragging
      setIsDragging(true);
      animateHandleToActive();
      
      translateY.setOffset(lastOffset.current);
      translateY.setValue(0);
    },
    onPanResponderMove: (_, gestureState) => {
      // Constrain movement between collapsed and expanded positions
      const constrainedDy = Math.max(-EXPANDED_MOVE_UP - lastOffset.current, Math.min(-lastOffset.current, gestureState.dy));
      translateY.setValue(constrainedDy);
    },
    onPanResponderRelease: (_, gestureState) => {
      // MODIFIED: Reset handle appearance when user releases
      setIsDragging(false);
      animateHandleToNormal();
      
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

  // NEW: Dynamic handle style based on drag state
  const handleAnimatedStyle = {
    transform: [{ scaleX: handleScale }, { scaleY: handleScale }],
    opacity: handleOpacity,
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
      {/* ENHANCED: Handle with visual feedback */}
      <View style={styles.handleContainer} {...handlePanResponder.panHandlers}>
        <Animated.View 
          style={[
            styles.handle, 
            isDragging && styles.handleActive,
            handleAnimatedStyle
          ]} 
        />
        {/* OPTIONAL: Add subtle text hint when dragging */}
        {isDragging && (
          <Animated.Text style={[styles.dragHint, { opacity: handleOpacity }]}>
            {isExpanded ? 'Drag down to collapse' : 'Drag up to expand'}
          </Animated.Text>
        )}
      </View>
      
      <View style={styles.header}>
        <View style={styles.resultCount}>
          <Text style={styles.resultText}>{locations.length} venues</Text>
        </View>
      </View>
      
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
    bottom: -(screenHeight * 0.25),
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
  // NEW: Enhanced handle style when active/dragging
  handleActive: {
    backgroundColor: '#007AFF', // iOS blue or use your theme color
    height: 6, // Slightly taller
    width: 100, // Slightly wider
    borderRadius: 3,
    // Add shadow for more prominence
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  // NEW: Optional drag hint text
  dragHint: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
    fontWeight: '500',
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