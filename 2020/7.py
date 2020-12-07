from aocd import get_data
import re

input = get_data(day=7, year=2020)
rules = input.split('\n')

# construct bag map
bag_map = {}
for rule in rules:
    bag, contains = re.split(r' bags contain ', rule)
    contains = contains[:-1]
    if contains == 'no other bags':
        bag_map[bag] = []
    else:
        contained_bags = contains.split(', ')
        bag_map[bag] = [re.match(r'^(\d+) (.*) bags?$', x).groups()
                        for x in contained_bags]

# Part 1
# now iterate over each bag and figure out if they can eventually contain a shiny gold bag.


def search_bags(bags, lst, original_color):
    for num, bag_color in bags:
        num = int(num)
        if bag_color == 'shiny gold':
            lst.add(original_color)
        else:
            search_bags(bag_map[bag_color], lst, original_color)
    return lst


final_set = set()
for x in bag_map.keys():
    search_bags(bag_map[x], final_set, x)

print(len(final_set))

# Part 2


def add_bags(bags):
    arr = []
    for num, bag_color in bags:
        num = int(num)
        arr.append(num * (1 + add_bags(bag_map[bag_color])))
    return sum(arr)


print(add_bags(bag_map['shiny gold']))
