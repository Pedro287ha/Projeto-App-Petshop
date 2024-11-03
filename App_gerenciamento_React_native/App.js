// App.js

import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importing screens
import ProductList from './telas/ListaProdutos';
import Pedidos from './telas/Pedidos'; 
import SplashScreen from './telas/SplashTela'; 

const Tab = createBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="GerenciarProdutos"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'GerenciarProdutos') {
                        iconName = 'home';
                    } else if (route.name === 'Pedidos') {
                        iconName = 'order-bool-descending';
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="GerenciarProdutos" component={ProductList} options={{ tabBarLabel: "Home" }} />
            <Tab.Screen name="Pedidos" component={Pedidos} options={{ tabBarLabel: "Pedidos" }} />
        </Tab.Navigator>
    );
};

const App = () => {
    const [isSplashVisible, setSplashScrenVisible] = useState(true);

    // Enviar esta funcao para o componente executar 
    const handleAnimationFinish = () => {
        setSplashScrenVisible(false); // Tornando falsa para assim entao carregar a tela do app
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                {isSplashVisible ? ( // A Splash esta visivel? 
                    <SplashScreen onFinish={handleAnimationFinish} />
                ) : (
                    <MyTabs />
                )}
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default App;