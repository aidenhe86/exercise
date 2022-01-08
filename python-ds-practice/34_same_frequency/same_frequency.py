def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    str_num1 = str(num1)
    str_num2 = str(num2)
    count1 = {}
    count2 = {}

    for x in str_num1:
        count1[x] = count1.get(x , 0) + 1
    for x in str_num2:
        count2[x] = count2.get(x , 0) + 1

    return count1 == count2
