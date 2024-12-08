import 'dart:convert';

import 'package:personal_blog/Post.dart';
import 'package:http/http.dart' as http;

class API {
  String responseMessage = "";
  List<dynamic> items = [];

  List<Post> posts = [];

  Future<Post?> allPosts() async {
    final url = Uri.parse(
        'http://192.168.1.8:3000/api/filterRequest?ricercaParola=&ricercaAnno=2024'); // Assicurati che il backend sia raggiungibile

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        items = data['result']; // Decodifica la lista di elementi
        // print('Ecco cosa è arrivat: ' + items.toString());
        // for (var i in items) {
        //   print('Titolo Primo POst: ' + i['titoloPost']);
        // }

        posts = Post.fromJson(data);

        for (var post in posts) {
          print('Ecco il post con id: ' + post.id.toString() + ' e titolo: '+ post.titolo);
        }
      } else {
        print('Errore: ${response.statusCode}');
        responseMessage = 'Errore: ${response.statusCode}';
      }
    } catch (e) {
      print('Errore: $e');
      responseMessage = 'Errore: $e';
    } finally {
      return null;
    }
  }
}
