import 'package:flutter/material.dart';
import 'package:personal_blog/API.dart';
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

  Future<void> fetchPosts() async {
    try {
      List<Post>? newPosts = await api.allPosts();
      setState(() {
        posts = newPosts ?? [];
      });
    } catch (e) {
      debugPrint('Error fetching posts: $e');
      setState(() {
        posts = [];
      });
    }
  }

  @override
  void initState() {
    super.initState();
    fetchPosts();
  }

  Future<void> _handleRefresh() async {
    await fetchPosts();
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
            IconButton(
                onPressed: () async {
                  await _handleRefresh();
                },
                icon: Icon(Icons.refresh))
          ],
        ),
      ),
      body: RefreshIndicator(
        onRefresh: _handleRefresh,
        child: posts == null
            ? const Center(child: CircularProgressIndicator())
            : posts!.isEmpty
                ? const Center(child: Text('No posts available'))
                : ListView.builder(
                    itemCount: posts!.length,
                    itemBuilder: (context, index) {
                      final post = posts![index];
                      return PostCard(post: post);
                    },
                  ),
      ),
    );
  }
}

class PostCard extends StatelessWidget {
  final Post post;

  const PostCard({super.key, required this.post});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      child: InkWell(
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => DettagliPost(post: post),
            ),
          );
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ListTile(
              title: Text(post.titolo),
              subtitle: Text(post.dataCreazione),
            ),
            if (post.pathRemoteImg.isNotEmpty)
              Image.network('http://192.168.1.3:3000/${post.pathRemoteImg}'),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(post.descrizione),
            ),
          ],
        ),
      ),
    );
  }
}
