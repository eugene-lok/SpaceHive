// src/components/match-request/ReviewStep.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { 
  MapPinIcon, 
  CalendarIcon, 
  UsersIcon, 
  CurrencyCircleDollarIcon,
  CakeIcon,
  PaintBrushIcon,
  ScalesIcon,
  ClockIcon,
  PencilIcon,
  CalendarStarIcon,
  WavesIcon,
  LightbulbIcon,
  NotepadIcon,
  UsersThreeIcon,
  CalendarCheckIcon
} from 'phosphor-react-native';
import { MatchRequestData } from '../../screens/search/MatchRequestScreen';
import { BookingFormData } from '../../types/booking';
import { theme } from '../../theme/theme';

interface ReviewStepProps {
  data: MatchRequestData;
  formData: BookingFormData;
  onUpdate: (updates: Partial<MatchRequestData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSendRequest: () => void;
  canProceed: boolean;
  buttonText: string;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  data,
  formData,
  onUpdate,
  onNext,
  onBack,
  onSendRequest,
  canProceed,
  buttonText,
}) => {
  const formatDate = (date: Date | null) => {
    if (!date) return 'Flexible';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (time: any) => {
    if (!time) return '6 - 8PM';
    return `${time.start.time} ${time.start.period} - ${time.end.time} ${time.end.period}`;
  };

  const formatGuests = () => {
    const { adults, children, infants } = formData.guests;
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`);
    if (children > 0) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
    if (infants > 0) parts.push(`${infants} Infant${infants > 1 ? 's' : ''}`);
    return parts.join(', ') || '10 Adults';
  };

  const formatBudget = () => {
    const { min, max } = formData.budget;
    return `$${min} - $${max}`;
  };

  const getVibeDisplayName = (vibeId: string | null) => {
    const vibeMap: { [key: string]: string } = {
      'modern-minimal': 'Modern & Minimal',
      'cozy-warm': 'Cozy & Warm',
      'bold-colorful': 'Bold & Colorful',
      'outdoorsy-natural': 'Outdoorsy & Natural',
    };
    return vibeId ? vibeMap[vibeId] || vibeId : 'Not specified';
  };

  const getFlexibilityDisplayName = (flexibility: string | null) => {
    const flexibilityMap: { [key: string]: string } = {
      'open-to-suggestions': 'Open to suggestions',
      'slightly-flexible': 'Slightly flexible',
      'not-flexible': 'Not flexible at all',
    };
    return flexibility ? flexibilityMap[flexibility] || flexibility : 'Not specified';
  };

  const getTimelineDisplayName = (timeline: string | null) => {
    const timelineMap: { [key: string]: string } = {
      'same-day': 'Same day',
      'within-2-days': 'Within 2 business days',
      'within-week': 'Within a week',
      'no-rush': 'No rush, anytime works',
    };
    return timeline ? timelineMap[timeline] || timeline : 'Not specified';
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Review request details</Text>
        
        {/* Your Booking Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Booking Details</Text>
          <View style={styles.sectionContent}>
            
            <View style={styles.detailRow}>
              <MapPinIcon size={24} color={theme.colors.onSurface} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>
                  {formData.location.value || 'Downtown, Calgary'}
                </Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <CalendarCheckIcon size={24} color={theme.colors.onSurface} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValue}>
                  {formatDate(formData.dateTime.date)}, {formatTime(formData.dateTime.time)}
                </Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <UsersThreeIcon size={24} color={theme.colors.onSurface} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Guests</Text>
                <Text style={styles.detailValue}>{formatGuests()}</Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <CurrencyCircleDollarIcon size={24} color={theme.colors.onSurface} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Budget</Text>
                <Text style={styles.detailValue}>{formatBudget()}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Match Request Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CalendarStarIcon size={24} color={theme.colors.onSurface} />
            <Text style={styles.sectionLabel}>Event Type</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Edit</Text>
              <PencilIcon size={16} color={theme.colors.onSurface} />
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionValue}>• {data.eventType || 'Birthday'}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <LightbulbIcon size={24} color={theme.colors.onSurface} />
            <Text style={styles.sectionLabel}>Preferred venue features</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Edit</Text>
              <PencilIcon size={16} color={theme.colors.onSurface} />
            </TouchableOpacity>
          </View>
          {data.features && data.features.length > 0 ? (
            data.features.map((feature, index) => (
              <Text key={index} style={styles.sectionValue}>• {feature}</Text>
            ))
          ) : (
            <Text style={styles.sectionValue}>• Pet-friendly{'\n'}• Kitchen Access</Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <PaintBrushIcon size={24} color={theme.colors.onSurface} />
            <Text style={styles.sectionLabel}>Vibe</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Edit</Text>
              <PencilIcon size={16} color="#666" weight="regular" />
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionValue}>• {getVibeDisplayName(data.vibe)}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <WavesIcon size={24} color={theme.colors.onSurface} />
            <Text style={styles.sectionLabel}>Flexibility</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Edit</Text>
              <PencilIcon size={16} color="#666" weight="regular" />
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionValue}>• {getFlexibilityDisplayName(data.flexibility)}</Text>
        </View>

        {data.timeline && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ClockIcon size={20}color={theme.colors.onSurface} />
              <Text style={styles.sectionLabel}>Timeline</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editText}>Edit</Text>
                <PencilIcon size={16} color="#666" weight="regular" />
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionValue}>• {getTimelineDisplayName(data.timeline)}</Text>
          </View>
        )}

        {data.notes && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <NotepadIcon size={24} color={theme.colors.onSurface} />
              <Text style={styles.sectionLabel}>Additional Notes</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editText}>Edit</Text>
                <PencilIcon size={16} color="#666" weight="regular" />
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionValue}>• "{data.notes}"</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={onSendRequest}
        >
          <Text style={styles.sendButtonText}>
            {buttonText}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: '#000',
    marginBottom: 24,
    lineHeight: 34,
  },
  section: {
    backgroundColor: theme.colors.outlineDisabled,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.buttonDisabled
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.primary,
    marginBottom: 16,
  },
  sectionContent: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.onSurface,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.onSurface,
    flex: 1,
    marginLeft: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#666',
  },
  sectionValue: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#000',
    lineHeight: 20,
    marginLeft: 36,
  },
  bottomButtons: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f5f5f5',
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  sendButtonText: {
    fontSize: 22,
    fontFamily: theme.fonts.bold,
    color: '#fff',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#000',
    paddingVertical: 20,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ReviewStep;