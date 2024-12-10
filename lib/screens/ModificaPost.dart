import 'package:flutter/material.dart';
import 'package:personal_blog/API.dart';
import 'package:personal_blog/Post.dart';

class ModificaPost extends StatefulWidget {
  Post post;
  ModificaPost({super.key, required this.post});

  @override
  _ModificaPostState createState() => _ModificaPostState();
}

class _ModificaPostState extends State<ModificaPost> {
  final TextEditingController _controllerTitolo = TextEditingController();
  final TextEditingController _controllerDescrizione = TextEditingController();
  API api = API();

  @override
  void dispose() {
    _controllerTitolo.dispose();
    _controllerDescrizione.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        minimum: const EdgeInsets.all(50),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            const SizedBox(
              height: 50,
            ),
            const Text('Post da modificare'),
            Row(
              children: [
                Text(widget.post.dataCreazione),
                const SizedBox(
                  width: 30,
                  height: 50,
                ),
                Text(widget.post.titolo),
              ],
            ),
            Image.network(
              'http://192.168.1.6:3000/${widget.post.pathRemoteImg}',
              width: 100,
            ),
            Text(widget.post.descrizione),
            SizedBox(
              height: 200,
            ),
            Column(
              children: [
                TextField(
                  decoration: InputDecoration(
                    labelText: 'Titolo',
                    hintText: 'Inserisci il nuovo titolo',
                    prefixIcon: Icon(Icons.title),
                    border: OutlineInputBorder(),
                  ),
                  controller: _controllerTitolo,
                ),
                TextField(
                  decoration: InputDecoration(
                    labelText: 'Descrizione',
                    hintText: 'Inserisci la nuova descrizione',
                    prefixIcon: Icon(Icons.description),
                    border: OutlineInputBorder(),
                  ),
                  controller: _controllerDescrizione,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('Immagine da upluoudare'),
                    IconButton(
                        onPressed: () {
                          api.editPost(widget.post, _controllerTitolo.text, _controllerDescrizione.text, false, null);
                        },
                        icon: Icon(Icons.send)),
                  ],
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
