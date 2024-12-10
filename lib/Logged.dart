class Logged {
  static final Logged _logged = Logged._internal();
  static bool loggato = false;

  factory Logged() {
    return _logged;
  }

  Logged._internal();

  static isLogged() {
    return loggato;
  }

  static setLogged(bool tmp) {
    loggato = tmp;
  }
}
