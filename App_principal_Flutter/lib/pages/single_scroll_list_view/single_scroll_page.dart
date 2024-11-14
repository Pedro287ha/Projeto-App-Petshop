import 'package:flutter/material.dart';

class SingleScrollPage extends StatelessWidget {
  const SingleScrollPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Scroll view testes"),
        backgroundColor: Colors.green,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              height: 200,
              color: Colors.red,
            ),
            Container(
              height: 200,
              color: Colors.yellow,
            ),
            Container(
              height: 200,
              color: Colors.blue,
            ),
            Container(
              height: 200,
              color: Colors.green,
            ),
            Container(
              height: 200,
              color: Colors.purple,
            ),
          ],
        ),
      ),
    );
  }
}
