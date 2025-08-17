// src/screens/search/InstantBookingDetailsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { RootStackParamList } from '../../../App';
import { Location } from '../../types/instantBooking';
import { theme } from '../../theme/theme';

const { width: screenWidth } = Dimensions.get('window');

type InstantBookingDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'InstantBookingDetails'>;
type InstantBookingDetailsRouteProp = RouteProp<RootStackParamList, 'InstantBookingDetails'>;

interface InstantBookingDetailsProps {
  navigation: InstantBookingDetailsNavigationProp;
  route: InstantBookingDetailsRouteProp;
}

// Mock data for sections
const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
];

// New: What's included mock data
const MOCK_WHATS_INCLUDED = [
  { id: 1, icon: 'bed', text: '1 Bedroom' },
  { id: 2, icon: 'kitchen', text: '1 Kitchen' },
];

const MOCK_AMENITIES = [
  { id: 1, name: 'WiFi', icon: 'wifi' },
  { id: 2, name: 'City skyline view', icon: 'landscape' },
  { id: 3, name: 'Coffee', icon: 'local-cafe' },
  { id: 4, name: 'Kitchen', icon: 'kitchen' },
  { id: 5, name: 'Parking', icon: 'local-parking' },
  { id: 6, name: 'Air Conditioning', icon: 'ac-unit' },
  { id: 7, name: 'TV', icon: 'tv' },
  { id: 8, name: 'Sound system', icon: 'volume-up' },
];

const MOCK_VENUE_OFFERS = [
  'Professional cleaning between bookings',
  'High-speed internet throughout',
  'Kitchen with full appliances',
  'Flexible furniture arrangement',
  'Sound system available',
  'Natural lighting',
  'City view terrace',
  'Meeting space setup',
];

const MOCK_VENUE_RULES = [
  {
    title: 'Food and Drink',
    icon: 'restaurant',
    content: 'Outside food and catering are welcome. Please clean up after use.',
  },
  {
    title: 'Alcohol',
    icon: 'local-bar',
    content: 'Alcohol is allowed.',
  },
  {
    title: 'Smoking / Vaping',
    icon: 'smoke-free',
    content: 'Smoking and vaping are not allowed inside the venue.',
  },
  {
    title: 'Pets',
    icon: 'pets',
    content: 'Pets are not allowed, except for certified service animals.',
  },
  {
    title: 'Decorations',
    icon: 'celebration',
    content: 'Decorations are welcome but must not damage walls, floors, or furniture. Please remove them after your event.',
  },
  {
    title: 'Loud Music',
    icon: 'volume-up',
    content: 'Keep music volume at a reasonable level to respect neighbors.',
  },
  {
    title: 'Rearranging Furniture',
    icon: 'chair',
    content: 'Furniture may be moved, but please return it to its original layout before leaving.',
  },
];

const MOCK_TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    text: 'Perfect space for our team meeting. Great natural light and very clean!',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Mike D.',
    rating: 5,
    text: 'Amazing view and very responsive host. Would definitely book again.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
];

