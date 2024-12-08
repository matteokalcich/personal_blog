class Post {
  final int id;
  final String titolo;
  final String descrizione;
  final String dataCreazione;
  final String pathRemoteImg;
  static List<Post> posts = [];

  Post({
    required this.id,
    required this.titolo,
    required this.descrizione,
    required this.dataCreazione,
    required this.pathRemoteImg,
  });

  static fromJson(Map<String, dynamic> json) {
    // return switch (json['result']) {
    //   {
    //     'idPost': int id,
    //     'titoloPost': String titolo,
    //     'descrizionePost': String descrizione,
    //     'dataCreazione': var dataCreazione,
    //     'pathFotoPost': String pathRemoteImg,
    //   } =>
    //     Post(
    //       id: id,
    //       titolo: titolo,
    //       descrizione: descrizione,
    //       dataCreazione: dataCreazione,
    //       pathRemoteImg: pathRemoteImg,
    //     ),
    //   _ => throw const FormatException('Failed to load the Post'),
    // };

    for (var item in json['result']) {
      posts.add(Post(
        id: item['idPost'],
        titolo: item['titoloPost'],
        descrizione: item['descrizionePost'],
        dataCreazione: item['dataCreazione'],
        pathRemoteImg: item['pathFotoPost'],
      ));
    }

    return posts;
  }
}
