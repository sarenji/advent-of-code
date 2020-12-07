from aocd import get_data

input = get_data(day=6, year=2020)

# Part 1
print(sum([len(set(group.replace('\n', ''))) for group in
           input.split('\n\n')]))

# Part 2
print(sum([len(set.intersection(*map(set, group.split('\n')))) for group in
           input.split('\n\n')]))
