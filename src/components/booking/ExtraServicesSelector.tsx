// src/components/booking/ExtraServicesSelector.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { CheckIcon } from 'phosphor-react-native';
import { theme } from '../../theme/theme';

interface ExtraServicesSelectorProps {
  eventType: string;
  selectedServices: string[];
  onServicesSelect: (services: string[]) => void;
  bookingHours: number;
}

interface ServiceOption {
  id: string;
  name: string;
  price: number;
  description?: string;
}

const ExtraServicesSelector: React.FC<ExtraServicesSelectorProps> = ({
  eventType,
  selectedServices,
  onServicesSelect,
  bookingHours
}) => {
    const SERVICE_OPTIONS: ServiceOption[] = [
        {
        id: 'photographer',
        name: 'Photographer',
        price: 50 * bookingHours, // NOW IT CAN ACCESS bookingHours
        description: `${bookingHours}hr`,
        },
        {
        id: 'string_lights',
        name: 'String Lights Setup',
        price: 15,
        },
        {
        id: 'decor_packages',
        name: 'Decor Packages',
        price: 10,
        },
        {
        id: 'catering',
        name: 'Catering',
        price: 0,
        description: 'Message the venue owner',
        },
    ];

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      onServicesSelect(selectedServices.filter(id => id !== serviceId));
    } else {
      onServicesSelect([...selectedServices, serviceId]);
    }
  };

  const getDescriptionText = () => {
    return `Nice! Let's make your [${eventType}] even better — want to add any extra services?`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>
        {getDescriptionText()}
      </Text>
      
      <ScrollView style={styles.servicesContainer} showsVerticalScrollIndicator={false}>
        {SERVICE_OPTIONS.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceItem,
              selectedServices.includes(service.id) && styles.serviceItemSelected,
            ]}
            onPress={() => toggleService(service.id)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.checkbox,
              selectedServices.includes(service.id) && styles.checkboxSelected,
            ]}>
              {selectedServices.includes(service.id) && (
                <CheckIcon size={14} color="#fff" weight="bold" />
              )}
            </View>
            
            <View style={styles.serviceContent}>
              <View style={styles.serviceHeader}>
                <Text style={[
                  styles.serviceName,
                  selectedServices.includes(service.id) && styles.serviceNameSelected,
                ]}>
                  {service.name}
                </Text>
                {service.price > 0 && (
                  <Text style={styles.servicePrice}>
                    ${service.price}
                    {service.description && ` / ${service.description}`}
                  </Text>
                )}
              </View>
              {service.description && service.price === 0 && (
                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.showMoreButton}>
        <Text style={styles.showMoreText}>Show More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#000',
    marginBottom: 24,
    lineHeight: 22,
  },
  servicesContainer: {
    maxHeight: 300,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceItemSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#F0F8F8',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  checkboxSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  serviceContent: {
    flex: 1,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  serviceName: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  serviceNameSelected: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.semibold,
  },
  servicePrice: {
    fontSize: 14,
    fontFamily: theme.fonts.semibold,
    color: '#000',
  },
  serviceDescription: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#666',
    marginTop: 4,
  },
  showMoreButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  showMoreText: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
});

export default ExtraServicesSelector;