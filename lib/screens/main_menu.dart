import 'package:flutter/material.dart';
import 'package:tic_tac_toe_game/responsive/responsive.dart';
import 'package:tic_tac_toe_game/widgets/CustomButton.dart';
import 'create_room.dart';
import 'join_room.dart';

class Main_Menu extends StatelessWidget {
  const Main_Menu({super.key});
  static String routeName= '/main-menu';
  void createRoom(BuildContext context)
  {
    Navigator.pushNamed(context, CreateRoom.routeName);
  }
  void joinRoom(BuildContext context)
  {
    Navigator.pushNamed(context, JoinRoom.routeName);
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Responsive(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomButton(onTap: () {
              createRoom(context);
            }, text: 'Create Room'),
            SizedBox(
              height: 20,
            ),
            CustomButton(onTap: () {
              joinRoom(context);
            }, text: 'Join Room'),
          ],
        ),
      ),
    );
  }
}
