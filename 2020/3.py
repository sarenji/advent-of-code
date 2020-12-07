from aocd import get_data
import math

input = get_data(day=3, year=2020).split('\n')


def toboggan(delta):
    position = [0, 0]
    count = 0
    while position[1] < len(input):
        if input[position[1]][position[0] % len(input[0])] == '#':
            count += 1
        position[0] += delta[0]
        position[1] += delta[1]
    return count


# Part 1
print(toboggan([3, 1]))

# Part 2
cases = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
print(math.prod(map(toboggan, cases)))
