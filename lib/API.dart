import 'dart:convert';

import 'package:personal_blog/Post.dart';
import 'package:http/http.dart' as http;
import 'package:dio/dio.dart';

class API {
  String responseMessage = "";
  List<dynamic> items = [];

  List<Post> posts = [];
  var data;

  void editPost(Post post, String nuovoTitolo, String nuovaDescrizione,
      bool elimina, nuovoFile) async {
    const url = 'http://192.168.1.6:3000/api/changePostNew';

    Dio dio = Dio();
    FormData formData = FormData.fromMap({
      "idPost": post.id.toString(),
      "titoloPost": nuovoTitolo,
      "descrizionePost": nuovaDescrizione,
      "elimina": elimina.toString(),
      "file": nuovoFile != null
          ? await MultipartFile.fromFile(nuovoFile.path,
              filename: nuovoFile.name)
          : null,
    });

    try {
      final response = await dio.post(url, data: formData);
      if (response.statusCode == 200) {
        print("Successo: ${response.data}");
      } else {
        print("Errore: ${response.statusCode}");
      }
    } catch (e) {
      print("Errore: $e");
    }
  }

  // void editPost(Post post, bool elimina, file) async {
  //   final url = Uri.parse('http://192.168.1.6:3000/api/changePostNew');

  //   try {
  //     Map<String, String> body = {};

  //     body['idPost'] = post.id.toString();

  //     body['titoloPost'] = post.titolo;

  //     body['descrizionePost'] = post.descrizione;

  //     body['elimina'] = elimina.toString();

  //     final response = await http.post(
  //       url,
  //       headers: {'Content-Type': 'application/json'},
  //       body: jsonEncode(body),
  //     ); //body

  //     if (response.statusCode == 200) {
  //       data = json.decode(response.body);
  //     }
  //   } catch (e) {
  //     print('Errore: $e');
  //   }
  // }

  Future<List<Post>?> allPosts() async {
    final url = Uri.parse(
        'http://192.168.1.6:3000/api/filterRequest?ricercaParola=&ricercaAnno=2024');

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        items = data['result']; // Decodifica la lista di elementi

        posts = Post.fromJson(data);

        return posts;
      } else {
        print('Errore: ${response.statusCode}');
        responseMessage = 'Errore: ${response.statusCode}';
        return null;
      }
    } catch (e) {
      print('Errore: $e');
      responseMessage = 'Errore: $e';
      return null;
    }
  }
}
