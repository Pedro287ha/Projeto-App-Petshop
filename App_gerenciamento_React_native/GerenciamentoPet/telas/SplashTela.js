//https://www.appicon.co/ - gerar icone para aplicativo 
//https://lottiefiles.com/ - buscar lot ies para aplicativo
// npx eas build -p android --profile preview

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ onFinish }) => {
  console.log(onFinish)
  return (
    <View style={styles.container}>
      <LottieView
        style={{width:250, height:250}}
        source={require('../assets/images/splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={onFinish} // Executar funcao quando animacao da splash terminar
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default SplashScreen;