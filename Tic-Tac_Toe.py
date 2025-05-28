import random

board = [i for i in range(1, 10)]
player, computer = '', ''
moves = ((1, 7, 3, 9), (5,), (2, 4, 6, 8))
winners = ((0, 1, 2), (3, 4, 5), (6, 7, 8),
           (0, 3, 6), (1, 4, 7), (2, 5, 8),
           (0, 4, 8), (2, 4, 6))


def print_board():
    for i in range(0, 9, 3):
        print(' | '.join(str(x) if isinstance(x, int) else x for x in board[i:i+3]))
        if i < 6:
            print('---------')


def select_char():
    return random.sample(('X', 'O'), 2)


def can_move(brd, move):
    return isinstance(move, int) and 1 <= move <= 9 and brd[move - 1] not in ('X', 'O')


def can_win(brd, player):
    for tup in winners:
        if all(brd[ix] == player for ix in tup):
            return True
    return False


def perform_move(brd, player, move):
    if can_move(brd, move):
        brd[move - 1] = player
        return True
    return False


def computer_move():
    for i in range(1, 10):
        copy = board[:]
        if can_move(copy, i):
            copy[i - 1] = computer
            if can_win(copy, computer):
                return i
    for i in range(1, 10):
        copy = board[:]
        if can_move(copy, i):
            copy[i - 1] = player
            if can_win(copy, player):
                return i
    for tup in moves:
        for mv in tup:
            if can_move(board, mv):
                return mv
    return -1


def space_exist():
    return any(isinstance(x, int) for x in board)


player, computer = select_char()
print(f'Player is [{player}] and computer is [{computer}]')
result = 'Tied. No Winner.'

while space_exist():
    print_board()
    try:
        move = int(input(f"Your move ({player}) [1-9]: "))
    except ValueError:
        print("Invalid input. Enter a number.")
        continue

    if not perform_move(board, player, move):
        print("Invalid move. Try again.")
        continue

    if can_win(board, player):
        result = "*** Congratulations! You won! ***"
        break

    if not space_exist():
        break

    comp_move = computer_move()
    perform_move(board, computer, comp_move)
    print(f"Computer moves to {comp_move}")

    if can_win(board, computer):
        result = "=== Computer wins! Better luck next time. ==="
        break

print_board()
print(result)
