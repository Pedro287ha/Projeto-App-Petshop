import 'package:flutter/material.dart';

enum PopUpMenuPages {
  container,
  rows_columns_page,
  media_query_page,
  layout_builder_page,
  botoes_page,
  single_scroll_page,
  list_view_page,
  dialogs_page,
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("HomePage"),
        backgroundColor: Colors.blue,
        actions: [
          PopupMenuButton<PopUpMenuPages>(
            icon: const Icon(Icons.access_alarm),
            onSelected: (PopUpMenuPages valueSelected) {
              switch (valueSelected) {
                case PopUpMenuPages.container:
                  Navigator.of(context).pushNamed('/container_page');
                  break;
                case PopUpMenuPages.rows_columns_page:
                  Navigator.of(context).pushNamed('/rows_columns_page');
                  break;
                case PopUpMenuPages.media_query_page:
                  Navigator.of(context).pushNamed('/media_query_page');
                  break;
                case PopUpMenuPages.layout_builder_page:
                  Navigator.of(context).pushNamed('/layout_builder_page');
                  break;
                case PopUpMenuPages.botoes_page:
                  Navigator.of(context).pushNamed('/botoes_page');
                  break;
                case PopUpMenuPages.single_scroll_page:
                  Navigator.of(context).pushNamed('/single_scroll_page');
                  break;
                case PopUpMenuPages.list_view_page:
                  Navigator.of(context).pushNamed('/list_view_page');
                  break;
                case PopUpMenuPages.dialogs_page:
                  Navigator.of(context).pushNamed('/dialogs_page');
                  break;
              }
            },
            itemBuilder: (BuildContext context) {
              return <PopupMenuItem<PopUpMenuPages>>[
                const PopupMenuItem<PopUpMenuPages>(
                  value: PopUpMenuPages.container,
                  child: Text("container"),
                ),
                const PopupMenuItem<PopUpMenuPages>(
                  value: PopUpMenuPages.rows_columns_page,
                  child: Text("rows_columns"),
                ),
                const PopupMenuItem<PopUpMenuPages>(
                  value: PopUpMenuPages.media_query_page,
                  child: Text("media query"),
                ),
                const PopupMenuItem<PopUpMenuPages>(
                  value: PopUpMenuPages.layout_builder_page,
                  child: Text("layout builer"),
                ),
                const PopupMenuItem<PopUpMenuPages>(
                  value: PopUpMenuPages.botoes_page,
                  child: Text("Botoes e textos "),
                ),
                const PopupMenuItem<PopUpMenuPages>(
                  value: PopUpMenuPages.single_scroll_page,
                  child: Text("Single Scroll page"),
                ),
                const PopupMenuItem<PopUpMenuPages>(
                  value: PopUpMenuPages.list_view_page,
                  child: Text("List view"),
                ),
                const PopupMenuItem<PopUpMenuPages>(
                  value: PopUpMenuPages.dialogs_page,
                  child: Text("dialogs"),
                ),
              ];
            },
          )
        ],
      ),
    );
  }
}
