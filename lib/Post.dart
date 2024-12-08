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

    for (var item in json['result']) {
      posts.add(Post(
        id: item['idPost'],
        titolo: item['titoloPost'],
        descrizione: item['descrizionePost'],
        dataCreazione: item['dataCreazione'].split('T')[0],
        pathRemoteImg: item['pathFotoPost'],
      ));
    }

    return posts;
  }
}
