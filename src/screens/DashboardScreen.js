import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView,TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';

const features = [
  { title: 'Struktur Absensi', icon: '🧍‍♂️' },
  { title: 'Kupon Bazzar', icon: '🎟️' },
  { title: 'Notifikasi', icon: '🔔' },
  { title: 'Event & Meeting', icon: '🗓️' },
  { title: 'Rekap Data', icon: '📊' },
  { title: 'Data per Parent', icon: '📁' },
  { title: 'Manajemen Admin', icon: '👤' },
  { title: 'Wejangan & Iklan', icon: '🧘‍♂️' },
];

export default function DashboardScreen() {
    const renderFeature = ({ item }) => (
      <TouchableOpacity style={styles.card}>
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.label}>{item.title}</Text>
      </TouchableOpacity>
    );
  
    return (
      <ScrollView style={styles.container}>
        {/* Banner */}
        <ImageBackground
            source={require('../../assets/welcome.png')}
            style={styles.banner}
            imageStyle={styles.bannerImage}
            >
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerText}>Selamat datang di MABIKTI App</Text>
            </View>
        </ImageBackground>
  
        {/* Agenda Terdekat */}
        <View style={styles.agendaBox}>
          <Text style={styles.agendaTitle}>📅 Agenda Terdekat</Text>
          <Text style={styles.agendaText}>Rapat Nasional - 25 Mei 2025</Text>
        </View>
  
        {/* Grid Fitur */}
        <View style={styles.grid}>
        {features.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.label}>{item.title}</Text>
            </TouchableOpacity>
        ))}
        </View>
        
        {/* Quote */}
        <Text style={styles.quote}>
          “Buddha mengajarkan bukan untuk percaya, tapi untuk memahami.”
        </Text>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F4F9FF',
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 16,
    },
    banner: {
      height: 190,
      borderRadius: 12,
      overflow: 'hidden',
      justifyContent: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 16,  
      marginTop: 30,
      marginBottom: 16,
    },
    bannerTextContainer: {
      width: '100%',
      alignItems: 'center',
      paddingBottom: 16,
      flex: 1,
      justifyContent: 'flex-end',
    },    
    bannerText: {
      fontSize: 15,
      color: '#2596be',
      fontWeight: 'bold',
      textShadowColor: 'rgba(0,0,0,0.5)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    bannerImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    statsRow: {
      marginBottom: 16,
    },
    statCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 12,
      marginRight: 12,
      alignItems: 'center',
      width: 110,
      shadowColor: '#007AFF',
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#007AFF',
    },
    statLabel: {
      fontSize: 14,
      color: '#333',
      marginTop: 4,
    },
    agendaBox: {
      backgroundColor: '#fff',
      borderLeftColor: '#007AFF',
      borderLeftWidth: 4,
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    agendaTitle: {
      fontWeight: '600',
      marginBottom: 4,
      color: '#333',
    },
    agendaText: {
      color: '#555',
    },
    
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 24,
      },
      
    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 12,
      margin: 8,
      width: 90,
      alignItems: 'center',
      shadowColor: '#007AFF',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 4,
    },
    icon: {
      fontSize: 28,
      marginBottom: 8,
    },
    label: {
      fontSize: 12,
      textAlign: 'center',
      color: '#333',
    },
    quote: {
      textAlign: 'center',
      color: '#888',
      fontStyle: 'italic',
      marginBottom: 24,
    },
});
