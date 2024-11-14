import 'package:flutter/material.dart';

// Conteudo do firebase 
class Product {
  final String image, title, description;
  final int size, id;
  final String price;
  final Color color;

  Product(
      {required this.image,
      required this.title,
      required this.description,
      required this.price,
      required this.size,
      required this.id,
      required this.color});
}

List<Product> products = [
  Product(
      id: 1,
      title: "Racao Pedigree",
      price: "21,99",
      size: 12,
      description:
          "Enriquecida com antioxidantes, selênio e vitamina E, que ajudam no sistema imunológico e fortalecem a saúde do seu pet",
      image: "assets/images/racao_1.png",
      color: const Color.fromARGB(255, 235, 162, 4)),
  Product(
      id: 2,
      title: "Whiskas gato",
      price: "10,00",
      size: 8,
      description:
          "O alimento para gatos WHISKAS é nutricionalmente completo e balanceado, com um ótimo equilíbrio de vitaminas e minerais para ajudá-lo a fornecer os melhores cuidados para o seu gato adulto",
      image: "assets/images/racao_2.png",
      color: Color.fromARGB(255, 180, 2, 171)),
  Product(
      id: 3,
      title: "Racao Dog Choni",
      price: "15,60",
      size: 10,
      description: dummyText,
      image: "assets/images/racao_3.png",
      color: Color.fromARGB(255, 3, 163, 83)),
  Product(
      id: 4,
      title: "Racao Family plus",
      price: "8,00",
      size: 11,
      description: dummyText,
      image: "assets/images/racao_4.png",
      color: Color.fromARGB(255, 201, 189, 20)),
  Product(
      id: 5,
      title: "Racao Choni vegetal",
      price: "10,22",
      size: 12,
      description: dummyText,
      image: "assets/images/racao_5.png",
      color: const Color(0xFFFB7883)),
  Product(
    id: 6,
    title: "Racao Dog Choni Filhote",
    price: "50,99",
    size: 12,
    description: dummyText,
    image: "assets/images/racao_6.png",
    color: Color.fromARGB(255, 57, 0, 148),
  ),
];

String dummyText =
    "Ofereça ao seu cão adulto um padrão de qualidade incomparável com nosso alimento completo, desenvolvido com cuidado e dedicação. Cada ingrediente selecionado tem um propósito específico para promover a saúde e o bem-estar do seu cão. Com 24% de proteínas de qualidade superior, garantimos uma nutrição balanceada e satisfatória";
