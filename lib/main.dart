import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:personal_blog/API.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: ApiCallScreen(),
    );
  }
}

class ApiCallScreen extends StatefulWidget {
  const ApiCallScreen({super.key});

  @override
  _ApiCallScreenState createState() => _ApiCallScreenState();
}

class _ApiCallScreenState extends State<ApiCallScreen> {
  API api = API();
  String responseMessage = "";
  List<dynamic> items = [];
  bool isLoading = false;

  Future<void> makeApiCall() async {
    setState(() {
      isLoading = true;
    });

    final url = Uri.parse('http://192.168.1.8:3000/api/apiTest'); // Assicurati che il backend sia raggiungibile

    try {
      final response = await http.post(url);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          responseMessage = data['message'];
          items = data['result']; // Decodifica la lista di elementi
        });
      } else {
        print('Errore: ${response.statusCode}');
        setState(() {
          responseMessage = 'Errore: ${response.statusCode}';
        });
      }
    } catch (e) {
      print('Errore: $e');
      setState(() {
        responseMessage = 'Errore: $e';
      });
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('API Client'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            ElevatedButton(
              onPressed: isLoading ? null : api.allPosts,
              child: isLoading
                  ? const CircularProgressIndicator(color: Colors.white)
                  : const Text('Fai richiesta API'),
            ),
            const SizedBox(height: 20),
            Text(
              responseMessage,
              style: const TextStyle(fontSize: 16),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            Expanded(
              child: items.isNotEmpty
                  ? ListView.builder(
                      itemCount: items.length,
                      itemBuilder: (context, index) {
                        final item = items[index];
                        return Card(
                          margin: const EdgeInsets.symmetric(vertical: 8),
                          child: ListTile(
                            title: Text('Piatto: ${item['piatto']}'),
                            subtitle: Text('ID: ${item['id']}'),
                          ),
                        );
                      },
                    )
                  : const Text('Nessun dato ricevuto'),
            ),
          ],
        ),
      ),
    );
  }
}
