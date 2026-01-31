import { Spacing } from '@/constants/theme';
import { useTranslation } from '@/hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import OpenMapButton from './OpenMapButton';

interface ContactDisplayProps {
  contactId: string;
  showActions?: boolean;
}

interface ContactInfo {
  id: string;
  name: string;
  phoneNumbers?: { number?: string; label?: string }[];
  emails?: { email?: string; label?: string }[];
  addresses?: { street?: string; city?: string; region?: string; postalCode?: string; country?: string; label?: string }[];
}

export default function ContactDisplay({ contactId, showActions = true }: ContactDisplayProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadContact();
  }, [contactId]);

  const loadContact = async () => {
    setLoading(true);
    setNotFound(false);

    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const contactData = await Contacts.getContactByIdAsync(contactId, [
        Contacts.Fields.Name,
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Emails,
        Contacts.Fields.Addresses,
      ]);

      if (contactData) {
        setContact(contactData);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error loading contact:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    Linking.openURL(`tel:${cleanNumber}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleCreateContact = () => {
    Alert.alert(
      t('contacts.contactNotFound'),
      t('contacts.contactNotFoundAlert'),
      [{ text: t('common.done') }]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={[styles.loadingContainer, { backgroundColor: theme.colors.surfaceVariant, borderColor: theme.colors.outline }]}>
          <Ionicons name="person-outline" size={20} color={theme.colors.onSurfaceVariant} />
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {t('contacts.loadingContact')}
          </Text>
        </View>
      </View>
    );
  }

  if (notFound) {
    return (
      <View style={styles.container}>
        <View style={[styles.notFoundContainer, { backgroundColor: theme.colors.errorContainer, borderColor: theme.colors.error }]}>
          <Ionicons name="alert-circle-outline" size={20} color={theme.colors.error} />
          <View style={styles.notFoundTextContainer}>
            <Text variant="titleSmall" style={[styles.notFoundTitle, { color: theme.colors.onSurface }]}>
              {t('contacts.contactNotFound')}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {t('contacts.contactNotFoundHint')}
            </Text>
          </View>
          {showActions && (
            <TouchableOpacity onPress={handleCreateContact}>
              <Ionicons name="add-circle" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  if (!contact) {
    return null;
  }

  const primaryPhone = contact.phoneNumbers?.[0];
  const primaryEmail = contact.emails?.[0];

  return (
    <View style={styles.container}>
      <Card style={styles.contactCard} mode="elevated">
        <Card.Content>
          <View style={[styles.contactHeader, { borderBottomColor: theme.colors.outlineVariant }]}>
            <View style={[styles.contactAvatar, { backgroundColor: theme.colors.primary }]}>
              <Text variant="titleMedium" style={styles.contactAvatarText}>
                {contact.name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2) || '?'}
              </Text>
            </View>
            <View style={styles.contactHeaderInfo}>
              <Text variant="titleMedium" style={[styles.contactName, { color: theme.colors.onSurface }]}>
                {contact.name || t('contacts.unknown')}
              </Text>
              {primaryPhone && (
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  {primaryPhone.label || 'Phone'}
                </Text>
              )}
            </View>
          </View>

          {primaryPhone && primaryPhone.number && (
            <View style={styles.contactDetail}>
              <View style={styles.contactDetailInfo}>
                <Ionicons name="call" size={16} color={theme.colors.primary} />
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurface, flex: 1 }}>
                  {primaryPhone.number}
                </Text>
              </View>
              {showActions && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleCall(primaryPhone.number!)}
                >
                  <Ionicons name="call-outline" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
              )}
            </View>
          )}

          {primaryEmail && primaryEmail.email && (
            <View style={styles.contactDetail}>
              <View style={styles.contactDetailInfo}>
                <Ionicons name="mail" size={16} color={theme.colors.primary} />
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurface, flex: 1 }}>
                  {primaryEmail.email}
                </Text>
              </View>
              {showActions && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEmail(primaryEmail.email!)}
                >
                  <Ionicons name="mail-outline" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
              )}
          </View>
          )}

          {/* Address Section with Map Button */}
          {contact.addresses && contact.addresses.length > 0 && contact.addresses[0] && (
            <View style={[styles.addressSection, { borderTopColor: theme.colors.outlineVariant }]}>
              <View style={styles.contactDetail}>
                <View style={styles.contactDetailInfo}>
                  <Ionicons name="location" size={16} color={theme.colors.primary} />
                  <View style={styles.addressTextContainer}>
                    <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                      {[
                        contact.addresses[0].street,
                        contact.addresses[0].city,
                        contact.addresses[0].region,
                        contact.addresses[0].postalCode,
                        contact.addresses[0].country
                      ].filter(Boolean).join(', ')}
                    </Text>
                    {contact.addresses[0].label && (
                      <Text variant="bodySmall" style={[styles.addressLabel, { color: theme.colors.onSurfaceVariant }]}>
                        {contact.addresses[0].label}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              {showActions && (
                <OpenMapButton 
                  address={[
                    contact.addresses[0].street,
                    contact.addresses[0].city,
                    contact.addresses[0].region,
                    contact.addresses[0].postalCode,
                    contact.addresses[0].country
                  ].filter(Boolean).join(', ')}
                  style={styles.mapButton}
                />
              )}
            </View>
          )}

          {contact.phoneNumbers && contact.phoneNumbers.length > 1 && (
            <Text variant="bodySmall" style={[styles.moreInfo, { color: theme.colors.onSurfaceVariant }]}>
              {contact.phoneNumbers.length - 1 > 1 
                ? t('contacts.morePhonesPlural').replace('%{count}', String(contact.phoneNumbers.length - 1))
                : t('contacts.morePhones').replace('%{count}', String(contact.phoneNumbers.length - 1))
              }
            </Text>
          )}

          {contact.emails && contact.emails.length > 1 && (
            <Text variant="bodySmall" style={[styles.moreInfo, { color: theme.colors.onSurfaceVariant }]}>
              {contact.emails.length - 1 > 1
                ? t('contacts.moreEmailsPlural').replace('%{count}', String(contact.emails.length - 1))
                : t('contacts.moreEmails').replace('%{count}', String(contact.emails.length - 1))
              }
            </Text>
          )}

          {contact.addresses && contact.addresses.length > 1 && (
            <Text variant="bodySmall" style={[styles.moreInfo, { color: theme.colors.onSurfaceVariant }]}>
              {contact.addresses.length - 1 > 1
                ? t('contacts.moreAddressesPlural').replace('%{count}', String(contact.addresses.length - 1))
                : t('contacts.moreAddresses').replace('%{count}', String(contact.addresses.length - 1))
              }
            </Text>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: Spacing.sm,
    borderWidth: 1,
  },
  notFoundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Spacing.sm,
    borderWidth: 1,
  },
  notFoundTextContainer: {
    flex: 1,
  },
  notFoundTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  contactCard: {
    borderRadius: Spacing.md,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactAvatarText: {
    color: 'white',
    fontWeight: '600',
  },
  contactHeaderInfo: {
    flex: 1,
  },
  contactName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  contactDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  contactDetailInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  actionButton: {
    padding: Spacing.sm,
  },
  addressSection: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressLabel: {
    marginTop: 2,
  },
  mapButton: {
    marginTop: Spacing.sm,
  },
  moreInfo: {
    fontStyle: 'italic',
    marginTop: Spacing.xs,
  },
});
