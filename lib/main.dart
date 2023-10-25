import 'package:flutter/material.dart';
import 'package:tic_tac_toe_game/provider/room_data_provider.dart';
import 'package:tic_tac_toe_game/screens/game_screen.dart';
import 'package:tic_tac_toe_game/screens/main_menu.dart';
import 'utils/colors.dart';
import 'screens/join_room.dart';
import 'screens/create_room.dart';
import 'package:provider/provider.dart';


void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context)=>RoomDataProvider(),
      child: MaterialApp(
        theme: ThemeData.dark().copyWith(
          scaffoldBackgroundColor: bgColor,
        ),
        routes: {
          Main_Menu.routeName:(context)=>Main_Menu(),
          CreateRoom.routeName:(context)=>CreateRoom(),
          JoinRoom.routeName:(context)=>JoinRoom(),
          GameScreen.routeName:(context)=>GameScreen(),
        },
        initialRoute: Main_Menu.routeName,
      ),
    );
  }
}
