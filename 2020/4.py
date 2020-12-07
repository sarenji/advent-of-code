from aocd import get_data
import re

input = get_data(day=4, year=2020)
passports = input.split('\n\n')

# Part 1
required_fields = set('byr iyr eyr hgt hcl ecl pid'.split(' '))


def validate_field(field, value):
    if field == 'byr':
        return 1920 <= int(value) <= 2002
    elif field == 'iyr':
        return 2010 <= int(value) <= 2020
    elif field == 'eyr':
        return 2020 <= int(value) <= 2030
    elif field == 'hgt':
        if value.endswith('cm'):
            return 150 <= int(value[:-2]) <= 193
        elif value.endswith('in'):
            return 59 <= int(value[:-2]) <= 76
        return False
    elif field == 'hcl':
        return re.match(r'^#[a-f0-9]{6}$', value)
    elif field == 'ecl':
        return value in 'amb blu brn gry grn hzl oth'.split(' ')
    elif field == 'pid':
        return re.match(r'^[0-9]{9}$', value)


def valid_passports(validate=False):
    for passport in passports:
        fields_in_passport = set()
        for field in passport.replace('\n', ' ').split(' '):
            name, value = field.split(':')
            if validate:
                if validate_field(name, value):
                    fields_in_passport.add(name)
            else:
                fields_in_passport.add(name)
        if len(required_fields - fields_in_passport) == 0:
            yield passport


print(len(list(valid_passports())))

# Part 2
print(len(list(valid_passports(True))))
