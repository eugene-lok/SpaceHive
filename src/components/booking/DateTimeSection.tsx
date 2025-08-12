// components/DateTimeSection.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { theme } from '../../theme/theme';

interface DateTimeData {
  date: Date | null;
  time: {
    start: {
      time: string;
      period: 'AM' | 'PM';
    };
    end: {
      time: string;
      period: 'AM' | 'PM';
    };
  } | null;
  isDateFlexible: boolean;
  isTimeFlexible: boolean;
}

interface DateTimeSectionProps {
  isActive: boolean;
  isCompleted: boolean;
  displayText: string;
  data: DateTimeData;
  onPress: () => void;
  onUpdate: (data: DateTimeData) => void;
  onSave: () => void;
  onClear: () => void;
}

const DateTimeSection: React.FC<DateTimeSectionProps> = ({
  isActive,
  isCompleted,
  displayText,
  data,
  onPress,
  onUpdate,
  onSave,
  onClear,
}) => {
  // Parse time string "06:00" into hour and minute
  const parseTime = (timeStr: string) => {
    const [hour, minute] = timeStr.split(':');
    return { hour: hour || '06', minute: minute || '00' };
  };

  const [startHour, setStartHour] = useState(parseTime(data.time?.start.time || '00:00').hour);
  const [startMinute, setStartMinute] = useState(parseTime(data.time?.start.time || '00:00').minute);
  const [startPeriod, setStartPeriod] = useState<'AM' | 'PM'>(data.time?.start.period || 'AM');
  
  const [endHour, setEndHour] = useState(parseTime(data.time?.end.time || '00:15').hour);
  const [endMinute, setEndMinute] = useState(parseTime(data.time?.end.time || '00:15').minute);
  const [endPeriod, setEndPeriod] = useState<'AM' | 'PM'>(data.time?.end.period || 'AM');

  const [currentMonth, setCurrentMonth] = useState(7); 
  const [currentYear, setCurrentYear] = useState(2025);

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  // Calculate time 15 minutes after given time
  const add15Minutes = (hour: string, minute: string, period: 'AM' | 'PM') => {
    let newHour = parseInt(hour);
    let newMinute = parseInt(minute);
    let newPeriod = period;

    // Add 15 minutes
    newMinute += 15;

    if (newMinute >= 60) {
      newMinute = 0;
      newHour += 1;

      // Handle hour overflow
      if (newHour === 12) {
        // 11:45 AM -> 12:00 PM or 11:45 PM -> 12:00 AM
        newPeriod = period === 'AM' ? 'PM' : 'AM';
      } else if (newHour === 13) {
        // 12:45 AM -> 1:00 AM or 12:45 PM -> 1:00 PM
        newHour = 1;
      }
    }

    return {
      hour: newHour.toString().padStart(2, '0'),
      minute: newMinute.toString().padStart(2, '0'),
      period: newPeriod
    };
  };

  // Convert time to minutes from midnight for comparison
  const timeToMinutes = (hour: string, minute: string, period: 'AM' | 'PM') => {
    let h = parseInt(hour);
    const m = parseInt(minute);
    
    if (period === 'AM' && h === 12) h = 0;
    if (period === 'PM' && h !== 12) h += 12;
    
    return h * 60 + m;
  };

  // Check if end time is after start time
  const isEndTimeValid = (sHour: string, sMinute: string, sPeriod: 'AM' | 'PM', 
                         eHour: string, eMinute: string, ePeriod: 'AM' | 'PM') => {
    const startMinutes = timeToMinutes(sHour, sMinute, sPeriod);
    const endMinutes = timeToMinutes(eHour, eMinute, ePeriod);
    return endMinutes > startMinutes;
  };

  // Only sync from props on initial load, not on every change
  useEffect(() => {
    if (data.time && !isActive) {
      const startTime = parseTime(data.time.start.time);
      const endTime = parseTime(data.time.end.time);
      
      setStartHour(startTime.hour);
      setStartMinute(startTime.minute);
      setStartPeriod(data.time.start.period);
      
      setEndHour(endTime.hour);
      setEndMinute(endTime.minute);
      setEndPeriod(data.time.end.period);
    }
  }, [data.time, isActive]);

  const formatTimeComponent = (value: string) => {
    return value.padStart(2, '0');
  };

  const handleDateToggle = (isDate: boolean) => {
    if (isDate) {
      onUpdate({ ...data, isDateFlexible: false });
    } else {
      onUpdate({ ...data, isDateFlexible: true, date: null });
    }
  };

  const handleTimeToggle = (isTime: boolean) => {
    if (isTime) {
      updateTimeData();
    } else {
      onUpdate({ ...data, isTimeFlexible: true, time: null });
    }
  };

  const updateTimeData = () => {
    const timeData = {
      start: { 
        time: `${formatTimeComponent(startHour)}:${formatTimeComponent(startMinute)}`, 
        period: startPeriod 
      },
      end: { 
        time: `${formatTimeComponent(endHour)}:${formatTimeComponent(endMinute)}`, 
        period: endPeriod 
      },
    };
    onUpdate({ 
      ...data, 
      isTimeFlexible: false, 
      time: timeData
    });
  };

  // Handle start time changes and auto-update end time
  const handleStartTimeChange = (newHour?: string, newMinute?: string, newPeriod?: 'AM' | 'PM') => {
    const hour = newHour || startHour;
    const minute = newMinute || startMinute;
    const period = newPeriod || startPeriod;

    // Update start time
    if (newHour) setStartHour(newHour);
    if (newMinute) setStartMinute(newMinute);
    if (newPeriod) setStartPeriod(newPeriod);

    // Calculate and set end time (15 minutes later)
    const newEndTime = add15Minutes(hour, minute, period);
    setEndHour(newEndTime.hour);
    setEndMinute(newEndTime.minute);
    setEndPeriod(newEndTime.period);

    // Update the form data after state updates
    setTimeout(updateTimeData, 50);
  };

  // Handle end time changes with validation
  const handleEndTimeChange = (newHour?: string, newMinute?: string, newPeriod?: 'AM' | 'PM') => {
    const hour = newHour || endHour;
    const minute = newMinute || endMinute;
    const period = newPeriod || endPeriod;

    // Check if the new end time is valid (after start time)
    if (isEndTimeValid(startHour, startMinute, startPeriod, hour, minute, period)) {
      if (newHour) setEndHour(newHour);
      if (newMinute) setEndMinute(newMinute);
      if (newPeriod) setEndPeriod(newPeriod);
      
      setTimeout(updateTimeData, 50);
    }
    // If invalid, don't update (time stays the same)
  };

  const handleDateSelect = (date: Date) => {
    onUpdate({ ...data, date, isDateFlexible: false });
  };

  const isDateInCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth; 
  };

  const isSelectedDate = (date: Date) => {
    return data.date && 
           date.getDate() === data.date.getDate() &&
           date.getMonth() === data.date.getMonth() &&
           date.getFullYear() === data.date.getFullYear();
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getMonthName = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[currentMonth]} ${currentYear}`;
  };

  // Scrollable dropdown component
  const Dropdown: React.FC<{
    value: string;
    options: string[];
    onChange: (value: string) => void;
    width?: number;
  }> = ({ value, options, onChange, width = 60 }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <View style={[styles.dropdownContainer, { minWidth: width }]}>
        <TouchableOpacity 
          style={styles.dropdown}
          onPress={() => setIsOpen(!isOpen)}
        >
          <Text style={styles.dropdownText}>{value}</Text>
        </TouchableOpacity>
        
        {isOpen && (
          <View style={styles.dropdownList}>
            <ScrollView 
              style={styles.dropdownScroll}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {options.map((option) => (
                <TouchableOpacity 
                  key={option}
                  style={styles.dropdownItem}
                  onPress={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  <Text style={[
                    styles.dropdownItemText, 
                    value === option && styles.selectedItem
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  // Generate options
  const hourOptions = Array.from({ length: 12 }, (_, i) => 
    (i + 1).toString().padStart(2, '0')
  );
  const minuteOptions = ['00', '15', '30', '45'];
  const periodOptions = ['AM', 'PM'];

  if (!isActive && isCompleted) {
    return (
      <TouchableOpacity style={styles.completedSection} onPress={onPress}>
        <View style={styles.completedContent}>
          <Text style={styles.sectionLabel}>Date & Time</Text>
          <Text style={styles.sectionValue}>{displayText}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (!isActive && !isCompleted) {
    return (
      <TouchableOpacity style={styles.completedSection} onPress={onPress}>
        <View style={styles.completedContent}>
          <Text style={styles.sectionLabel}>Date & Time</Text>
          <Text style={styles.sectionValue}>None</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (!isActive) {
    return (
      <TouchableOpacity style={styles.section} onPress={onPress}>
        <Text style={styles.sectionLabel}>Date & Time</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.activeSection}>
      <Text style={styles.sectionTitle}>When is it happening?</Text>
      
      {/* Date Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, !data.isDateFlexible && styles.toggleButtonActive]}
          onPress={() => handleDateToggle(true)}
        >
          <Text style={[styles.toggleText, !data.isDateFlexible && styles.toggleTextActive]}>
            Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, data.isDateFlexible && styles.toggleButtonActive]}
          onPress={() => handleDateToggle(false)}
        >
          <Text style={[styles.toggleText, data.isDateFlexible && styles.toggleTextActive]}>
            Flexible
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      {!data.isDateFlexible && (
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity style={styles.navButton} onPress={goToPreviousMonth}>
              <Text style={styles.navText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>{getMonthName()}</Text>
            <TouchableOpacity style={styles.navButton} onPress={goToNextMonth}>
              <Text style={styles.navText}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysContainer}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <Text key={day} style={styles.weekDay}>{day}</Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {generateCalendar().map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.calendarDay,
                  !isDateInCurrentMonth(date) && styles.calendarDayInactive,
                  isSelectedDate(date) && styles.calendarDaySelected,
                ]}
                onPress={() => handleDateSelect(date)}
                disabled={!isDateInCurrentMonth(date)}
              >
                <Text style={[
                  styles.calendarDayText,
                  !isDateInCurrentMonth(date) && styles.calendarDayTextInactive,
                  isSelectedDate(date) && styles.calendarDayTextSelected,
                ]}>
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {data.isDateFlexible && !data.isTimeFlexible && (
        <View style={styles.flexibleDescriptionContainer}>
          <Text style={styles.flexibleDescription}>
            Any date works for you - we'll show all available options
          </Text>
        </View>
      )}

      {/* Time Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, !data.isTimeFlexible && styles.toggleButtonActive]}
          onPress={() => handleTimeToggle(true)}
        >
          <Text style={[styles.toggleText, !data.isTimeFlexible && styles.toggleTextActive]}>
            Time
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, data.isTimeFlexible && styles.toggleButtonActive]}
          onPress={() => handleTimeToggle(false)}
        >
          <Text style={[styles.toggleText, data.isTimeFlexible && styles.toggleTextActive]}>
            Flexible
          </Text>
        </TouchableOpacity>
      </View>

      {data.isDateFlexible && data.isTimeFlexible && (
        <View style={styles.flexibleDescriptionContainer}>
          <Text style={styles.flexibleDescription}>
            Completely flexible - any date and time works for you
          </Text>
        </View>
      )}

      {!data.isDateFlexible && data.isTimeFlexible && (
        <View style={styles.flexibleDescriptionContainer}>
          <Text style={styles.flexibleDescription}>
            Any time works for you - morning, afternoon, or evening
          </Text>
        </View>
      )}

      {/* Time Dropdowns - Horizontal Format */}
      {!data.isTimeFlexible && (
        <View style={styles.timeContainer}>
          <View style={styles.timeRowContainer}>
            {/* Start Time */}
            <Dropdown
              value={startHour}
              options={hourOptions}
              onChange={(value) => handleStartTimeChange(value)}
              width={30}
            />
            <Dropdown
              value={startMinute}
              options={minuteOptions}
              onChange={(value) => handleStartTimeChange(undefined, value)}
              width={30}
            />
            <Dropdown
              value={startPeriod}
              options={periodOptions}
              onChange={(value) => handleStartTimeChange(undefined, undefined, value as 'AM' | 'PM')}
              width={30}
            />
            
            <Text style={styles.timeSeparator}>-</Text>
            
            {/* End Time */}
            <Dropdown
              value={endHour}
              options={hourOptions}
              onChange={(value) => handleEndTimeChange(value)}
              width={30}
            />
            <Dropdown
              value={endMinute}
              options={minuteOptions}
              onChange={(value) => handleEndTimeChange(undefined, value)}
              width={30}
            />
            <Dropdown
              value={endPeriod}
              options={periodOptions}
              onChange={(value) => handleEndTimeChange(undefined, undefined, value as 'AM' | 'PM')}
              width={30}
            />
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    marginHorizontal: 8, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activeSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    marginHorizontal: 8, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  completedSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    marginHorizontal: 8, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  completedContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#666',
    marginBottom: 4,
  },
  sectionValue: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: theme.fonts.semibold,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 4,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 4,
    alignItems: 'center',
    borderRadius: 21,
  },
  toggleButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.onSurfaceVariant,
  },
  toggleTextActive: {
    color: '#000',
    fontFamily: theme.fonts.semibold,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  navButton: {
    padding: 8,
  },
  navText: {
    fontSize: 18,
    fontFamily: theme.fonts.regular,
    color: theme.colors.onSurface,
  },
  monthText: {
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.onSurfaceVariant,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#666',
    paddingVertical: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    minHeight: 40,
  },
  calendarDaySelected: {
    backgroundColor: '#000',
  },
  calendarDayInactive: {
    opacity: 0.3,
  },
  calendarDayText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: theme.colors.onSurfaceVariant,
  },
  calendarDayTextSelected: {
    color: '#fff',
    fontFamily: theme.fonts.bold,
  },
  calendarDayTextInactive: {
    color: '#ccc',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  clearButton: {
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000000',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  saveButton: {
    flex: 1,
    backgroundColor: theme.colors.buttonPrimary,
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#fff',
    textAlign: 'center',
  },
  flexibleDescriptionContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.buttonPrimary,
  },
  flexibleDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  timeContainer: {
    marginBottom: 20,
  },
  timeRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 0,
  },
  timeColon: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  timeSeparator: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 8,
    color: '#000',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdown: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 8,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1000,
    maxHeight: 120,
  },
  dropdownScroll: {
    maxHeight: 120,
  },
  dropdownItem: {
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  selectedItem: {
    fontWeight: '600',
    color: '#4CAF50',
  },
});

export default DateTimeSection;