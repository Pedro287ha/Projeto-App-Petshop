import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class BotoesPage extends StatelessWidget {
  const BotoesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Botoes e textos"),
        backgroundColor: Colors.yellow,
      ),
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Row(
                children: [
                  RotatedBox(
                    quarterTurns: -1,
                    child: Container(
                      color: Colors.red,
                      padding: EdgeInsets.all(5),
                      child: const Text("Rodei meu widget"),
                    ),
                  ),
                  const Icon(Icons.ac_unit),
                ],
              ),
              TextButton(
                onPressed: () {},
                child: const Text("Botao Texto"),
                style: TextButton.styleFrom(
                    backgroundColor: Colors.red,
                    padding: EdgeInsets.all(50),
                    minimumSize: Size(50, 50),
                    //deixar redondo
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(30)),
                    )),
              ),
              IconButton(
                onPressed: () {},
                icon: Icon(Icons.home),
              ),
              ElevatedButton.icon(
                onPressed: () {},
                label: const Text("modo aviao"),
                style: ElevatedButton.styleFrom(shadowColor: Colors.blue),
                icon: Icon(
                  Icons.air_rounded,
                ),
              ),
              SizedBox(
                height: 10,
              ),
              ElevatedButton(
                onPressed: () {},
                child: const Text("oi"),
              ),
              InkWell(
                onTap: () {},
                child: Text("inkwell botao simples"),
              ),
              GestureDetector(
                child: const Text("oi"),
                onVerticalDragDown: (_) => print("teste"),
              ),
              //Criando botao personalizado
              Container(
                width: 300,
                height: 100,
                decoration: BoxDecoration(
                  boxShadow: [BoxShadow(blurRadius: 10, offset: Offset(0, 5))],
                  gradient: LinearGradient(
                    colors: [Colors.blue, Colors.green],
                  ),
                borderRadius: BorderRadius.circular(60),
                
                ),
                child: TextButton(child: const Text('clicar'), onPressed: (){},),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
