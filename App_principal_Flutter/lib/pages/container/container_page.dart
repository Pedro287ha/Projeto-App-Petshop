import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class ContainerPage extends StatelessWidget {
  const ContainerPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Container"),
        backgroundColor: Colors.pink,
      ),
      body:  Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text("Container teste page"),
            Container(
              width: 200,
              height: 200,
              color: Colors.red,
            )

          ],
        ),
      ),
    );
  }
}
