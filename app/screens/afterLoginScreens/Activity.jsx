import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Activity = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#fff', '#fff']} style={styles.container}>
      <LinearGradient colors={['#0D47A1', '#1976D2']} style={styles.header}>
      <Icon name="time" size={30} color="#fff" />
        <Text style={styles.headerTitle}>Your Activity</Text>
        
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>TO BE TAKEN</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[styles.card, styles.cardWithShadow]}
            onPress={() => navigation.navigate('YourTrip')}
          >
            <LinearGradient colors={['#2196F3', '#64B5F6']} style={styles.cardBackground}>
              <View style={styles.cardIcon}>
                <Icon name="car-outline" size={30} color="#fff" />
              </View>
              <View>
                <Text style={styles.cardText}>Plan Your Ride</Text>
                <Text style={styles.cardSubtitle}>Manage your upcoming trips</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.cardWithShadow]}
            onPress={() => navigation.navigate('YourReserved')}
          >
            <LinearGradient colors={['#2196F3', '#64B5F6']} style={styles.cardBackground}>
              <View style={styles.cardIcon}>
                <Icon name="lock-closed-outline" size={30} color="#fff" />
              </View>
              <View>
                <Text style={styles.cardText}>Reserved Rides</Text>
                <Text style={styles.cardSubtitle}>View reserved trips</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Past Section */}
        <Text style={styles.sectionTitle}>PAST RIDES</Text>
        <View style={[styles.historyCard, styles.cardWithShadow]}>
          <Image
            style={styles.historyImage}
            source={require('../../../assets/images/icons/auto.png')}
          />
          <View style={styles.historyDetails}>
            <Text style={styles.historyTitle}>KPHB</Text>
            <Text style={styles.historyInfo}>Jan 8, 2025, 10:30 AM</Text>
            <Text style={styles.historyPrice}>₹220.00</Text>
          </View>
          <TouchableOpacity
            style={styles.rebookButton}
            onPress={() => navigation.navigate('RebookScreen')}
          >
            <Icon name="refresh-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },
  header: {
    margin:0,
    paddingLeft:20,
    flexDirection: 'row',
    paddingVertical: 20,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 26,
    top:-3,
    left: 5,
    fontWeight: '700',
    color: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D47A1',
    marginVertical: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    borderRadius: 15,
    marginRight: 10,
    alignItems: 'center',
    overflow: 'hidden', 
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
  },
  cardWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardIcon: {
    backgroundColor: '#1565C0',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#d9e7f8',
    textAlign: 'center',
    marginTop: 5,
  },
  historyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  historyImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  historyDetails: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D47A1',
  },
  historyInfo: {
    fontSize: 14,
    color: '#757575',
  },
  historyPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D47A1',
  },
  rebookButton: {
    backgroundColor: '#0D47A1',
    padding: 10,
    borderRadius: 50,
    elevation: 3,
  },
});
