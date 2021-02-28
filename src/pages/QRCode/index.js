import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner, Constants } from 'expo-barcode-scanner';
import * as firebase from 'firebase';
import debounce from 'debounce';
import 'firebase/firestore';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default QRCode = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = debounce(async({ type, data }) => {
    if (type === Constants.BarCodeType['qr']) {
      const db = firebase.firestore();
      const user = firebase.auth().currentUser;
      const docRef = db.collection('Carts').doc(data);

      try {
        const doc = await docRef.get();
        if (doc.exists) {
          await docRef.set({ userId: user.uid });
          navigation.goBack();
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, 1000, true);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}
