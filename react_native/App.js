// projeto gerenciamento db petshop
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importando telas do projeto
import ProductList from './telas/ListaProdutos';
import Pedidos from './telas/Pedidos';

const Tab = createBottomTabNavigator();

// seguindo documentacao do expo
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
                tabBarActiveTintColor: 'blue', // indigo roxo
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="GerenciarProdutos" component={ProductList} options={{tabBarLabel:"Home"}}/>
            <Tab.Screen name="Pedidos" component={Pedidos} options={{tabBarLabel:"Pedidos"}}/>
        </Tab.Navigator>
    );
};

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <MyTabs />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default App;