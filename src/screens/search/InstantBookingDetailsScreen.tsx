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

const MOCK_AMENITIES = [
  { id: 1, name: 'WiFi', icon: 'wifi' },
  { id: 2, name: 'Kitchen', icon: 'restaurant' },
  { id: 3, name: 'Parking', icon: 'local-parking' },
  { id: 4, name: 'Air Conditioning', icon: 'ac-unit' },
  { id: 5, name: 'TV', icon: 'tv' },
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

  const renderAttributes = () => (
    <View style={styles.attributesContainer}>
      <View style={styles.attributeRow}>
        <View style={styles.attribute}>
          <MaterialIcons name="music-note" size={16} color="#666" />
          <Text style={styles.attributeText}>Music-Friendly</Text>
        </View>
        <View style={styles.attribute}>
          <MaterialIcons name="chair" size={16} color="#666" />
          <Text style={styles.attributeText}>Cozy</Text>
        </View>
        <View style={styles.attribute}>
          <MaterialIcons name="lock" size={16} color="#666" />
          <Text style={styles.attributeText}>Private</Text>
        </View>
      </View>
      <View style={styles.attributeRow}>
        <View style={styles.attribute}>
          <MaterialIcons name="wb-sunny" size={16} color="#666" />
          <Text style={styles.attributeText}>Natural Light</Text>
        </View>
        <View style={styles.attribute}>
          <MaterialIcons name="directions-transit" size={16} color="#666" />
          <Text style={styles.attributeText}>Transit-Friendly</Text>
        </View>
        <View style={styles.attribute}>
          <MaterialIcons name="group" size={16} color="#666" />
          <Text style={styles.attributeText}>3</Text>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerInfo}>
      <Text style={styles.title}>{location.title}</Text>
      <View style={styles.ratingRow}>
        <MaterialIcons name="star" size={16} color="#000" />
        <Text style={styles.rating}>{location.rating}</Text>
        <Text style={styles.reviewCount}>· 110 reviews ></Text>
      </View>
    </View>
  );

  const renderDescription = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About this place</Text>
      <Text style={styles.description} numberOfLines={readMoreExpanded ? undefined : 3}>
        Enjoy an elegant private room of 20 m2 in a renovated apartment of 160 m2 in the heart of the city center of Calgary downtown....
      </Text>
      {!readMoreExpanded && (
        <TouchableOpacity onPress={() => setReadMoreExpanded(true)}>
          <Text style={styles.readMoreText}>Read more</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderAmenitiesCarousel = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>What's included</Text>
      <FlatList
        data={MOCK_AMENITIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.amenityItem}>
            <MaterialIcons name={item.icon as any} size={24} color="#000" />
            <Text style={styles.amenityText}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  const renderVenueOffers = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>What the venue offers</Text>
        <TouchableOpacity>
          <Text style={styles.showAllText}>Show all amenities</Text>
        </TouchableOpacity>
      </View>
      {MOCK_VENUE_OFFERS.slice(0, 6).map((offer, index) => (
        <View key={index} style={styles.offerItem}>
          <MaterialIcons name="check" size={16} color="#000" />
          <Text style={styles.offerText}>{offer}</Text>
        </View>
      ))}
    </View>
  );

  const renderVenueRules = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Venue rules</Text>
      {MOCK_VENUE_RULES.map((rule, index) => (
        <TouchableOpacity
          key={index}
          style={styles.ruleItem}
          onPress={() => toggleRuleExpansion(index)}
        >
          <View style={styles.ruleHeader}>
            <MaterialIcons name={rule.icon as any} size={20} color="#000" />
            <Text style={styles.ruleTitle}>{rule.title}</Text>
            <MaterialIcons 
              name={expandedRules.includes(index) ? "expand-less" : "expand-more"} 
              size={24} 
              color="#666" 
            />
          </View>
          {expandedRules.includes(index) && (
            <Text style={styles.ruleContent}>{rule.content}</Text>
          )}
        </TouchableOpacity>
      ))}
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
    gap: 8,
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
  attributesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#f8f8f8',
  },
  attributeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  attribute: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  attributeText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#666',
  },
  headerInfo: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#000',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#666',
    textDecorationLine: 'underline',
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
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  showAllText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#666',
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#666',
    lineHeight: 22,
  },
  readMoreText: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    textDecorationLine: 'underline',
  },
  amenityItem: {
    alignItems: 'center',
    marginRight: 24,
    width: 80,
  },
  amenityText: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#666',
    textAlign: 'center',
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  offerText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#666',
    flex: 1,
  },
  ruleItem: {
    marginBottom: 16,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  ruleTitle: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    flex: 1,
  },
  ruleContent: {
    marginTop: 8,
    marginLeft: 32,
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#666',
    lineHeight: 20,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
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
    marginLeft: 4,
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
  },
  reviewsCount: {
    marginLeft: 4,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#666',
  },
  testimonialCard: {
    width: 280,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
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