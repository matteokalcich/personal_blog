import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:personal_blog/API.dart';
import 'package:personal_blog/Post.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  API api = API();
  String responseMessage = "";
  List<Post>? posts = [];
  bool isLoading = false;

  fetchPosts() async {
    isLoading = true;
    posts = await api.allPosts();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('API Client'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              ElevatedButton(
                onPressed: () => {
                  fetchPosts(),
                  setState(() {
                    isLoading = false;
                  })
                },
                child: const Text('Fai richiesta API'),
              ),
              const SizedBox(height: 20),
              Text(
                responseMessage,
                style: const TextStyle(fontSize: 16),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 20),
              Expanded(
                child: posts!.isNotEmpty
                    ? ListView.builder(
                        itemCount: posts!.length,
                        itemBuilder: (context, index) {
                          final post = posts![index];
                          return Card(
                            margin: const EdgeInsets.symmetric(vertical: 8),
                            child: Column(
                              children: [
                                ListTile(
                                  leading: Text(post.dataCreazione),
                                  title: Text(post.titolo),
                                ),
                                Padding(
                                  padding: EdgeInsets.all(8.0),
                                  child: Column(
                                    children: [
                                      Image.network(
                                          'http://192.168.1.8:3000/${post.pathRemoteImg}'),
                                      Text(post.descrizione),
                                    ],
                                  ),
                                )
                              ],
                            ),
                          );
                        },
                      )
                    : const Text('Nessun dato ricevuto'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
