from aocd import get_data
import re

input = get_data(day=2, year=2020)
cases = re.findall(r'(\d+)\-(\d+) (.): (.+)', input)

# Part 1
print(sum([1 for min, max, letter, password in cases if int(
    min) <= password.count(letter) <= int(max)]))

# Part 2
print(sum([1 for a, b, letter, password in cases if (
    password[int(a) - 1] == letter) ^ (password[int(b) - 1] == letter)]))
