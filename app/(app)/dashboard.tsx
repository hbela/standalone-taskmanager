

import { Spacing } from '@/constants/theme';
import { useDashboardStats } from '@/hooks/useDashboardQuery';
import { useTranslation } from '@/hooks/useTranslation';
import { getCurrencyForRegion } from '@/utils/localization';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import {
    Appbar,
    Avatar,
    Button,
    Card,
    Chip,
    Divider,
    List,
    Modal,
    Portal,
    Surface,
    Text,
    useTheme
} from 'react-native-paper';

// Currency options with symbols
const CURRENCY_OPTIONS = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
];

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  byPriority: Record<string, number>;
  totalBilling: { currency: string; amount: number }[];
  monthlyBilling: { month: string; currency: string; amount: number }[];
  billingByCategory: { category: string; currency: string; amount: number }[];
}

export default function DashboardScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const screenWidth = Dimensions.get('window').width;
  
  // Use React Query hook
  const { data: stats, isLoading, refetch, isRefetching } = useDashboardStats();

  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [currencyMenuVisible, setCurrencyMenuVisible] = useState(false);

  // Set default currency based on locale when data is loaded
  React.useEffect(() => {
    if (stats?.totalBilling && stats.totalBilling.length > 0 && !selectedCurrency) {
      const localeCurrency = getCurrencyForRegion();
      // Check if locale currency exists in the billing data, otherwise use the first available
      const currencyExists = stats.totalBilling.some(item => item.currency === localeCurrency);
      setSelectedCurrency(currencyExists ? localeCurrency : stats.totalBilling[0].currency);
    }
  }, [stats]);

  const onRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!stats) return null;

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case 'urgent': return '#FF3B30';
      case 'high': return '#FF9F0A';
      case 'medium': return '#007AFF';
      case 'low': return '#34C759';
      default: return '#8E8E93';
    }
  };

  // Get localized priority label
  const getPriorityLabel = (priority: string): string => {
    const key = priority.toLowerCase() as 'low' | 'medium' | 'high' | 'urgent';
    return t(`tasks.priorities.${key}`, { defaultValue: priority.charAt(0).toUpperCase() + priority.slice(1) });
  };

  // Filter data for charts based on selected currency
  const monthlyData = (stats?.monthlyBilling || [])
    .filter((item: any) => item.currency === selectedCurrency)
    .map((item: any) => ({ 
        value: item.amount, 
        label: item.month.substring(5), // Show only 'MM' part or 'MM-XX'
        labelTextStyle: { color: theme.colors.onSurfaceVariant, fontSize: 10 },
        frontColor: theme.colors.primary,
    }))
    .reverse(); // Show oldest to newest if API returns desc, check order

  // Pie chart colors
  const pieColors = ['#007AFF', '#34C759', '#FF9500', '#FF3B30', '#5856D6', '#AF52DE', '#FF2D55', '#5AC8FA'];

  const categoryData = (stats?.billingByCategory || [])
    .filter((item: any) => item.currency === selectedCurrency)
    .map((item: any, index: number) => ({ 
        value: item.amount, 
        color: pieColors[index % pieColors.length],
        text: `${item.amount.toFixed(0)}`,
        category: item.category
    }));

  const currentTotalBilling = stats?.totalBilling.find((b: any) => b.currency === selectedCurrency)?.amount || 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated>
        <Appbar.Content title={t('dashboard.title')} />
      </Appbar.Header>

      <ScrollView 
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={Boolean(isRefetching)} onRefresh={onRefresh} />
        }
      >
        {/* Overdue Alert */}
        {stats.overdue > 0 && (
           <Surface style={[styles.overdueAlert, { backgroundColor: theme.colors.errorContainer }]}>
               <View style={styles.overdueContent}>
                   <Avatar.Icon size={40} icon="alert-circle" style={{ backgroundColor: theme.colors.error }} />
                   <View style={{ marginLeft: Spacing.md, flex: 1 }}>
                       <Text variant="titleMedium" style={{ color: theme.colors.onErrorContainer, fontWeight: 'bold' }}>
                           {t('dashboard.overdueTasks')}
                       </Text>
                       <Text variant="bodyMedium" style={{ color: theme.colors.onErrorContainer }}>
                           {stats.overdue} {t('dashboard.overdueTasks').toLowerCase()}
                       </Text>
                   </View>
                   <Chip textStyle={{ color: theme.colors.error }}>{stats.overdue}</Chip>
               </View>
           </Surface>
        )}

        {/* Task Statistics Grid */}
        <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {t('dashboard.taskStats')}
            </Text>
            <View style={styles.statsGrid}>
                <Card style={styles.statCard} mode="contained">
                    <Card.Content style={styles.statCardContent}>
                        <Text variant="headlineMedium" style={styles.statValue}>{stats.total}</Text>
                        <Text variant="bodySmall">{t('dashboard.totalTasks')}</Text>
                    </Card.Content>
                </Card>
                <Card style={styles.statCard} mode="contained">
                    <Card.Content style={styles.statCardContent}>
                        <Text variant="headlineMedium" style={[styles.statValue, { color: '#2E7D32' }]}>{stats.completed}</Text>
                        <Text variant="bodySmall">{t('dashboard.completed')}</Text>
                    </Card.Content>
                </Card>
                <Card style={styles.statCard} mode="contained">
                    <Card.Content style={styles.statCardContent}>
                        <Text variant="headlineMedium" style={[styles.statValue, { color: '#EF6C00' }]}>{stats.pending}</Text>
                        <Text variant="bodySmall">{t('dashboard.pending')}</Text>
                    </Card.Content>
                </Card>
                <Card style={styles.statCard} mode="contained">
                    <Card.Content style={styles.statCardContent}>
                        <Text variant="headlineMedium" style={[styles.statValue, { color: '#7B1FA2' }]}>{completionRate}%</Text>
                        <Text variant="bodySmall">{t('dashboard.completion')}</Text>
                    </Card.Content>
                </Card>
            </View>
        </View>

        {/* Billing Section */}
        {stats.totalBilling.length > 0 && (
          <View style={styles.section}>
             <Text variant="titleMedium" style={styles.sectionTitle}>
                {t('dashboard.monthlyBilling')}
             </Text>
             
             {/* Currency Selector */}
             <View style={styles.currencySelectorContainer}>
               <Button
                  mode="outlined"
                  onPress={() => setCurrencyMenuVisible(true)}
                  style={styles.currencySelectorButton}
                  icon="chevron-down"
                  contentStyle={{ flexDirection: 'row-reverse' }}
               >
                  {selectedCurrency ? (
                    CURRENCY_OPTIONS.find(c => c.code === selectedCurrency)?.name || selectedCurrency
                  ) : t('common.select')}
               </Button>
             </View>

             <Portal>
                <Modal 
                  visible={currencyMenuVisible} 
                  onDismiss={() => setCurrencyMenuVisible(false)}
                  contentContainerStyle={styles.currencyModalContent}
                >
                  <Card>
                    <Card.Title title={t('form.currency')} />
                    <Card.Content>
                      {CURRENCY_OPTIONS.map((currency) => {
                        const hasData = stats.totalBilling.some(item => item.currency === currency.code);
                        return (
                          <Button
                            key={currency.code}
                            mode={selectedCurrency === currency.code ? 'contained' : 'outlined'}
                            onPress={() => {
                              setSelectedCurrency(currency.code);
                              setCurrencyMenuVisible(false);
                            }}
                            style={{ marginBottom: 8 }}
                            icon={selectedCurrency === currency.code ? 'check' : undefined}
                            textColor={!hasData && selectedCurrency !== currency.code ? theme.colors.outline : undefined}
                          >
                            {currency.symbol} {currency.name}
                          </Button>
                        );
                      })}
                    </Card.Content>
                    <Card.Actions>
                      <Button onPress={() => setCurrencyMenuVisible(false)}>
                        {t('common.cancel')}
                      </Button>
                    </Card.Actions>
                  </Card>
                </Modal>
             </Portal>

             {selectedCurrency && (
                 <Card mode="elevated" style={styles.chartCard} contentStyle={{ backgroundColor: theme.colors.surface }}>
                     <Card.Content>
                         <View style={{ alignItems: 'center', marginBottom: Spacing.lg }}>
                             <Text variant="displaySmall" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                                {currentTotalBilling.toFixed(2)} {selectedCurrency}
                             </Text>
                             <Text variant="bodySmall">{t('dashboard.totalBilling')}</Text>
                         </View>

                         {monthlyData.length > 0 ? (
                            <View style={{ alignItems: 'center', paddingRight: 20 }}>
                               <BarChart
                                   data={monthlyData}
                                   width={screenWidth - 100}
                                   height={200}
                                   barWidth={22}
                                   spacing={20}
                                   roundedTop
                                   yAxisTextStyle={{ color: theme.colors.onSurfaceVariant, fontSize: 10 }}
                                   xAxisLabelTextStyle={{ color: theme.colors.onSurfaceVariant, fontSize: 10 }}
                                   hideRules
                                   isAnimated
                               />
                            </View>
                         ) : (
                             <Text style={{ textAlign: 'center', margin: 20 }}>No monthly data available</Text>
                         )}
                     </Card.Content>
                 </Card>
             )}
          </View>
        )}

        {/* Category Pie Chart */}
        {selectedCurrency && categoryData.length > 0 && (
           <View style={styles.section}>
               <Text variant="titleMedium" style={styles.sectionTitle}>
                   {t('dashboard.billingByCategory')}
               </Text>
               <Card mode="elevated" style={styles.chartCard} contentStyle={{ backgroundColor: theme.colors.surface }}>
                   <Card.Content style={{ alignItems: 'center' }}>
                       <PieChart
                           data={categoryData}
                           donut
                           showText
                           textColor="white"
                           radius={120}
                           innerRadius={60}
                           textSize={12}
                           labelsPosition='outward'
                       />
                        <View style={styles.legendContainer}>
                            {categoryData.map((item: any, index: number) => (
                                <View key={index} style={styles.legendItem}>
                                    <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                                    <Text variant="bodySmall" numberOfLines={1} style={{ maxWidth: 120 }}>
                                        {item.category}: {item.value.toFixed(0)}
                                    </Text>
                                </View>
                            ))}
                        </View>
                   </Card.Content>
               </Card>
           </View>
        )}

        {/* Priority Breakdown */}
        {Object.keys(stats.byPriority).length > 0 && (
            <List.Section style={styles.sectionEntry}>
                <List.Subheader>{t('dashboard.tasksByPriority')}</List.Subheader>
                <Card mode="elevated">
                    <Card.Content style={{ padding: 0 }}>
                        {Object.entries(stats.byPriority).map(([priority, count], index) => (
                            <React.Fragment key={priority}>
                                {index > 0 && <Divider />}
                                <List.Item
                                    title={getPriorityLabel(priority)}
                                    left={() => <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(priority) }]} />}
                                    right={() => (
                                      <Text variant="bodyLarge" style={{ alignSelf: 'center', fontWeight: 'bold' }}>
                                        {count}
                                      </Text>
                                    )}
                                />
                            </React.Fragment>
                        ))}
                    </Card.Content>
                </Card>
            </List.Section>
        )}

        {/* App Info */}
        <List.Section style={styles.sectionEntry}>
            <List.Subheader>{t('dashboard.about')}</List.Subheader>
            <Card mode="elevated">
                 <Card.Content style={{ padding: 0 }}>
                    <List.Item
                        title={t('dashboard.version')}
                        description="1.0.0"
                        left={(props) => <List.Icon {...props} icon="information" />}
                    />
                    <Divider />
                    <List.Item
                        title={t('dashboard.storage')}
                        description="Local SQLite Database"
                        left={(props) => <List.Icon {...props} icon="database" />}
                    />
                 </Card.Content>
            </Card>
        </List.Section>

        <View style={styles.footer}>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              {t('dashboard.madeWithLove')}
            </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 150,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionEntry: {
      paddingHorizontal: Spacing.lg,
      marginBottom: 0,
  },
  sectionTitle: {
      marginBottom: Spacing.md,
      fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    width: '47%', 
    marginBottom: Spacing.xs,
  },
  statCardContent: {
      alignItems: 'center',
      paddingVertical: Spacing.lg,
  },
  statValue: {
      fontWeight: 'bold',
      marginVertical: Spacing.xs,
  },
  priorityDot: {
      width: Spacing.md, 
      height: Spacing.md, 
      borderRadius: 6, 
      margin: 10,
      alignSelf: 'center',
  },
  footer: {
    padding: Spacing.xxl,
    alignItems: 'center',
  },
  overdueAlert: {
      margin: Spacing.lg,
      padding: Spacing.md,
      borderRadius: Spacing.md,
      marginBottom: Spacing.md,
  },
  overdueContent: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  currencySelectorContainer: {
      flexDirection: 'row',
      marginBottom: Spacing.md,
      alignItems: 'center',
  },
  currencySelectorButton: {
      flexDirection: 'row',
  },
  currencyModalContent: {
    padding: Spacing.md,
    margin: Spacing.xl,
  },
  chartCard: {
      marginBottom: Spacing.lg,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.md,
    marginBottom: Spacing.xs,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  }
});
