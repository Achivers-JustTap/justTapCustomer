import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, ImageBackground, Dimensions, View, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get('window'); // Moved outside the component

const ParcelScreen = ({navigation}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const isFocused = useIsFocused(); 
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % data.length;
      setIndex(nextIndex);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
      }
    }, 2000); 

    return () => clearInterval(interval); 
  }, [index]);

  const handleScrollEnd = (e) => {
    if (e.nativeEvent && e.nativeEvent.contentOffset) {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
      const index = Math.floor(contentOffsetX / width);
      setIndex(index);
    }
  };

  const data = [
    { text: 'Our Partners Won\'t Purchase Things on Behalf of you', icon: 'ban' },
    { text: 'Min Parcel weight for 2 wheeler should not be more than 5kgs', icon: 'motorcycle' },
    { text: 'Min Parcel weight for 3 wheeler should not be more than 10kgs', image: require('../../../assets/images/icons/autoicon1.png') },
  ];

  useEffect(() => {
    if (isFocused) {
      setShowOverlay(false); 

      const timer = setTimeout(() => {
        setShowOverlay(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isFocused]); 

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('../../../assets/images/parcels.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle} 
      >
        {showOverlay && (
          <LinearGradient
            colors={['rgba(183, 206, 185, 0.61)', 'rgba(143,176,220,0.61)']} 
            style={styles.overlay}
          >
            <View style={styles.carousalContainer}>
              <FlatList
                data={data}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.text} // Updated keyExtractor to use unique key
                renderItem={({ item }) => (
                  <View style={{ width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    {item.icon ? (
                      <FontAwesome name={item.icon} size={30} color="#0F4A97" style={styles.icon}  right={20} />
                    ) : item.image ? (
                      <Image source={item.image} style={styles.image} />
                    ) : null}
                    <Text style={styles.carousalPageText}>{item.text}</Text>
                  </View>
                )}
                onMomentumScrollEnd={handleScrollEnd}
                ref={flatListRef}
              />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('SendParcel')} style={styles.button}>
              <View style={styles.iconAndText}>
                <Feather name="package" size={24} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Send Parcel</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ReceiveParcel')} style={styles.button}>
              <View style={styles.iconAndText}>
                <FontAwesome name="inbox" size={24} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Receive Parcel</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('PickFromStore')} style={styles.button}>
              <View style={styles.iconAndText}>
                <Entypo name="shop" size={24} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Pick From Store</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  backgroundImage: { width, height, justifyContent: 'center', alignItems: 'center' },
  imageStyle: { resizeMode: 'stretch' },
  overlay: { width: width * 0.94, height: height * 0.9, justifyContent: 'center', alignItems: 'center', padding: 20, borderRadius: 20, alignSelf: 'center', marginTop: height * 0.04 },
  carousalContainer: { marginTop: "-50%", width: '100%', height: 100, backgroundColor: 'white', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: '50%', overflow: 'hidden' },
  carousalPageText: { fontSize: 15, left: -40, fontWeight: 'bold', textAlign: 'center', flexShrink: 1, flexWrap: 'wrap', width: '70%', paddingHorizontal: 10, lineHeight: 20 },
  button: { backgroundColor: '#0F4A97', paddingVertical: 10, paddingHorizontal: 20, width: '70%', height: 50, borderRadius: 10, marginBottom: 15, justifyContent: 'center' },
  iconAndText: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 10 },
  image: { width: 52, height: 52, marginRight: 25 },
  buttonText: { fontSize: 18, color: 'white', fontWeight: 'bold' },
});

export default ParcelScreen;
