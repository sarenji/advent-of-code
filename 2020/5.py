from aocd import get_data

input = get_data(day=5, year=2020)
tickets = input.split('\n')

# Part 1
seatIDs = [int(ticket.replace('F', '0').replace('L', '0').replace(
    'B', '1').replace('R', '1'), 2) for ticket in tickets]
print(max(seatIDs))

# Part 2
print(next(x for x in range(min(seatIDs), max(seatIDs) + 1) if x not in seatIDs))
