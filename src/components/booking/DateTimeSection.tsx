// components/DateTimeSection.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

interface DateTimeData {
  date: Date | null;
  time: {
    start: string;
    end: string;
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
  const [startTime, setStartTime] = useState(data.time?.start || '6:00');
  const [endTime, setEndTime] = useState(data.time?.end || '10:00');

  // Generate calendar for July 2025
  const generateCalendar = () => {
    const year = 2025;
    const month = 6; // July (0-indexed)
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
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

  const handleDateToggle = (isDate: boolean) => {
    if (isDate) {
      onUpdate({ ...data, isDateFlexible: false });
    } else {
      onUpdate({ ...data, isDateFlexible: true, date: null });
    }
  };

  const handleTimeToggle = (isTime: boolean) => {
    if (isTime) {
      onUpdate({ 
        ...data, 
        isTimeFlexible: false, 
        time: { start: startTime, end: endTime }
      });
    } else {
      onUpdate({ ...data, isTimeFlexible: true, time: null });
    }
  };

  const handleDateSelect = (date: Date) => {
    onUpdate({ ...data, date, isDateFlexible: false });
  };

  const handleTimeUpdate = () => {
    if (!data.isTimeFlexible) {
      onUpdate({ ...data, time: { start: startTime, end: endTime } });
    }
  };

  const isDateInCurrentMonth = (date: Date) => {
    return date.getMonth() === 6; // July
  };

  const isSelectedDate = (date: Date) => {
    return data.date && 
           date.getDate() === data.date.getDate() &&
           date.getMonth() === data.date.getMonth() &&
           date.getFullYear() === data.date.getFullYear();
  };

  if (!isActive && isCompleted) {
    return (
      <TouchableOpacity style={styles.completedSection} onPress={onPress}>
        <View style={styles.completedContent}>
          <Text style={styles.sectionLabel}>Date & Time</Text>
          <Text style={styles.sectionValue}>{displayText}</Text>
        </View>
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (!isActive) {
    return (
      <TouchableOpacity style={styles.section} onPress={onPress}>
        <Text style={styles.sectionTitle}>When is it happening?</Text>
      </TouchableOpacity>
    );
  }

  const calendarDays = generateCalendar();

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
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>July 2025</Text>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navText}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysContainer}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <Text key={day} style={styles.weekDay}>{day}</Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {calendarDays.map((date, index) => (
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

      {/* Time Inputs */}
      {!data.isTimeFlexible && (
        <View style={styles.timeContainer}>
          <View style={styles.timeInputContainer}>
            <TextInput
              style={styles.timeInput}
              value={startTime}
              onChangeText={setStartTime}
              onBlur={handleTimeUpdate}
              placeholder="Start time"
            />
            <Text style={styles.timeSeparator}>-</Text>
            <TextInput
              style={styles.timeInput}
              value={endTime}
              onChangeText={setEndTime}
              onBlur={handleTimeUpdate}
              placeholder="End time"
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
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },
  sectionValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
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
    fontWeight: '500',
    color: '#666',
  },
  toggleTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  calendarContainer: {
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  navText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
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
    borderRadius: 20,
  },
  calendarDaySelected: {
    backgroundColor: '#000',
  },
  calendarDayInactive: {
    opacity: 0.3,
  },
  calendarDayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  calendarDayTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  calendarDayTextInactive: {
    color: '#ccc',
  },
  timeContainer: {
    marginBottom: 20,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    textAlign: 'center',
    minWidth: 80,
  },
  timeSeparator: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    color: '#000',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    marginRight: 8,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default DateTimeSection;