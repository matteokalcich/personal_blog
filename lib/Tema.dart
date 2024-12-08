import 'package:flutter/material.dart';

class Tema {
  /// Determina se il tema corrente è scuro
  static bool isDarkMode(BuildContext context) {
    return Theme.of(context).brightness == Brightness.dark;
  }

  /// Fornisce i colori principali per il tema corrente
  static Color getPrimaryColor(BuildContext context) {
    return Theme.of(context).primaryColor;
  }

  /// Fornisce il colore dello sfondo in base al tema corrente
  static Color getBackgroundColor(BuildContext context) {
    return Theme.of(context).scaffoldBackgroundColor;
  }

  /// Fornisce uno stile di testo personalizzato per il tema corrente
  static TextStyle getTextStyle(BuildContext context) {
    return Theme.of(context).textTheme.bodyLarge!;
  }
}


