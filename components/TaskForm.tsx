import { useTranslation } from '@/hooks/useTranslation';
import { DEFAULT_REMINDER_OPTIONS, DEFAULT_REMINDERS, getReminderLabel } from '@/lib/notifications';
import { CreateTaskInput, TaskPriority, UpdateTaskInput } from '@/types/task';
import { formatDate, formatTime } from '@/utils/dateFormatter';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import {
    Button,
    Card,
    Chip,
    Divider,
    HelperText,
    IconButton,
    Modal,
    Portal,
    Switch,
    Text,
    TextInput,
    useTheme,
} from 'react-native-paper';
import { de, en, fr, registerTranslation, TimePickerModal } from 'react-native-paper-dates';
import ContactDisplay from './ContactDisplay';
import ContactSearchButton from './ContactSearchButton';
import DictationButton from './DictationButton';

// Register translations
registerTranslation('en', en);
registerTranslation('de', de);
registerTranslation('fr', fr);
registerTranslation('hu', {
  save: 'Mentés',
  selectSingle: 'Válasszon dátumot',
  selectMultiple: 'Válasszon dátumokat',
  selectRange: 'Válasszon időszakot',
  notAccordingToDateFormat: (inputFormat) => `A dátum formátuma legyen ${inputFormat}`,
  mustBeHigherThan: (date) => `Legyen ennél későbbi: ${date}`,
  mustBeLowerThan: (date) => `Legyen ennél korábbi: ${date}`,
  mustBeBetween: (startDate, endDate) => `Legyen eközött: ${startDate} - ${endDate}`,
  dateIsDisabled: 'A dátum nem választható',
  previous: 'Előző',
  next: 'Következő',
  typeInDate: 'Dátum megadása',
  pickDateFromCalendar: 'Választás naptárból',
  close: 'Bezárás',
  hour: 'Óra',
  minute: 'Perc',
});

// Configure calendar locales
LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today'
};

LocaleConfig.locales['hu'] = {
  monthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
  dayNames: ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
  dayNamesShort: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
  today: 'Ma'
};

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  today: "Aujourd'hui"
};

LocaleConfig.locales['de'] = {
  monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  today: 'Heute'
};

LocaleConfig.defaultLocale = 'en';


interface TaskFormProps {
  initialValues?: {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    dueDate?: string;
    reminderTimes?: number[];
    contactId?: string | null;
  };
  onSubmit: (data: CreateTaskInput | UpdateTaskInput) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  loading?: boolean;
}


