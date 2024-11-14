import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import '../../constants.dart';

import '../../models/Product.dart';
import '../details/details_screen.dart';
import 'components/categorries.dart';
import 'components/item_card.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Petshop",
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: SvgPicture.asset("assets/icons/pets.svg"),
          onPressed: () {},
        ),
        actions: <Widget>[
          IconButton(
            icon: const Icon(
              Icons.account_circle_outlined,
              size: 40,
            ),
            onPressed: () {},
          ),
          const SizedBox(width: kDefaultPaddin / 2)
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          // Padding(
          //   padding: const EdgeInsets.symmetric(horizontal: kDefaultPaddin),
          //   child: Text(
          //     "Produtos",
          //     style: Theme.of(context)
          //         .textTheme
          //         .titleLarge!
          //         .copyWith(fontWeight: FontWeight.bold),
          //   ),
          // ),

          Container(
            //Container para limitar tamanho do Search
            padding: const EdgeInsets.all(20),
            child: const SearchBar(
              leading: Icon(Icons.search),
              hintText: "Colheira, Racao...",
            ),
          ),
          const Categories(),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: kDefaultPaddin),
              child: GridView.builder(
                itemCount: products.length,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: kDefaultPaddin,
                  crossAxisSpacing: kDefaultPaddin,
                  childAspectRatio: 0.75,
                ),
                itemBuilder: (context, index) => ItemCard(
                  product: products[index],
                  press: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => DetailsScreen(
                        product: products[index],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
