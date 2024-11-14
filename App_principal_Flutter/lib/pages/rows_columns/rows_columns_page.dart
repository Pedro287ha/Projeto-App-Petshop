import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class RowsColumnsPage extends StatelessWidget {
  const RowsColumnsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Columns and rows"),
        backgroundColor: Colors.orange,
      ),
      body: Container(
        color: Colors.red,
        width: MediaQuery.of(context).size.width,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          //crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              child: Text("Item 1"),
              color: Colors.blue,
            ),
            const Text("Item 2"),
            const Text("Item 3"),
            Container(

              color: Colors.amber[200],
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Text("1"),
                  Text("2"),
                  Text("3"),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
