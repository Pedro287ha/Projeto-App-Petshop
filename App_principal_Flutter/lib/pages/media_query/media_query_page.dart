import 'package:flutter/material.dart';

class MediaQueryPage extends StatelessWidget {
  const MediaQueryPage({super.key});

  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);
    var altura = mediaQuery.size.height;
    var largura = mediaQuery.size.width;
    var orientacao = mediaQuery.orientation;
    var tamanho_app_bar = kToolbarHeight;
    var statusBar = mediaQuery.padding.top;
    print("Tamanho da status bar e $statusBar");

    print("altura: $altura largura: $largura Orientacao: $orientacao");
    return Scaffold(
      appBar: AppBar(
        title: const Text("Media query testes"),
        backgroundColor: Colors.yellow,
      ),
      body: Container(
        width: largura * .50,
        height: (altura - kToolbarHeight) * .5,
        color: Colors.blue[100],
      ),
    );
  }
}
