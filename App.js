import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

const initialBoard = Array(9).fill("");

export default function App() {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleSquarePress = (index) => {
    if (board[index] === "") {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      if (checkWinner(newBoard, currentPlayer)) {
        Alert.alert("Game Over", `Player ${currentPlayer} wins!`);
        setBoard(initialBoard);
      } else if (board.filter(square => square === "").length === 1) {
        Alert.alert("Game Over", "It's a draw!");
        setBoard(initialBoard);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  const checkWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combination of winningCombinations) {
      if (
        board[combination[0]] === player &&
        board[combination[1]] === player &&
        board[combination[2]] === player
      ) {
        return true;
      }
    }

    return false;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {board.map((square, index) => (
          <TouchableOpacity
            key={index}
            style={styles.square}
            onPress={() => handleSquarePress(index)}
          >
            <Text style={styles.squareText}>{square}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  squareText: {
    fontSize: 48,
  },
});