export default function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  loading = false
}: TaskFormProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(initialValues?.priority || 'medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(
    initialValues?.dueDate ? new Date(initialValues.dueDate) : undefined
  );
  const [showDatePicker, setShowDatePicker] = useState(false); // Native picker fallback / Time picker
  const [showCalendarModal, setShowCalendarModal] = useState(false); // Custom calendar modal
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [enableReminders, setEnableReminders] = useState(!!initialValues?.dueDate);
  const [reminderTimes, setReminderTimes] = useState<number[]>(
    initialValues?.reminderTimes || DEFAULT_REMINDERS
  );
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    initialValues?.contactId || null
  );
  const [errors, setErrors] = useState<{ title?: string }>({});

  // Refs for focus management
  const titleInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);

  // Set calendar locale based on user's language
  useEffect(() => {
    const locale = t('locale') || 'en'; // Get locale from translations root
    LocaleConfig.defaultLocale = locale;
  }, [t]);

  const priorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

  const getPriorityColor = (p: TaskPriority) => {
    switch (p) {
      case 'urgent': return '#FF3B30';
      case 'high': return '#FF9500';
      case 'medium': return '#007AFF';
      case 'low': return '#34C759';
    }
  };

  const validate = (): boolean => {
    const newErrors: { title?: string } = {};

    if (!title.trim()) {
      newErrors.title = t('form.errors.titleRequired');
    } else if (title.trim().length < 3) {
      newErrors.title = t('form.errors.titleTooShort');
    } else if (title.trim().length > 255) {
      newErrors.title = t('form.errors.titleTooLong');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const data: CreateTaskInput = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      ...(dueDate && { dueDate: dueDate.toISOString() }),
      ...(dueDate && enableReminders && { reminderTimes }),
      ...(selectedContactId && { contactId: selectedContactId }),
    };

    try {
      await onSubmit(data);
      // Reset form after successful submission
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate(undefined);
      setEnableReminders(false);
      setReminderTimes(DEFAULT_REMINDERS);
      setSelectedContactId(null);
      setErrors({});
    } catch (error) {
      // Error handling is done by parent component
      console.error('[TaskForm] Form submission error:', error);
    }
  };

  // Handle dictation completion - append dictated text to description
  const handleDictationComplete = (dictatedText: string) => {
    // Append the new dictated text to the existing description
    setDescription((prevText) => {
      // Add a space if there's already some text
      const separator = prevText && !prevText.endsWith(' ') ? ' ' : '';
      return prevText + separator + dictatedText;
    });
  };

  // Handle title dictation - replace the title
  const handleTitleDictation = (dictatedText: string) => {
    if (dictatedText.trim()) {
      setTitle(dictatedText.trim());
      if (errors.title) {
        setErrors({ ...errors, title: undefined });
      }
      setTimeout(() => {
        descriptionInputRef.current?.focus();
      }, 100);
    }
  };

  const handleCalendarDayPress = (day: DateData) => {
    setShowCalendarModal(false);
    const selectedDate = new Date(day.dateString);
    // Add current time or default to end of day? Or keep current time if set.
    // If we only have date, let's set time to 12:00 PM or keep current time if updating.
    if (dueDate) {
        selectedDate.setHours(dueDate.getHours(), dueDate.getMinutes());
    } else {
        selectedDate.setHours(12, 0, 0, 0); // Default to noon
    }
    setDueDate(selectedDate);
  };
  
  // Keep native handler for Time
  // Handle time confirmation from TimePickerModal
  const handleTimeConfirm = ({ hours, minutes }: { hours: number; minutes: number }) => {
    setShowTimePicker(false);
    if (dueDate) {
      const newDate = new Date(dueDate);
      newDate.setHours(hours, minutes);
      setDueDate(newDate);
    }
  };

  const handleTimeDismiss = () => {
    setShowTimePicker(false);
  };

  // Memoize button text
  const buttonText = React.useMemo(() => {
    return loading ? t('common.saving') : (submitLabel || t('common.save'));
  }, [loading, submitLabel, t]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Input */}
        <View style={styles.inputGroup}>
          <TextInput
            ref={titleInputRef}
            mode="outlined"
            label={t('form.title')}
            placeholder={t('form.placeholders.title')}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errors.title) setErrors({ ...errors, title: undefined });
            }}
            error={!!errors.title}
            maxLength={255}
            disabled={loading}
            returnKeyType="next"
            onSubmitEditing={() => descriptionInputRef.current?.focus()}
            right={<TextInput.Affix text={`${title.length}/255`} />}
          />
          <HelperText type="error" visible={!!errors.title}>
            {errors.title}
          </HelperText>
          
          <DictationButton 
            id="title-dictation"
            onDictationComplete={handleTitleDictation}
            disabled={loading}
          />
        </View>

        {/* Description Input */}
        <View style={styles.inputGroup}>
          <TextInput
            ref={descriptionInputRef}
            mode="outlined"
            label={t('tasks.description')}
            placeholder={t('form.placeholders.description')}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            disabled={loading}
            maxLength={2000}
            right={<TextInput.Affix text={`${description.length}/2000`} />}
          />
          <View style={{ marginTop: 8 }}>
            <DictationButton 
                id="description-dictation"
                onDictationComplete={handleDictationComplete}
                disabled={loading}
            />
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Priority Selector */}
        <View style={styles.inputGroup}>
          <Text variant="titleMedium" style={styles.label}>{t('tasks.priority')}</Text>
          <View style={styles.priorityOptions}>
            {priorities.map((p) => {
                const color = getPriorityColor(p);
                const isSelected = priority === p;
                return (
                    <Chip
                        key={p}
                        selected={isSelected}
                        showSelectedOverlay
                        mode={isSelected ? 'flat' : 'outlined'}
                        onPress={() => setPriority(p)}
                        textStyle={{ 
                            color: isSelected ? 'white' : color, 
                            fontWeight: 'bold' 
                        }}
                        style={[
                            styles.priorityChip, 
                            isSelected ? { backgroundColor: color } : { borderColor: color }
                        ]}
                        disabled={loading}
                    >
                        {t(`tasks.priorities.${p}`)}
                    </Chip>
                );
            })}
          </View>
        </View>

        {/* Contact Selector */}
        <View style={styles.inputGroup}>
          <Text variant="titleMedium" style={styles.label}>{t('form.contact')}</Text>
          {selectedContactId ? (
            <View>
              <ContactDisplay contactId={selectedContactId} showActions={false} />
              <Button 
                mode="text" 
                textColor={theme.colors.error}
                icon="close-circle" 
                onPress={() => setSelectedContactId(null)}
                disabled={loading}
                style={{ alignSelf: 'flex-start', marginTop: 4 }}
              >
                {t('form.removeContact')}
              </Button>
            </View>
          ) : (
            <ContactSearchButton
              onContactSelect={(contactId) => setSelectedContactId(contactId)}
              selectedContactId={selectedContactId}
              disabled={loading}
            />
          )}
        </View>

        <Divider style={styles.divider} />

        {/* Due Date Selector */}
        <View style={styles.inputGroup}>
          <Text variant="titleMedium" style={styles.label}>{t('form.dueDateTime')}</Text>
          
          <View style={styles.dateRow}>
            <TextInput
              mode="outlined"
              label={t('tasks.dueDate')}
              value={dueDate ? formatDate(dueDate, {
                  month: 'short', day: 'numeric', year: 'numeric'
              }) : ''}
              editable={false}
              right={<TextInput.Icon icon="calendar" onPress={() => !loading && setShowCalendarModal(true)} />}
              style={{ flex: 1 }}
              onPressIn={() => !loading && setShowCalendarModal(true)}
              disabled={loading}
            />
            
            {dueDate && (
                 <IconButton
                    icon="close-circle"
                    iconColor={theme.colors.error}
                    size={24}
                    onPress={() => setDueDate(undefined)}
                    disabled={loading}
                 />
            )}
          </View>

          {dueDate && (
            <View style={styles.timeRow}>
                <TextInput
                    mode="outlined"
                    label={t('date.time') || "Time"}
                    value={formatTime(dueDate)}
                    editable={false}
                    right={<TextInput.Icon icon="clock-outline" onPress={() => !loading && setShowTimePicker(true)} />}
                    style={{ flex: 1 }}
                    onPressIn={() => !loading && setShowTimePicker(true)}
                    disabled={loading}
                />
            </View>
          )}

          {dueDate && (
            <TimePickerModal
              visible={showTimePicker}
              onDismiss={handleTimeDismiss}
              onConfirm={handleTimeConfirm}
              hours={dueDate.getHours()}
              minutes={dueDate.getMinutes()}
              locale={t('common.languageCode') || 'en'}
              label={t('date.time')}
              cancelLabel={t('common.cancel')}
              confirmLabel={t('common.save')}
              inputFontSize={18}
            />
          )}

          <Portal>
            <Modal visible={showCalendarModal} onDismiss={() => setShowCalendarModal(false)} contentContainerStyle={styles.modalContent}>
                <Card mode="elevated" style={{ margin: 0, width: '100%' }}>
                    <Card.Content style={{ padding: 0 }}>
                        <Calendar
                            current={dueDate ? dueDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                            onDayPress={handleCalendarDayPress}
                            markedDates={{
                                [(dueDate ? dueDate.toISOString().split('T')[0] : '')]: { selected: true, selectedColor: theme.colors.primary }
                            }}
                            theme={{
                                calendarBackground: theme.colors.surface,
                                textSectionTitleColor: theme.colors.onSurface,
                                dayTextColor: theme.colors.onSurface,
                                monthTextColor: theme.colors.onSurface,
                                selectedDayBackgroundColor: theme.colors.primary,
                                selectedDayTextColor: theme.colors.onPrimary,
                                todayTextColor: theme.colors.error,
                                dotColor: theme.colors.primary,
                                textDayFontSize: 20, // Increased for better readability
                                textMonthFontSize: 24, // Increased
                                textDayHeaderFontSize: 18, // Increased
                                textDayFontWeight: '500',
                                textMonthFontWeight: '600',
                                textDayHeaderFontWeight: '500',
                                arrowColor: theme.colors.onSurface,
                            }}
                        />
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => setShowCalendarModal(false)}>{t('common.cancel')}</Button>
                    </Card.Actions>
                </Card>
            </Modal>
          </Portal>
        </View>

        {/* Reminder Times Selector */}
        {dueDate && (
          <View style={styles.inputGroup}>
            <View style={styles.reminderHeader}>
              <Text variant="bodyLarge">{t('form.reminders')}</Text>
              <Switch
                value={enableReminders}
                onValueChange={setEnableReminders}
                disabled={loading}
              />
            </View>

            {enableReminders && (
              <View style={styles.reminderOptionsContainer}>
                <HelperText type="info" visible>
                  {t('form.reminderHint')}
                </HelperText>
                <View style={styles.reminderOptions}>
                  {DEFAULT_REMINDER_OPTIONS.map((minutes) => {
                    const isSelected = reminderTimes.includes(minutes);
                    const label = getReminderLabel(minutes, t);
                    
                    return (
                      <Chip
                        key={minutes}
                        selected={isSelected}
                        showSelectedOverlay
                        mode={isSelected ? 'flat' : 'outlined'}
                        onPress={() => {
                            if (isSelected) {
                              setReminderTimes(prev => prev.filter(m => m !== minutes));
                            } else {
                              setReminderTimes(prev => [...prev, minutes].sort((a, b) => a - b));
                            }
                        }}
                        disabled={loading}
                        style={styles.reminderChip}
                      >
                        {label}
                      </Chip>
                    );
                  })}
                </View>
                {reminderTimes.length === 0 && (
                   <HelperText type="error" visible>
                       {t('form.reminderWarning')}
                   </HelperText>
                )}
              </View>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button 
            mode="contained" 
            onPress={handleSubmit} 
            loading={loading}
            disabled={loading}
            style={styles.button}
            contentStyle={{ height: 48 }}
          >
            {buttonText}
          </Button>

          {onCancel && (
            <Button 
                mode="text" 
                onPress={onCancel}
                disabled={loading}
                style={styles.button}
            >
                {t('common.cancel')}
            </Button>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 200, // Substantially increased to clear floating navigation
    flexGrow: 1,
    gap: 16,
  },
  inputGroup: {
    marginBottom: 8,
  },
  label: {
    marginBottom: 8,
  },
  divider: {
      marginVertical: 8,
  },
  priorityOptions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
  },
  priorityChip: {
      
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeRow: {
    marginTop: 12,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reminderOptionsContainer: {
    marginTop: 4,
  },
  reminderOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // For grid layout
    gap: 8,
  },
  reminderChip: {
      width: '48%', // Approx 2 col
      marginBottom: 8,
  },
  actions: {
    marginTop: 16,
    gap: 12,
  },
  button: {
      borderRadius: 8,
  },
  modalContent: {
      width: Dimensions.get('window').width * 0.98,
      alignSelf: 'center',
      marginVertical: 20,
  }
});
