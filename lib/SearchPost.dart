import 'package:flutter/material.dart';
import 'package:personal_blog/Post.dart';

class SearchPost extends SearchDelegate {
  Map<String, String> searchTerms = {};

  SearchPost(List<Post>? posts) {
    for (var item in posts!) {
      searchTerms[item.id.toString()] = '${item.titolo}: ${item.descrizione}';
    }
  }


  @override
  List<Widget>? buildActions(BuildContext context) {
    return [
      IconButton(
        onPressed: () {
          query = '';
        },
        icon: const Icon(Icons.clear),
      ),
    ];
  }

  @override
  Widget? buildLeading(BuildContext context) {
    return IconButton(
        onPressed: () {
          close(context, null);
        },
        icon: const Icon(Icons.arrow_back));
  }

  @override
  Widget buildResults(BuildContext context) {
    // Filtra i risultati che contengono il testo nella query
    Map<String, String> matchQuery = {
      for (var entry in searchTerms.entries)
        if (entry.key.toLowerCase().contains(query.toLowerCase()) ||
            entry.value.toLowerCase().contains(query.toLowerCase()))
          entry.key: entry.value
    };

    if (matchQuery.isEmpty) {
      return const Center(
        child: Text(
          'Nessun risultato trovato.',
          style: TextStyle(fontSize: 18, color: Colors.grey),
        ),
      );
    }

    return ListView.builder(
      itemCount: matchQuery.length,
      itemBuilder: (context, index) {
        String titolo = matchQuery.keys.elementAt(index);
        String descrizione = matchQuery.values.elementAt(index);

        return ListTile(
          title: Text(titolo),
          subtitle: Text(descrizione),
        );
      },
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    Map<String, String> matchQuery = {
      for (var entry in searchTerms.entries)
        if (entry.key.toLowerCase().contains(query.toLowerCase()) ||
            entry.value.toLowerCase().contains(query.toLowerCase()))
          entry.key: entry.value
    };

    return ListView.builder(
      itemCount: matchQuery.length,
      itemBuilder: (context, index) {
        String titolo = matchQuery.keys.elementAt(index);
        String descrizione = matchQuery.values.elementAt(index);

        return ListTile(
          title: Text(titolo),
          subtitle: Text(descrizione),
        );
      },
    );
  }
}
