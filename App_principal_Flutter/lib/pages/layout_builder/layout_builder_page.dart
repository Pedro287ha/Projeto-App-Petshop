import 'package:flutter/material.dart';

class LayoutBuilderPage extends StatelessWidget {
  const LayoutBuilderPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Layout Builder"),
        backgroundColor: Colors.red,
      ),
      body: Center(
        child: LayoutBuilder(builder: (context, constrains) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: constrains.maxHeight *.50,
                width: constrains.maxWidth *.5,
                color: Colors.purple,

              ),
              Container(
                height: constrains.maxHeight *.5,
                width: constrains.maxWidth ,
                color: Colors.blue,
              )
            ],
          );
        }),
      ),
    );
  }
}
