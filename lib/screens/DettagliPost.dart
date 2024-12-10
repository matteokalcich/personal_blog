import 'package:flutter/material.dart';
import 'package:personal_blog/Post.dart';

class DettagliPost extends StatefulWidget {
  Post post;
  DettagliPost({super.key, required this.post});

  @override
  _DettagliPostState createState() => _DettagliPostState();
}

class _DettagliPostState extends State<DettagliPost> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Posts'),
      ),
      body: Center(
        child: Column(
          children: [
            Row(
              children: [
                Text(widget.post.dataCreazione),
                Text(widget.post.titolo),
              ],
            ),
            Image.network('http://192.168.1.6:3000/${widget.post.pathRemoteImg}'),
            Text(widget.post.descrizione),
          ],
        ),
      ),
    );
  }
}
