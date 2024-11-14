import 'package:flutter/material.dart';
import 'package:projeto_pet/screens/home/login_page.dart';
import 'screens/home/home_page_projeto.dart';
import 'constants.dart';
import 'screens/home/home_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Pet Shop',
      theme: ThemeData(
        textTheme: Theme.of(context).textTheme.apply(bodyColor: kTextColor),
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      //home: const SignInScreen(),

      routes: {
        '/':(_) => SignInScreen(),
        '/home_page_projeto': (_) => HomePageProjeto()
      }
      //home: const HomeScreen(),
    );
  }
}
