// Tela dos pedidos recebidos
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ListaPedidos = () => {


  // Lista de pedidos
  const [orders, setOrders] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // estado de puxar para carregar

  const fetchOrders = async () => {
    setLoading(true);
    setError(null); // Resetando variavel de erro antes de fazer a requisicao para o firebase
    try {
      const ordersCollection = collection(db, 'Pedidos');
      const orderSnapshot = await getDocs(ordersCollection);

      const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(orderList);
    } catch (error) {
      console.error("Error ao buscar pedidos", error);
      setError("Houve um erro ao buscar os peidos no firebase!");
    } finally {
      //setLoading(false);
      setRefreshing(false); // Resetando valor apos carregamento
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onRefresh = () => {
    setRefreshing(true); // torna a variavel refreshing como true quando usuario puxar tela pra baixo
    fetchOrders(); // busca items no firebase dnv
  };

  // if (loading && !refreshing) { // Mostrando o spinner diretamente com o codigo
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }


  // Caso haja algum erro na requisicao ira mostrar 
  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.orderItem} activeOpacity={0.7}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{item.nome}</Text>
              <Text style={styles.priceText}>Preço: {item.preco}</Text>
              <Text style={styles.quantityText}>Quantidade: {item.quantidade}</Text>
              <Text style={styles.compraIdText}>Compra ID: {item.compraId}</Text>
              <Text style={styles.subTotalText}>Subtotal: {item.subTotal}</Text>
            </View>
          </TouchableOpacity>
        )}
        refreshing={refreshing} // variavel de controle do refreshing
        onRefresh={onRefresh} // TODO remover redundante 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  orderItem: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceText: {
    fontSize: 16,
    color: '#888',
  },
  quantityText: {
    fontSize: 16,
    color: '#888',
  },
  compraIdText: {
    fontSize: 16,
    color: '#888',
  },
  subTotalText: {
    fontSize: 16,
    color: '#888',
  },
});

export default ListaPedidos;