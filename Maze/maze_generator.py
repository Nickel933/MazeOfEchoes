import random

def generate_maze(size=45):
    maze = [[1 for _ in range(size)] for _ in range(size)]
    for i in range(1, size-1):
        for j in range(1, size-1):
            if random.random() > 0.7:
                maze[i][j] = 0
    return maze
