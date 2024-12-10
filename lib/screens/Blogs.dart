import 'package:flutter/material.dart';

import 'package:personal_blog/API.dart';
import 'package:personal_blog/Logged.dart';
import 'package:personal_blog/Post.dart';
import 'package:personal_blog/SearchPost.dart';
import 'package:personal_blog/screens/Account.dart';
import 'package:personal_blog/screens/DettagliPost.dart';

class Blogs extends StatefulWidget {
  const Blogs({super.key});

  @override
  _BlogsState createState() => _BlogsState();
}

class _BlogsState extends State<Blogs> {
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
            IconButton(
              onPressed: () {
                showSearch(
                  context: context,
                  delegate: SearchPost(posts),
                );
              },
              icon: const Icon(Icons.search),
            ),
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
      body: const Center(
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: 2, horizontal: 20),
          child: Column(
            children: [
              Expanded(child: FrontOffice()),
            ],
          ),
        ),
      ),
    );
  }
}

class FrontOffice extends StatefulWidget {
  const FrontOffice({super.key});

  @override
  _FrontOfficeState createState() => _FrontOfficeState();
}

class _FrontOfficeState extends State<FrontOffice> {
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
    return FutureBuilder(
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
    );
  }
}
