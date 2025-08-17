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
import { MaterialIcons } from '@expo/vector-icons';
import { 
  WaveformIcon,
  WavesIcon,
  KeyholeIcon,
  BusIcon,
  PlusIcon,
  CoffeeIcon, 
  LockIcon, 
  SunIcon, 
  StarIcon, 
  BedIcon,
  OvenIcon,
  BathtubIcon,
  CityIcon,
  ForkKnifeIcon,
  LetterCirclePIcon,
  WifiHighIcon,
  MountainsIcon,
  CarIcon,
  SnowflakeIcon,
  TelevisionSimpleIcon,
  SpeakerHighIcon,
  HamburgerIcon,
  BeerSteinIcon,
  CigaretteIcon,
  PawPrintIcon,
  ConfettiIcon,
  MusicNotesIcon,
  ArmchairIcon,
  CalendarCheckIcon,
  CalendarXIcon,
  ClockIcon,
  SprayBottleIcon,
  CaretDownIcon,
  CaretUpIcon
} from 'phosphor-react-native';
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
  { id: 1, icon: 'BathtubIcon', text: '1 Bathroom' },
  { id: 2, icon: 'OvenIcon', text: '1 Kitchen' },
];

// Replace MOCK_AMENITIES  
const MOCK_AMENITIES = [
  { id: 1, name: 'WiFi', icon: 'WifiHighIcon' },
  { id: 2, name: 'City skyline view', icon: 'CityIcon' },
  { id: 3, name: 'Coffee', icon: 'CoffeeIcon' },
  { id: 4, name: 'Kitchen', icon: 'ForkKnifeIcon' },
  { id: 5, name: 'Parking', icon: 'LetterCirclePIcon' },
  { id: 6, name: 'Air Conditioning', icon: 'SnowflakeIcon' },
  { id: 7, name: 'TV', icon: 'TelevisionSimpleIcon' },
  { id: 8, name: 'Sound system', icon: 'SpeakerHighIcon' },
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
    icon: 'HamburgerIcon',
    content: 'Outside food and catering are welcome. Please clean up after use.',
  },
  {
    title: 'Alcohol',
    icon: 'BeerSteinIcon',
    content: 'Alcohol is allowed.',
  },
  {
    title: 'Smoking / Vaping',
    icon: 'CigaretteIcon',
    content: 'Smoking and vaping are not allowed inside the venue.',
  },
  {
    title: 'Pets',
    icon: 'PawPrintIcon',
    content: 'Pets are not allowed, except for certified service animals.',
  },
  {
    title: 'Decorations',
    icon: 'ConfettiIcon',
    content: 'Decorations are welcome but must not damage walls, floors, or furniture. Please remove them after your event.',
  },
  {
    title: 'Loud Music',
    icon: 'MusicNotesIcon',
    content: 'Keep music volume at a reasonable level to respect neighbors.',
  },
  {
    title: 'Rearranging Furniture',
    icon: 'ArmchairIcon',
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
          <WaveformIcon size={14} color={theme.colors.onSurface} />
          <Text style={styles.attributePillText}>Music-Friendly</Text>
        </View>
        <View style={styles.attributePill}>
          <WavesIcon size={14} color={theme.colors.onSurface}/>
          <Text style={styles.attributePillText}>Cozy</Text>
        </View>
        <View style={styles.attributePill}>
          <KeyholeIcon size={14} color={theme.colors.onSurface} />
          <Text style={styles.attributePillText}>Private</Text>
        </View>
        <View style={styles.attributePill}>
          <SunIcon size={14} color={theme.colors.onSurface} />
          <Text style={styles.attributePillText}>Natural Light</Text>
        </View>
        <View style={styles.attributePill}>
          <BusIcon size={14} color={theme.colors.onSurface} />
          <Text style={styles.attributePillText}>Transit-Friendly</Text>
        </View>
        <View style={styles.attributePill}>
          <PlusIcon size={14} color={theme.colors.onSurface} />
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
        <StarIcon size={14} weight = "fill" color={theme.colors.onSurface} />
        <Text style={styles.ratingText}>{location.rating} ·</Text>
        <Text style={styles.reviewsText}>110 reviews</Text>
        {/* <Text style={styles.cityText}> · Calgary, Canada</Text> */}
      </View>
    </View>
  );

  const renderDescription = () => (
    <View style={styles.section}>
      <Text style={styles.aboutStyle}>About this place</Text>
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

  const getWhatsIncludedIcon = (iconName: string) => {
    const iconProps = {
      size: 24,
      color: theme.colors.onSurface
    };

    switch (iconName) {
      case 'BathtubIcon':
        return <BathtubIcon {...iconProps} />;
      case 'OvenIcon':
        return <OvenIcon {...iconProps} />;
      default:
        return <BedIcon {...iconProps} />;
    }
  };

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
            {getWhatsIncludedIcon(item.icon)}
            <Text style={styles.whatsIncludedText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  const getAmenityIcon = (iconName: string) => {
    const iconProps = {
      size: 24,
      color: theme.colors.onSurface
    };

    switch (iconName) {
      case 'WifiHighIcon': return <WifiHighIcon {...iconProps} />;
      case 'CityIcon': return <CityIcon {...iconProps} />;
      case 'CoffeeIcon': return <CoffeeIcon {...iconProps} />;
      case 'ForkKnifeIcon': return <ForkKnifeIcon {...iconProps} />;
      case 'LetterCirclePIcon': return <LetterCirclePIcon {...iconProps} />;
      case 'SnowflakeIcon': return <SnowflakeIcon {...iconProps} />;
      case 'TelevisionSimpleIcon': return <TelevisionSimpleIcon {...iconProps} />;
      case 'SpeakerHighIcon': return <SpeakerHighIcon {...iconProps} />;
      default: return <WifiHighIcon {...iconProps} />;
    }
  };

  const renderAmenitiesCarousel = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Amenities</Text>
      <FlatList
        data={MOCK_AMENITIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.amenityCard}>
            {getAmenityIcon(item.icon)}
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
              {getAmenityIcon(amenity.icon)}
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

  const getVenueRuleIcon = (iconName: string) => {
  const iconProps = {
    size: 20,
    color: theme.colors.onSurface
  };

  switch (iconName) {
    case 'HamburgerIcon': return <HamburgerIcon {...iconProps} />;
    case 'BeerSteinIcon': return <BeerSteinIcon {...iconProps} />;
    case 'CigaretteIcon': return <CigaretteIcon {...iconProps} />;
    case 'PawPrintIcon': return <PawPrintIcon {...iconProps} />;
    case 'MusicNotesIcon': return <MusicNotesIcon {...iconProps} />;
    case 'ArmchairIcon': return <ArmchairIcon {...iconProps} />;
    default: return <HamburgerIcon {...iconProps} />;
  }
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
                {getVenueRuleIcon(rule.icon)}
                <Text style={styles.ruleTitle}>{rule.title}</Text>
              </View>
              <MaterialIcons 
                name={expandedRules.includes(index) ? 'remove' : 'add'} 
                size={26} 
                color={theme.colors.onSurfaceVariant} 
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
      <Text style={styles.exactLocation}>Exact location shared after booking.</Text>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map Placeholder</Text>
      </View>
      <Text style={styles.locationText}>{location.location}</Text>
      <Text style={styles.instructionsText}>· 2 min walk to C-Train</Text>
      <Text style={styles.instructionsText}>· Street parking & paid lots nearby</Text>
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
        <StarIcon size={16} weight = "fill" color={theme.colors.onSurface} />
        <Text style={styles.reviewsRating}>{location.rating}</Text>
        <Text style={styles.reviewsCount}>· 110 reviews</Text>
      </View>
      <View>
        <Text style={styles.reviewsSubtitle}>Photos from reviews</Text>
      </View>
      <FlatList
        data={MOCK_TESTIMONIALS}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.testimonialCard}>
            <View style={styles.testimonialHeader}>
              <View>
                <View style={styles.testimonialStars}>
                  {[...Array(item.rating)].map((_, i) => (
                    <StarIcon size={12} weight = "fill" color={theme.colors.onSurface} />
                  ))}
                </View>
              </View>
            </View>
            <Image source={{ uri: item.image }} style={styles.testimonialImage} />
            <Text style={styles.testimonialName}>{item.name}</Text>
            <Text style={styles.testimonialText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  const getExpandableSectionIcon = (key: string) => {
  const iconProps = {
    size: 20,
    color: theme.colors.onSurface
  };

  switch (key) {
    case 'availability':
      return <CalendarCheckIcon {...iconProps} />;
    case 'cancellation':
      return <CalendarXIcon {...iconProps} />;
    case 'operating':
      return <ClockIcon {...iconProps} />;
    case 'cleaning':
      return <SprayBottleIcon {...iconProps} />;
    default:
      return <CalendarCheckIcon {...iconProps} />;
  }
};

  const renderExpandableSection = (title: string, key: string) => (
    <TouchableOpacity
      style={styles.expandableSection}
      onPress={() => toggleSectionExpansion(key)}
    >
      <View style={styles.expandableHeader}>
        {getExpandableSectionIcon(key)}
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
    fontSize: 28,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginBottom: 8,
  },
  aboutStyle: {
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    paddingBottom: 16
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 22,
  },
  readMoreText: {
    backgroundColor: '#333',
    color: '#fff',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  // NEW: What's included carousel styles
  whatsIncludedContainer: {
    paddingRight: 16,
  },
  whatsIncludedCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.onSurfaceDisabled,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  whatsIncludedText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.onSurface,
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
    fontSize: 20,
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
    padding: 12,
  },
  ruleHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  ruleTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#333',
  },
  ruleContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingLeft: 48,
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
  exactLocation: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.onSurfaceVariant,
    paddingBottom: 16,
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
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#666',
    marginBottom: 4
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
    backgroundColor: theme.colors.buttonPrimary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  askQuestionText: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#fff',
    paddingVertical: 4
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewsRating: {
    fontSize: 26,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginLeft: 4,
  },
  reviewsCount: {
    fontSize: 26,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginLeft: 4,
  },
  reviewsSubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.onSurfaceVariant,
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
    fontFamily: theme.fonts.bold,
    color: theme.colors.onSurface
  },
  minimumText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#666',
    marginTop: 2,
  },
  bookNowButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 36,
    paddingVertical: 18,
    borderRadius: 8,
    marginLeft: 16,
  },
  bookNowText: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#fff',
  },
});

export default InstantBookingDetailsScreen;