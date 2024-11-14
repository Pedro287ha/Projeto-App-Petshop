import 'package:flutter/material.dart';
import 'package:flutter_snake_navigationbar/flutter_snake_navigationbar.dart';
import 'package:projeto_pet/screens/home/login_page.dart';
//import 'home_page.dart';
import 'carrinho.dart';
import 'package:projeto_pet/screens/home/home_screen.dart';
import 'pedidos.dart';

class HomePageProjeto extends StatefulWidget {
  const HomePageProjeto({super.key});

  @override
  State<HomePageProjeto> createState() => _HomePageProjetoState();
}

class _HomePageProjetoState extends State<HomePageProjeto> {
  int _selectedItemPosition = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        children: [
          HomeScreen(),
          Carrinho(),
          SignInScreen(),
        ],
        index: _selectedItemPosition,
      ),
      bottomNavigationBar: SnakeNavigationBar.color(
        behaviour: SnakeBarBehaviour.floating,
        snakeShape: SnakeShape.circle,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.all(
            Radius.circular(11),
          ),
        ),
        padding: EdgeInsets.all(10),

        ///configuration for SnakeNavigationBar.color
        snakeViewColor: Colors.indigo,
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.blueGrey,

        ///configuration for SnakeNavigationBar.gradient
        //snakeViewGradient: selectedGradient,
        //selectedItemGradient: snakeShape == SnakeShape.indicator ? selectedGradient : null,
        //unselectedItemGradient: unselectedGradient,

        showUnselectedLabels: true,
        showSelectedLabels: true,

        currentIndex: _selectedItemPosition,
        onTap: (index) => setState(() => _selectedItemPosition = index),
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(
              icon: Icon(Icons.shopping_cart_sharp), label: 'Carrinho'),
          BottomNavigationBarItem(icon: Icon(Icons.article), label: 'Pedidos'),
        ],
      ),
    );
  }
}
