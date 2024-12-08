import 'package:flutter/material.dart';
import 'package:personal_blog/Tema.dart';

class Settings extends StatelessWidget {
  final void Function(ThemeMode) toggleTheme;

  const Settings({super.key, required this.toggleTheme});

  Image _darkLightImg(bool isDarkMode) {
    return Image.asset(
      isDarkMode ? 'images/light_mode.png' : 'images/dark_mode.png',
      width: 50,
      height: 30,
      color: isDarkMode ? Colors.white : null,
    );
  }

  @override
  Widget build(BuildContext context) {
    bool isDarkMode =
        Tema.isDarkMode(context); // Funzione per determinare il tema attuale

    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
        centerTitle: true,
      ),
      body: Wrap(
        children: [
          ExpansionTile(
            title: const Text('Settings'),
            children: [
              Row(
                children: [
                  const SizedBox(
                    width: 50,
                  ),
                  _darkLightImg(isDarkMode),
                  Switch(
                    value: isDarkMode,
                    onChanged: (isOn) {
                      toggleTheme(isOn ? ThemeMode.dark : ThemeMode.light);
                    },
                  ),
                ],
              ),
            ],
          ),
          Column(

            children: [

              
            ],
          ),
        ],
      ),
    );
  }
}
