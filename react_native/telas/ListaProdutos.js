// Tela dos produtos no db
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, TextInput, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Swipeable } from 'react-native-gesture-handler';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore';

const ListaProdutos = () => {

    // Lista local com produtos recebidos do firebase
    const [products, setProducts] = useState([]);
    
    // Variaveis do estado do modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false); // Estado para o modal de produto
    
    // Vairavel armazenar produto selecionado
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Variaveis do produto
    const [editedName, setEditedName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedImage, setEditedImage] = useState('');
    const [editedPrice, setEditedPrice] = useState('');
    const [editedQuantity, setEditQuantity] = useState('');

    // Variavel para cuidar do refresh da pagina
    const [refreshing, setRefreshing] = useState(false);

    // Busca produtos do firebase usando a API key do aquivo e base de dados 'produtosPet'
    const fetchProducts = async () => {
        
        //TODO fazer tratamento de possiveis erros 

        setRefreshing(true); // vira verdadeiro fazendo com que o spinner apareca
        const querySnapshot = await getDocs(collection(db, 'produtosPet'));
        const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
        setRefreshing(false); // vira falso escondendo o spinner apos receber os dados 
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Limpando dados das variaveis do formulario
    const limparFormulario = () => {
        setEditedName('');
        setEditedDescription('');
        setEditedImage('');
        setEditedPrice('');
        setEditQuantity('');
    }

    // Funcao para editar produto 
    const handleEdit = (product) => {
 
        setSelectedProduct(product);
        setEditedName(product.name);
        setEditedDescription(product.description);
        setEditedImage(product.image);
        setEditedPrice(product.price.toString());
        setEditQuantity(product.quantity.toString());
        setIsModalVisible(true);

        
    };

    // Funcao para remocao dos produtos
    const handleRemove = async (id) => {
        //console.log(id)
        await deleteDoc(doc(db, 'produtosPet', id)); //TODO Fazer uma variavel para armazenar nome do DB
        

        // remover produto da lista local
        setProducts(products.filter(product => product.id !== id)); // removendo produto se o id dele for igual ao ID recebido para remover
        // Gerando nova lista com filter e substituindo lista anterior sem o item com o id recebido
    };

    
    // Funcao para salvar edit dos produtos no firebase e na lista local
    const handleSave = async () => {

        // selectProduct e nulo ? 
        if (selectedProduct) {

            const productRef = doc(db, 'produtosPet', selectedProduct.id);
            
            //console.log("cai aqui")
            
            // Atualizando db do firebase com edit do produto
            await updateDoc(productRef, {
                name: editedName,
                description: editedDescription,
                image: editedImage,
                price: parseFloat(editedPrice),
                quantity: parseInt(editedQuantity),
            }); // Update Firestore

            // Atualizando lista local com o edit do produto
            const updatedProducts = products.map(product => 
                product.id === selectedProduct.id 
                    ? { ...product, name: editedName, description: editedDescription, image: editedImage, price: parseFloat(editedPrice),
                        quantity: parseInt(editedQuantity)
                     } 
                    : product
            );
            setProducts(updatedProducts); // Atualizando lista local com nova lista
            
            // Fechando modal 
            setIsModalVisible(false);
            
            Alert.alert('Produto atualizado!', `${selectedProduct.name} foi atualizado com os novos valores`);
        }
        limparFormulario();
    };

    // Funcao para adicionar items no firebase
    const handleAddProduct = async () => {
        // Criando um array do novo produto contendo todos os dados nescessarios
        const newProduct = {
            name: editedName,
            description: editedDescription,
            image: editedImage,
            price: parseFloat(editedPrice),
            quantity: parseInt(editedQuantity),
        };

        // Adicionando produto no firebase
        await addDoc(collection(db, 'produtosPet'), newProduct); //TODO Tratar possiveis erros
        
        // Adicionando novo produto na lista local
        setProducts([...products, newProduct]); // Usando o spread operator para reduzir tamanho do codigo
        //? funcao redundante ja recarregando db pelo fetch

        // Fechando o modal 
        setIsAddModalVisible(false);

        // Mostrado mensagem de confirmacao para o usuario 
        Alert.alert('Produto adicionado com sucesso!', `Foi adicionado ${editedName}`);
        
        // Limpando os inputs para que no proximo uso estejam em branco
        limparFormulario()

        // Garantindo que Ids sejam gerados pelo firebase para nao causar erros
        fetchProducts();
    };

    // Renderizar para cada produto 
    const renderItem = ({ item }) => {
        const renderRightActions = () => (
            // Funcao para arrastar para esquerda e remover 
            <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.deleteButtonContainer}>
                <Text style={styles.deleteButtonText}>Remover</Text>
            </TouchableOpacity>
        );
        
        // Corpo principal da tela
        return (
            <Swipeable renderRightActions={renderRightActions}>
                <TouchableOpacity 
                    style={styles.productContainer}
                    onLongPress={() => handleEdit(item)} 
                >

                    <View style={styles.productInfoContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productDescription}>{item.description}</Text>
                            <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
                            <Text style={styles.productPrice}>Estoque: {item.quantity}</Text>
                        </View>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                    </View>
                </TouchableOpacity>
            </Swipeable>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderItem}
 keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                refreshing={refreshing} // Passa a variavel do estado do refresh - true or false
                onRefresh={fetchProducts} // Chama a funcao fetchProducts quando usuario puxar para baixo a tela 
            />
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Editar produto</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Novo nome do produto"
                        value={editedName}
                        onChangeText={setEditedName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nova descricao do produto"
                        value={editedDescription}
                        onChangeText={setEditedDescription}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nova imagem do produto"
                        value={editedImage}
                        onChangeText={setEditedImage}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Novo preco do prduto"
                        value={editedPrice}
                        onChangeText={setEditedPrice}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nova quantidade do produto"
                        value={editedQuantity}
                        onChangeText={setEditQuantity}
                    />
                    <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        limparFormulario()
                        setIsModalVisible(false)}} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal isVisible={isAddModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Adicionar novo produto</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do produto"
                        value={editedName}
                        onChangeText={setEditedName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Descricao do produto"
                        value={editedDescription}
                        onChangeText={setEditedDescription}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Url da imagem"
                        value={editedImage}
                        onChangeText={setEditedImage}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Preco do produto"
                        value={editedPrice}
                        onChangeText={setEditedPrice}
                        keyboardType='numeric'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Quantidade do produto"
                        value={editedQuantity}
                        onChangeText={setEditQuantity}
                        keyboardType='numeric'
                    />
                    
                    <TouchableOpacity onPress={handleAddProduct} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Adicionar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsAddModalVisible(false)} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setIsAddModalVisible(true)} style={styles.fab}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f4f8', // Background um pouco menos branco - color picker do google
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    list: {
        padding: 16,
    },
    productContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    productInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginRight: 16,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    productContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 16,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    deleteButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff3d71',
        padding: 16,
        borderRadius: 8,
        marginBottom:15
    },
    deleteButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    modalContent: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
        marginBottom: 16,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 8,
    },
    saveButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    cancelButton: {
        backgroundColor: '#ff3d71',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    cancelButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    fab: { // floating actinon button - botao + na direita
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 15,
        padding: 15,
    },
    fabText: {
        fontSize: 25,
        color: '#FFFFFF',
    },
});

export default ListaProdutos;