const InstantBookingDetailsScreen: React.FC<InstantBookingDetailsProps> = ({
  navigation,
  route,
}) => {
  const { location } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [readMoreExpanded, setReadMoreExpanded] = useState(false);
  const [expandedRules, setExpandedRules] = useState<number[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const toggleRuleExpansion = (index: number) => {
    setExpandedRules(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleSectionExpansion = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const renderImageCarousel = () => (
    <View style={styles.imageCarouselContainer}>
      <FlatList
        data={MOCK_IMAGES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentImageIndex(index);
        }}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.carouselImage} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      
      {/* Header buttons */}
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.rightButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="share" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="favorite-border" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image indicator */}
      <View style={styles.imageIndicator}>
        <Text style={styles.imageIndicatorText}>
          {currentImageIndex + 1} / {MOCK_IMAGES.length}
        </Text>
      </View>
    </View>
  );

  // MODIFIED: Changed to pill-shaped attributes
  const renderAttributes = () => (
    <View style={styles.attributesContainer}>
      <View style={styles.attributePills}>
        <View style={styles.attributePill}>
          <MaterialIcons name="music-note" size={14} color="#666" />
          <Text style={styles.attributePillText}>Music-Friendly</Text>
        </View>
        <View style={styles.attributePill}>
          <MaterialIcons name="local-cafe" size={14} color="#666" />
          <Text style={styles.attributePillText}>Cozy</Text>
        </View>
        <View style={styles.attributePill}>
          <MaterialIcons name="lock" size={14} color="#666" />
          <Text style={styles.attributePillText}>Private</Text>
        </View>
        <View style={styles.attributePill}>
          <MaterialIcons name="wb-sunny" size={14} color="#666" />
          <Text style={styles.attributePillText}>Natural Light</Text>
        </View>
        <View style={styles.attributePill}>
          <MaterialIcons name="directions-transit" size={14} color="#666" />
          <Text style={styles.attributePillText}>Transit-Friendly</Text>
        </View>
        <View style={styles.attributePill}>
          <MaterialIcons name="group" size={14} color="#666" />
          <Text style={styles.attributePillText}>3</Text>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.locationTitle}>{location.title}</Text>
      <Text style={styles.locationSubtitle}>{location.location}</Text>
      <View style={styles.ratingContainer}>
        <MaterialIcons name="star" size={16} color="#000" />
        <Text style={styles.ratingText}>{location.rating} ·</Text>
        <Text style={styles.reviewsText}>110 reviews</Text>
        {/* <Text style={styles.cityText}> · Calgary, Canada</Text> */}
      </View>
    </View>
  );

  const renderDescription = () => (
    <View style={styles.section}>
      <Text style={styles.descriptionText} numberOfLines={readMoreExpanded ? undefined : 3}>
        This modern workspace features floor-to-ceiling windows with stunning city views. 
        Perfect for team meetings, workshops, or creative sessions. The space includes high-speed WiFi, 
        a fully equipped kitchen, and flexible seating arrangements to accommodate various group sizes.
      </Text>
      <TouchableOpacity onPress={() => setReadMoreExpanded(!readMoreExpanded)}>
        <Text style={styles.readMoreText}>
          {readMoreExpanded ? 'Show less' : 'Read more'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // NEW: What's included carousel
  const renderWhatsIncluded = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>What's included</Text>
      <FlatList
        data={MOCK_WHATS_INCLUDED}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.whatsIncludedContainer}
        renderItem={({ item }) => (
          <View style={styles.whatsIncludedCard}>
            <MaterialIcons name={item.icon} size={24} color="#333" />
            <Text style={styles.whatsIncludedText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  const renderAmenitiesCarousel = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Amenities</Text>
      <FlatList
        data={MOCK_AMENITIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.amenityCard}>
            <MaterialIcons name={item.icon} size={24} color="#000" />
            <Text style={styles.amenityCardText}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  // MODIFIED: Changed to list with icons and expandable button
  const renderVenueOffers = () => {
    const displayedAmenities = showAllAmenities ? MOCK_AMENITIES : MOCK_AMENITIES.slice(0, 3);
    const hasMoreAmenities = MOCK_AMENITIES.length > 3;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What this venue offers</Text>
        <View style={styles.amenitiesList}>
          {displayedAmenities.map((amenity, index) => (
            <View key={amenity.id} style={styles.amenityItem}>
              <MaterialIcons name={amenity.icon} size={20} color="#333" />
              <Text style={styles.amenityText}>{amenity.name}</Text>
            </View>
          ))}
        </View>
        {hasMoreAmenities && !showAllAmenities && (
          <TouchableOpacity 
            style={styles.showAllButton}
            onPress={() => setShowAllAmenities(true)}
          >
            <Text style={styles.showAllButtonText}>
              Show All {MOCK_AMENITIES.length} Amenities
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // MODIFIED: Changed to accordion with +/- buttons
  const renderVenueRules = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Venue Rules</Text>
      <View style={styles.rulesContainer}>
        {MOCK_VENUE_RULES.map((rule, index) => (
          <View key={index} style={styles.ruleCard}>
            <TouchableOpacity 
              style={styles.ruleHeader}
              onPress={() => toggleRuleExpansion(index)}
            >
              <View style={styles.ruleHeaderLeft}>
                <MaterialIcons name={rule.icon} size={20} color="#333" />
                <Text style={styles.ruleTitle}>{rule.title}</Text>
              </View>
              <MaterialIcons 
                name={expandedRules.includes(index) ? 'remove' : 'add'} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
            {expandedRules.includes(index) && (
              <Text style={styles.ruleContent}>{rule.content}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  const renderLocationSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Where you'll be</Text>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map Placeholder</Text>
      </View>
      <Text style={styles.locationText}>{location.location}</Text>
      <Text style={styles.instructionsText}>Instructions to get there...</Text>
    </View>
  );

  const renderVenueOwner = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Meet Your Venue Owner</Text>
      <View style={styles.ownerInfo}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }}
          style={styles.ownerImage}
        />
        <View style={styles.ownerDetails}>
          <Text style={styles.ownerName}>John Smith</Text>
          <Text style={styles.ownerRole}>Host since 2020</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.askQuestionButton}>
        <Text style={styles.askQuestionText}>Ask a Question</Text>
      </TouchableOpacity>
    </View>
  );

  const renderReviews = () => (
    <View style={styles.section}>
      <View style={styles.reviewsHeader}>
        <MaterialIcons name="star" size={16} color="#000" />
        <Text style={styles.reviewsRating}>{location.rating}</Text>
        <Text style={styles.reviewsCount}>· 110 reviews</Text>
      </View>
      <FlatList
        data={MOCK_TESTIMONIALS}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.testimonialCard}>
            <View style={styles.testimonialHeader}>
              <Image source={{ uri: item.image }} style={styles.testimonialImage} />
              <View>
                <Text style={styles.testimonialName}>{item.name}</Text>
                <View style={styles.testimonialStars}>
                  {[...Array(item.rating)].map((_, i) => (
                    <MaterialIcons key={i} name="star" size={12} color="#000" />
                  ))}
                </View>
              </View>
            </View>
            <Text style={styles.testimonialText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  const renderExpandableSection = (title: string, key: string) => (
    <TouchableOpacity
      style={styles.expandableSection}
      onPress={() => toggleSectionExpansion(key)}
    >
      <View style={styles.expandableHeader}>
        <MaterialIcons name="event" size={20} color="#000" />
        <Text style={styles.expandableTitle}>{title}</Text>
        <MaterialIcons 
          name={expandedSections.includes(key) ? "expand-less" : "expand-more"} 
          size={24} 
          color="#666" 
        />
      </View>
      {expandedSections.includes(key) && (
        <Text style={styles.expandableContent}>
          {key === 'availability' && 'Minimum booking time: 2 hours\nMaximum booking time: 8 hours per day\nBookings must be made at least 1 day in advance.'}
          {key === 'cancellation' && 'Free cancellation up to 48 hours before your booking. No refunds within 48 hours of start time.'}
          {key === 'operating' && 'This condo is open for event use between:\nEveryday | 8:00 AM – 10:00 PM\n\nNo overnight stays permitted.'}
          {key === 'cleaning' && 'We follow enhanced cleaning procedures between every booking:\n• All high-touch surfaces disinfected\n• Linens and towels (if used) are professionally laundered\n• Hand sanitizer and disinfectant wipes provided on-site'}
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderBookingBar = () => (
    <View style={styles.bookingBar}>
      <View style={styles.priceInfo}>
        <Text style={styles.priceText}>
          <Text style={styles.priceAmount}>${location.price}</Text>
          <Text style={styles.priceUnit}>/{location.priceUnit}</Text>
        </Text>
        <Text style={styles.minimumText}>Min 2hrs</Text>
      </View>
      <TouchableOpacity style={styles.bookNowButton}>
        <Text style={styles.bookNowText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderImageCarousel()}
        {renderAttributes()}
        {renderHeader()}
        {renderDescription()}
        {renderWhatsIncluded()}
        {renderAmenitiesCarousel()}
        {renderVenueOffers()}
        {renderVenueRules()}
        {renderLocationSection()}
        {renderVenueOwner()}
        {renderReviews()}
        
        {/* Small image carousel */}
        <View style={styles.section}>
          <FlatList
            data={MOCK_IMAGES}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.smallCarouselImage} />
            )}
            keyExtractor={(item, index) => `small-${index}`}
          />
        </View>

        {/* Expandable sections */}
        {renderExpandableSection('Availability', 'availability')}
        {renderExpandableSection('Cancellation Policy', 'cancellation')}
        {renderExpandableSection('Operating Hours', 'operating')}
        {renderExpandableSection('Cleaning Protocol', 'cleaning')}
        
        {/* Bottom padding for booking bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Fixed booking bar */}
      <SafeAreaView edges={['bottom']} style={styles.bookingBarContainer}>
        {renderBookingBar()}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageCarouselContainer: {
    height: 300,
    position: 'relative',
  },
  carouselImage: {
    width: screenWidth,
    height: 300,
    resizeMode: 'cover',
  },
  headerButtons: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  imageIndicatorText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: theme.fonts.medium,
  },
  // MODIFIED: New pill-shaped attributes styles
  attributesContainer: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 8,
  },
  attributePills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  attributePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.buttonDisabled,
    gap: 4,
  },
  attributePillText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#000'
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  locationTitle: {
    fontSize: 26,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginBottom: 4,
  },
  locationSubtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginLeft: 4,
    textDecorationLine: "underline"
  },
  cityText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#000',
    marginLeft: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#000',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#333',
    lineHeight: 22,
  },
  readMoreText: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.primary,
    marginTop: 8,
  },
  // NEW: What's included carousel styles
  whatsIncludedContainer: {
    paddingRight: 16,
  },
  whatsIncludedCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  whatsIncludedText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  amenityCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  amenityCardText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#000',
    textAlign: 'center',
    marginTop: 8,
  },
  // MODIFIED: New amenities list styles
  amenitiesList: {
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  amenityText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#333',
  },
  showAllButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  showAllButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#fff',
  },
  // MODIFIED: New venue rules accordion styles
  rulesContainer: {
    gap: 12,
  },
  ruleCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  ruleHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  ruleTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#333',
  },
  ruleContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingLeft: 48,
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#666',
    lineHeight: 20,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mapText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#666',
  },
  locationText: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#666',
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ownerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  ownerDetails: {
    flex: 1,
  },
  ownerName: {
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginBottom: 4,
  },
  ownerRole: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#666',
  },
  askQuestionButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  askQuestionText: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewsRating: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginLeft: 4,
  },
  reviewsCount: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#666',
    marginLeft: 4,
  },
  testimonialCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 280,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  testimonialImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  testimonialName: {
    fontSize: 14,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginBottom: 4,
  },
  testimonialStars: {
    flexDirection: 'row',
  },
  testimonialText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#666',
    lineHeight: 18,
  },
  smallCarouselImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  expandableSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  expandableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandableTitle: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    flex: 1,
  },
  expandableContent: {
    marginTop: 12,
    marginLeft: 32,
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#666',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 100,
  },
  bookingBarContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  bookingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  priceInfo: {
    flex: 1,
  },
  priceText: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceAmount: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#000',
  },
  priceUnit: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#666',
  },
  minimumText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#666',
    marginTop: 2,
  },
  bookNowButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginLeft: 16,
  },
  bookNowText: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#fff',
  },
});

export default InstantBookingDetailsScreen;