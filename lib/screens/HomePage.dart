import 'package:flutter/material.dart';
import 'package:personal_blog/screens/Blogs.dart';
import 'package:personal_blog/screens/Settings.dart';

class HomePage extends StatefulWidget {
  final void Function(ThemeMode) toggleTheme;

  const HomePage({super.key, required this.toggleTheme});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final List<Widget> body = [
      const Blogs(),
      Settings(toggleTheme: widget.toggleTheme),
    ];

    return Scaffold(

      
      
      body: body[currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: currentIndex,
        onTap: (int newIndex) {
          setState(() {
            currentIndex = newIndex; // Cambia pagina in base all'indice
          });
        },
        items: const [
          BottomNavigationBarItem(
            label: 'Home',
            icon: Icon(Icons.home),
          ),
          BottomNavigationBarItem(
            label: 'Settings',
            icon: Icon(Icons.settings),
          ),
        ],
      ),
    );
  }
}
