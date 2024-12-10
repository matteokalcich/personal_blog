import 'package:flutter/material.dart';
import 'package:personal_blog/API.dart';
import 'package:personal_blog/Logged.dart';
import 'package:personal_blog/Post.dart';
import 'package:personal_blog/screens/DettagliPost.dart';
import 'package:personal_blog/screens/ModificaPost.dart';

class Account extends StatefulWidget {
  const Account({super.key});

  @override
  _AccountState createState() => _AccountState();
}

class _AccountState extends State<Account> {
  API api = API();
  List<Post>? posts = [];
  Logged logged = Logged();

  fetchPosts() async {
    List<Post>? newPosts = await api.allPosts();

    if (posts != null || posts!.isNotEmpty) {
      if (newPosts != null) {
        // Aggiungi solo i post che non sono già presenti
        for (var post in newPosts) {
          if (!posts!.any((existingPost) => existingPost.id == post.id)) {
            posts!.add(post);
          }
        }
      }
    } else {
      posts = List.from(newPosts!);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: MediaQuery.of(context).size.width / 8,
        title: Row(
          mainAxisAlignment: MainAxisAlignment
              .spaceBetween, // Dispone gli elementi correttamente
          children: [
            const Text('Posts'), // Elemento al centro
            IconButton(
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute<void>(
                    builder: (BuildContext context) => Account()));
              },
              icon: const Icon(Icons.account_circle_rounded),
            ),
          ],
        ),
      ),
      body: FutureBuilder(
        future: fetchPosts(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const CircularProgressIndicator.adaptive();
          } else if (snapshot.hasError) {
            return Text(
              snapshot.error.toString(),
              style: const TextStyle(
                color: Colors.red,
              ),
            );
          } else {
            return ListView.builder(
              itemCount: posts!.length,
              itemBuilder: (context, index) {
                final post = posts![index];
                return GestureDetector(
                  child: Card(
                    margin: const EdgeInsets.symmetric(vertical: 8),
                    child: Column(
                      children: [
                        ListTile(
                          leading: Text(post.dataCreazione),
                          title: Text(post.titolo),
                          trailing: IconButton(
                              onPressed: () {
                                Navigator.of(context).push(
                                    MaterialPageRoute<void>(
                                        builder: (BuildContext context) =>
                                            ModificaPost(post: post)));
                              },
                              icon: Icon(Icons.edit)),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Column(
                            children: [
                              Image.network(
                                  'http://192.168.1.6:3000/${post.pathRemoteImg}'),
                              const SizedBox(
                                height: 30,
                              ),
                              Text(post.descrizione),
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                  onTap: () {
                    Navigator.of(context).push(MaterialPageRoute<void>(
                        builder: (BuildContext context) =>
                            DettagliPost(post: post)));
                  },
                );
              },
            );
          }
        },
      ),
    );
  }
}
