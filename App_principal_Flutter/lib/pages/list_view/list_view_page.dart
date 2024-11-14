import 'package:flutter/material.dart';

class ListViewPage extends StatelessWidget {
  const ListViewPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("List view"),
          backgroundColor: Colors.blue,
        ),
        body: ListView.separated(
          itemCount: 200,
          separatorBuilder: (context, index) {
            return Divider();
          },
          itemBuilder: (context, index) {
            int valor_indice = 1 + index;
            print("carregando o indice de $valor_indice");
            return ListTile(
              leading: const CircleAvatar(
                backgroundImage: NetworkImage(
                    "https://cdn.awsli.com.br/800x800/138/138431/produto/8665601/79a5d6d8fb.jpg"),
              ),
              title: Text("Produto ${valor_indice}"),
              subtitle: const Text("alguma coisa"),
            );
          },
        ));
  }
}
