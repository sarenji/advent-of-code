from aocd import get_data
import itertools
import math

input = get_data(day=1, year=2020)
numbers = list(map(int, input.split('\n')))

# Part 1
for combination in itertools.combinations(numbers, 2):
    if sum(combination) == 2020:
        print(math.prod(combination))

# Part 2
for combination in itertools.combinations(numbers, 3):
    if sum(combination) == 2020:
        print(math.prod(combination))
